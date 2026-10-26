# Distribute a split you did not create

## Why config recovery is needed

`distribute` takes the full config as an argument: recipients, allocations, `totalAllocation`, and `distributionIncentive`. Onchain only `splitHash = keccak256(abi.encode(split))` is stored (single-tuple encoding). A config that does not hash to `splitHash` reverts `InvalidSplit()`. So you must recover the exact current config first.

## 1. Recover the config

- SDK: `SplitV2Client.getSplitMetadataViaProvider({ splitAddress, chainId })` rebuilds it from logs. On V2.1 and V2.2 it reads `updateBlockNumber()` and fetches that single block's logs.
- Manual: call `updateBlockNumber()` on the split (V2.1 and V2.2, not V2.0), then `getLogs` for `SplitUpdated(Split)` from the split address at exactly that block. The latest config is the event at that block. The event is also emitted at creation.
- The SDK's data client path needs `apiConfig` and a subgraph-indexed chain; the log-based path above does not.
- Public RPCs often cap `eth_getLogs` block ranges and rate-limit; prefer the single-block query.
- If you already hold recipients and fee, pass `splitFields: { recipients, distributorFeePercent }` to SDK `distribute` to skip recovery (undocumented in 6.7.0; still verify the hash).
- See the SDK docs for full parameters: https://splits.org/protocol/docs/sdk/splits-v2.md and https://splits.org/protocol/docs/sdk/warehouse.md . If they disagree with this file, verify against the SDK source or the contract.

## 2. Verify the hash before sending

```ts
import { encodeAbiParameters, keccak256, parseAbi } from 'viem'

const abi = parseAbi(['function splitHash() view returns (bytes32)'])

// distributionIncentive is the raw uint16: percent * 10_000 (65535 = 6.5535%).
const encoded = encodeAbiParameters(
  [{ type: 'tuple', components: [
    { name: 'recipients', type: 'address[]' },
    { name: 'allocations', type: 'uint256[]' },
    { name: 'totalAllocation', type: 'uint256' },
    { name: 'distributionIncentive', type: 'uint16' },
  ] }],
  [{ recipients, allocations, totalAllocation, distributionIncentive }],
)
const onchain = await publicClient.readContract({
  address: splitAddress, abi, functionName: 'splitHash',
})
if (keccak256(encoded) !== onchain) throw new Error('Config does not match splitHash; do not send')
```

This snippet was dry-run against live Arc splits (read-only) and never broadcast. A match means `distribute` cannot revert with `InvalidSplit()`.

## 3. Check state before distributing

- Owner: a zero owner means the config can never change. Show the user the recovered recipients and allocations and confirm before any send.
- Paused: `distribute` reverts `Paused()` unless `msg.sender` or `tx.origin` is the owner. Only the owner can distribute or unpause (`SplitV2Client.setPause`). Stop and tell the user if you are not the owner.
- Some chains expose one asset under more than one token id (see the chain's notes, Arc: [arc.md](arc.md)). Check the split balance and recipients' Warehouse balances under every id that applies, never add balances across ids, and distribute under one id and stay with it.
- Remember the leave-1-unit rule: the split, the split's own Warehouse bucket (Pull), and each recipient's Warehouse bucket keep 1 unit.
- The reward goes to the `distributorAddress` you pass (SDK default: the wallet account). If `distributorFeePercent` is above 0, confirm with the user who receives it.

## 4. Push versus pull consequences

- Push: `distribute` pays recipients directly, so one recipient the token or chain will not pay can revert the whole call and nobody is paid; on an immutable split that is permanent. Simulate first (`estimateGas` or `eth_call`) so the revert surfaces before you send. For chain-specific cases see the chain notes (Arc: [arc.md](arc.md)).
- Pull: `distribute` only credits Warehouse balances under the token id you passed. Each recipient still needs a withdraw.

## 5. Pull withdrawals, per recipient

- Call `WarehouseClient.withdraw({ ownerAddress, tokenAddress })` once per recipient (and the distributor, if it earned a fee), per token id.
- Withdraw pays balance minus 1, reverts at balance 0, and pays 0 at balance 1. Read each balance first and skip those at 1 or less.
- Anyone can withdraw for a recipient unless that recipient paused withdrawals (`WithdrawalPaused`).
- One recipient's failing withdraw (for example a blocklisted address) does not affect the others.
- Withdrawing under an id with no credit reverts. If recipients hold credit under more than one id, withdraw each id separately.
- See the SDK docs for full parameters: https://splits.org/protocol/docs/sdk/splits-v2.md and https://splits.org/protocol/docs/sdk/warehouse.md . If they disagree with this file, verify against the SDK source or the contract.

## 6. Send

Simulate, show the user the chain, split, token id, distributor, and expected per-recipient amounts, and wait for explicit confirmation. Mainnet transactions are irreversible. Never put private keys on a command line.

## Chain-specific notes

- Arc: see [arc.md](arc.md).

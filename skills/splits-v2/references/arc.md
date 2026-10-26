# Splits on Arc

Read this before creating, distributing, or withdrawing on Arc (mainnet chain id 5042, testnet 5042002). The canonical page is https://splits.org/protocol/docs/networks/arc.md; read it too if you can fetch URLs. The rules below are the ones that must not be missed.

## What is deployed and SDK

- Only Splits V2.2 and the Warehouse are deployed. Waterfall, Swapper, Vesting, and other products are not.
- Arc needs `@0xsplits/splits-sdk` >= 6.7.0 (`@0xsplits/splits-sdk-react` >= 4.6.0).
- Only `SplitV2Client` and `WarehouseClient` are supported there. The data client and subgraph are not, so no API key is needed and config recovery uses logs.

## USDC: two views, two token ids

- Arc USDC is native (18 decimals) with an ERC-20 view at `0x3600000000000000000000000000000000000000` (6 decimals): one balance, two views.
- Splits treats these as two token ids: `0x3600...` and the native sentinel `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`.
- A split sees the same pool under both ids. How it was funded does not matter. Never add the two balances together.
- In the Warehouse the two ids are separate ledgers. Recipients are credited under the id passed to `distribute`, and withdraw is per id; withdrawing under an id with no credit reverts.

## Which id, push or pull

- Default to `0x3600...`. Use pull when recipients are many, untrusted, or blocklist-able. Use push on this id only for a few known recipients, ideally with a mutable owner who can remove one.
- Pick one id per split and stay with it.
- Push with `0x3600...`: a blocklisted recipient (or a blocklisted distributor when the fee is above 0) makes the whole `distribute` revert and nobody is paid. On an immutable split this is permanent.
- Push with the native id: a recipient that cannot receive native value does not block the others, but its share is credited in the Warehouse under the native id and its withdraw reverts until it can receive. Use only if the user needs push fault tolerance and accepts that stuck credit.

## SDK trap

- `distribute` and `WarehouseClient.withdraw` map the zero address to the native id (`0xEeee...`). `getSplitBalance` does not map it.
- Always pass `0x3600...` explicitly for USDC.
- The SDK hardcodes native decimals to 18 on every chain.

## Distributing a split you did not create

Follow [distribute-existing-split.md](distribute-existing-split.md), plus:

- Read the split balance under BOTH ids. It is one pool seen twice (6 versus 18 decimals); never add them.
- Check recipients' Warehouse balances under both ids; they are separate per id.
- Distribute under one id and stay with it.
- Public RPC: `eth_getLogs` works for 10,000-block ranges and fails at 10,001 (error `-32012`). The RPC also rate-limits (error `-32005`). Use `updateBlockNumber()` and the single-block query instead of scanning.
- RPCs: https://rpc.mainnet.arc.io and https://rpc.testnet.arc.io

## Testing

Treat `0x3600...` behavior as Circle/Arc-controlled and upgradeable. Test with `eth_call` against the Arc RPC; a local fork does not reproduce it.

## Arc-owned facts, read at the source

- Minimum fee per gas and EVM differences: https://docs.arc.io/arc/references/evm-differences
- USDC `Transfer` log behavior (a move through the ERC-20 interface emits two `Transfer` logs; a native move emits one): https://docs.arc.io/arc/references/usdc-system-events
- Chain config skill: https://github.com/circlefin/skills/blob/master/plugins/circle/skills/use-arc/SKILL.md

Verified against @0xsplits/splits-sdk 6.7.0 and Splits V2.2 on 2026-10-23.

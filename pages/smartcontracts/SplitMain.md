import Callout from 'nextra-theme-docs/callout'

# SplitMain

_0xSplits_

> SplitMain

A composable and gas-efficient protocol for deploying splitter contracts.

_Split recipients, ownerships, and keeper fees are stored onchain as calldata
&amp; re-passed as args / validated via hashing when needed. Each split gets its
own address &amp; proxy for maximum composability with other contracts onchain.
For these proxies, we extended EIP-1167 Minimal Proxy Contract to avoid
`DELEGATECALL` inside `receive()` to accept hard gas-capped `sends` &amp;
`transfers`._

## Methods

### PERCENTAGE_SCALE

```solidity
function PERCENTAGE_SCALE() external view returns (uint256)
```

constant to scale uints into percentages (1e6 == 100%)

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | uint256 | undefined   |

### acceptControl

```solidity
function acceptControl(address split) external nonpayable
```

Accepts transfer of the controlling address of mutable split `split`

#### Parameters

| Name  | Type    | Description                                             |
| ----- | ------- | ------------------------------------------------------- |
| split | address | Address of mutable split to accept control transfer for |

### cancelControlTransfer

```solidity
function cancelControlTransfer(address split) external nonpayable
```

Cancels transfer of the controlling address of mutable split `split`

#### Parameters

| Name  | Type    | Description                                             |
| ----- | ------- | ------------------------------------------------------- |
| split | address | Address of mutable split to cancel control transfer for |

### createSplit

```solidity
function createSplit(address[] accounts, uint32[] percentAllocations, uint32 distributorFee, address controller) external nonpayable returns (address split)
```

Creates a new split with recipients `accounts` with ownerships
`percentAllocations`, a keeper fee for splitting of `distributorFee` and the
controlling address `controller`

<Callout>
  `accounts` must be **ordered** smallest to largest
(i.e., 0x00, 0x01, 0x0a, 0x10, 0x1a, etc).
</Callout>

<Callout>
  for `percentAllocations` & `distributorFee`, 100% = [`PERCENTAGE_SCALE`](/smartcontracts/SplitMain#percentage_scale) = 1e6
</Callout>

#### Parameters

| Name               | Type      | Description                                                   |
| ------------------ | --------- | ------------------------------------------------------------- |
| accounts           | address[] | Ordered, unique list of addresses with ownership in the split |
| percentAllocations | uint32[]  | Percent allocations associated with each address              |
| distributorFee     | uint32    | Keeper fee paid by split to cover gas costs of distribution   |
| controller         | address   | Controlling address (0x0 if immutable)                        |

#### Returns

| Name  | Type    | Description                    |
| ----- | ------- | ------------------------------ |
| split | address | Address of newly created split |

### distributeERC20

```solidity
function distributeERC20(address split, contract ERC20 token, address[] accounts, uint32[] percentAllocations, uint32 distributorFee, address distributorAddress) external nonpayable
```

Distributes the ERC20 `token` balance for split `split`

_`accounts`, `percentAllocations`, and `distributorFee` are verified by hashing
&amp; comparing to the hash in storage associated with split `split`pernicious
ERC20s may cause overflow in this function inside \_scaleAmountByPercentage, but
results do not affect ETH &amp; other ERC20 balances_

#### Parameters

| Name               | Type           | Description                                                   |
| ------------------ | -------------- | ------------------------------------------------------------- |
| split              | address        | Address of split to distribute balance for                    |
| token              | contract ERC20 | Address of ERC20 to distribute balance for                    |
| accounts           | address[]      | Ordered, unique list of addresses with ownership in the split |
| percentAllocations | uint32[]       | Percent allocations associated with each address              |
| distributorFee     | uint32         | Keeper fee paid by split to cover gas costs of distribution   |
| distributorAddress | address        | Address to pay `distributorFee` to                            |

### distributeETH

```solidity
function distributeETH(address split, address[] accounts, uint32[] percentAllocations, uint32 distributorFee, address distributorAddress) external nonpayable
```

Distributes the ETH balance for split `split`

_`accounts`, `percentAllocations`, and `distributorFee` are verified by hashing
&amp; comparing to the hash in storage associated with split `split`_

#### Parameters

| Name               | Type      | Description                                                   |
| ------------------ | --------- | ------------------------------------------------------------- |
| split              | address   | Address of split to distribute balance for                    |
| accounts           | address[] | Ordered, unique list of addresses with ownership in the split |
| percentAllocations | uint32[]  | Percent allocations associated with each address              |
| distributorFee     | uint32    | Keeper fee paid by split to cover gas costs of distribution   |
| distributorAddress | address   | Address to pay `distributorFee` to                            |

### getController

```solidity
function getController(address split) external view returns (address)
```

Returns the current controller of split `split`

#### Parameters

| Name  | Type    | Description                    |
| ----- | ------- | ------------------------------ |
| split | address | Split to return controller for |

#### Returns

| Name | Type    | Description            |
| ---- | ------- | ---------------------- |
| \_0  | address | Split&#39;s controller |

### getERC20Balance

```solidity
function getERC20Balance(address account, contract ERC20 token) external view returns (uint256)
```

Returns the ERC20 balance of token `token` for account `account`

#### Parameters

| Name    | Type           | Description                                 |
| ------- | -------------- | ------------------------------------------- |
| account | address        | Account to return ERC20 `token` balance for |
| token   | contract ERC20 | Token to return balance for                 |

#### Returns

| Name | Type    | Description                      |
| ---- | ------- | -------------------------------- |
| \_0  | uint256 | Account&#39;s balance of `token` |

### getETHBalance

```solidity
function getETHBalance(address account) external view returns (uint256)
```

Returns the current ETH balance of account `account`

#### Parameters

| Name    | Type    | Description                       |
| ------- | ------- | --------------------------------- |
| account | address | Account to return ETH balance for |

#### Returns

| Name | Type    | Description                  |
| ---- | ------- | ---------------------------- |
| \_0  | uint256 | Account&#39;s balance of ETH |

### getHash

```solidity
function getHash(address split) external view returns (bytes32)
```

Returns the current hash of split `split`

#### Parameters

| Name  | Type    | Description              |
| ----- | ------- | ------------------------ |
| split | address | Split to return hash for |

#### Returns

| Name | Type    | Description      |
| ---- | ------- | ---------------- |
| \_0  | bytes32 | Split&#39;s hash |

### getNewPotentialController

```solidity
function getNewPotentialController(address split) external view returns (address)
```

Returns the current newPotentialController of split `split`

#### Parameters

| Name  | Type    | Description                                |
| ----- | ------- | ------------------------------------------ |
| split | address | Split to return newPotentialController for |

#### Returns

| Name | Type    | Description                        |
| ---- | ------- | ---------------------------------- |
| \_0  | address | Split&#39;s newPotentialController |

### makeSplitImmutable

```solidity
function makeSplitImmutable(address split) external nonpayable
```

Turns mutable split `split` immutable

#### Parameters

| Name  | Type    | Description                                |
| ----- | ------- | ------------------------------------------ |
| split | address | Address of mutable split to turn immutable |

### predictImmutableSplitAddress

```solidity
function predictImmutableSplitAddress(address[] accounts, uint32[] percentAllocations, uint32 distributorFee) external view returns (address split)
```

Predicts the address for an immutable split created with recipients `accounts`
with ownerships `percentAllocations` and a keeper fee for splitting of
`distributorFee`

#### Parameters

| Name               | Type      | Description                                                   |
| ------------------ | --------- | ------------------------------------------------------------- |
| accounts           | address[] | Ordered, unique list of addresses with ownership in the split |
| percentAllocations | uint32[]  | Percent allocations associated with each address              |
| distributorFee     | uint32    | Keeper fee paid by split to cover gas costs of distribution   |

#### Returns

| Name  | Type    | Description                                  |
| ----- | ------- | -------------------------------------------- |
| split | address | Predicted address of such an immutable split |

### transferControl

```solidity
function transferControl(address split, address newController) external nonpayable
```

Begins transfer of the controlling address of mutable split `split` to
`newController`

_Two-step control transfer inspired by
[dharma](https://github.com/dharma-eng/dharma-smart-wallet/blob/master/contracts/helpers/TwoStepOwnable.sol)_

#### Parameters

| Name          | Type    | Description                                      |
| ------------- | ------- | ------------------------------------------------ |
| split         | address | Address of mutable split to transfer control for |
| newController | address | Address to begin transferring control to         |

### updateAndDistributeERC20

```solidity
function updateAndDistributeERC20(address split, contract ERC20 token, address[] accounts, uint32[] percentAllocations, uint32 distributorFee, address distributorAddress) external nonpayable
```

Updates &amp; distributes the ERC20 `token` balance for split `split`

_only callable by SplitControllerpernicious ERC20s may cause overflow in this
function inside \_scaleAmountByPercentage, but results do not affect ETH &amp;
other ERC20 balances_

#### Parameters

| Name               | Type           | Description                                                   |
| ------------------ | -------------- | ------------------------------------------------------------- |
| split              | address        | Address of split to distribute balance for                    |
| token              | contract ERC20 | Address of ERC20 to distribute balance for                    |
| accounts           | address[]      | Ordered, unique list of addresses with ownership in the split |
| percentAllocations | uint32[]       | Percent allocations associated with each address              |
| distributorFee     | uint32         | Keeper fee paid by split to cover gas costs of distribution   |
| distributorAddress | address        | Address to pay `distributorFee` to                            |

### updateAndDistributeETH

```solidity
function updateAndDistributeETH(address split, address[] accounts, uint32[] percentAllocations, uint32 distributorFee, address distributorAddress) external nonpayable
```

Updates &amp; distributes the ETH balance for split `split`

_only callable by SplitController_

#### Parameters

| Name               | Type      | Description                                                   |
| ------------------ | --------- | ------------------------------------------------------------- |
| split              | address   | Address of split to distribute balance for                    |
| accounts           | address[] | Ordered, unique list of addresses with ownership in the split |
| percentAllocations | uint32[]  | Percent allocations associated with each address              |
| distributorFee     | uint32    | Keeper fee paid by split to cover gas costs of distribution   |
| distributorAddress | address   | Address to pay `distributorFee` to                            |

### updateSplit

```solidity
function updateSplit(address split, address[] accounts, uint32[] percentAllocations, uint32 distributorFee) external nonpayable
```

Updates an existing split with recipients `accounts` with ownerships
`percentAllocations` and a keeper fee for splitting of `distributorFee`

#### Parameters

| Name               | Type      | Description                                                   |
| ------------------ | --------- | ------------------------------------------------------------- |
| split              | address   | Address of mutable split to update                            |
| accounts           | address[] | Ordered, unique list of addresses with ownership in the split |
| percentAllocations | uint32[]  | Percent allocations associated with each address              |
| distributorFee     | uint32    | Keeper fee paid by split to cover gas costs of distribution   |

### walletImplementation

```solidity
function walletImplementation() external view returns (address)
```

address of wallet implementation for split proxies

#### Returns

| Name | Type    | Description |
| ---- | ------- | ----------- |
| \_0  | address | undefined   |

### withdraw

```solidity
function withdraw(address account, uint256 withdrawETH, contract ERC20[] tokens) external nonpayable
```

Withdraw ETH &amp;/ ERC20 balances for account `account`

#### Parameters

| Name        | Type             | Description                      |
| ----------- | ---------------- | -------------------------------- |
| account     | address          | Address to withdraw on behalf of |
| withdrawETH | uint256          | Withdraw all ETH if nonzero      |
| tokens      | contract ERC20[] | Addresses of ERC20s to withdraw  |

## Events

### CancelControlTransfer

```solidity
event CancelControlTransfer(address indexed split)
```

emitted after each canceled split control transfer

#### Parameters

| Name            | Type    | Description                                            |
| --------------- | ------- | ------------------------------------------------------ |
| split `indexed` | address | Address of the split control transfer was canceled for |

### ControlTransfer

```solidity
event ControlTransfer(address indexed split, address indexed previousController, address indexed newController)
```

emitted after each successful split control transfer

#### Parameters

| Name                         | Type    | Description                                      |
| ---------------------------- | ------- | ------------------------------------------------ |
| split `indexed`              | address | Address of the split control was transferred for |
| previousController `indexed` | address | Address of the split&#39;s previous controller   |
| newController `indexed`      | address | Address of the split&#39;s new controller        |

### CreateSplit

```solidity
event CreateSplit(address indexed split)
```

emitted after each successful split creation

#### Parameters

| Name            | Type    | Description                  |
| --------------- | ------- | ---------------------------- |
| split `indexed` | address | Address of the created split |

### DistributeERC20

```solidity
event DistributeERC20(address indexed split, contract ERC20 indexed token, uint256 amount, address indexed distributorAddress)
```

emitted after each successful ERC20 balance split

#### Parameters

| Name                         | Type           | Description                                       |
| ---------------------------- | -------------- | ------------------------------------------------- |
| split `indexed`              | address        | Address of the split that distributed its balance |
| token `indexed`              | contract ERC20 | Address of ERC20 distributed                      |
| amount                       | uint256        | Amount of ERC20 distributed                       |
| distributorAddress `indexed` | address        | Address to credit distributor fee to              |

### DistributeETH

```solidity
event DistributeETH(address indexed split, uint256 amount, address indexed distributorAddress)
```

emitted after each successful ETH balance split

#### Parameters

| Name                         | Type    | Description                                       |
| ---------------------------- | ------- | ------------------------------------------------- |
| split `indexed`              | address | Address of the split that distributed its balance |
| amount                       | uint256 | Amount of ETH distributed                         |
| distributorAddress `indexed` | address | Address to credit distributor fee to              |

### InitiateControlTransfer

```solidity
event InitiateControlTransfer(address indexed split, address indexed newPotentialController)
```

emitted after each initiated split control transfer

#### Parameters

| Name                             | Type    | Description                                             |
| -------------------------------- | ------- | ------------------------------------------------------- |
| split `indexed`                  | address | Address of the split control transfer was initiated for |
| newPotentialController `indexed` | address | Address of the split&#39;s new potential controller     |

### UpdateSplit

```solidity
event UpdateSplit(address indexed split)
```

emitted after each successful split update

#### Parameters

| Name            | Type    | Description                  |
| --------------- | ------- | ---------------------------- |
| split `indexed` | address | Address of the updated split |

### Withdrawal

```solidity
event Withdrawal(address indexed account, uint256 ethAmount, contract ERC20[] tokens, uint256[] tokenAmounts)
```

emitted after each successful withdrawal

#### Parameters

| Name              | Type             | Description                               |
| ----------------- | ---------------- | ----------------------------------------- |
| account `indexed` | address          | Address that funds were withdrawn to      |
| ethAmount         | uint256          | Amount of ETH withdrawn                   |
| tokens            | contract ERC20[] | Addresses of ERC20s withdrawn             |
| tokenAmounts      | uint256[]        | Amounts of corresponding ERC20s withdrawn |

## Errors

### Create2Error

```solidity
error Create2Error()
```

create2 opcode failed

### CreateError

```solidity
error CreateError()
```

create opcode failed

### InvalidNewController

```solidity
error InvalidNewController(address newController)
```

Invalid new controlling address `newController` for mutable split

#### Parameters

| Name          | Type    | Description            |
| ------------- | ------- | ---------------------- |
| newController | address | Invalid new controller |

### InvalidSplit\_\_AccountsAndAllocationsMismatch

```solidity
error InvalidSplit__AccountsAndAllocationsMismatch(uint256 accountsLength, uint256 allocationsLength)
```

Array lengths of accounts &amp; percentAllocations don&#39;t match
(`accountsLength` != `allocationsLength`)

#### Parameters

| Name              | Type    | Description                        |
| ----------------- | ------- | ---------------------------------- |
| accountsLength    | uint256 | Length of accounts array           |
| allocationsLength | uint256 | Length of percentAllocations array |

### InvalidSplit\_\_AccountsOutOfOrder

```solidity
error InvalidSplit__AccountsOutOfOrder(uint256 index)
```

Invalid accounts ordering at `index`

#### Parameters

| Name  | Type    | Description                   |
| ----- | ------- | ----------------------------- |
| index | uint256 | Index of out-of-order account |

### InvalidSplit\_\_AllocationMustBePositive

```solidity
error InvalidSplit__AllocationMustBePositive(uint256 index)
```

Invalid percentAllocation of zero at `index`

#### Parameters

| Name  | Type    | Description                     |
| ----- | ------- | ------------------------------- |
| index | uint256 | Index of zero percentAllocation |

### InvalidSplit\_\_InvalidAllocationsSum

```solidity
error InvalidSplit__InvalidAllocationsSum(uint32 allocationsSum)
```

Invalid percentAllocations sum `allocationsSum` must equal `PERCENTAGE_SCALE`

#### Parameters

| Name           | Type   | Description                     |
| -------------- | ------ | ------------------------------- |
| allocationsSum | uint32 | Sum of percentAllocations array |

### InvalidSplit\_\_InvalidDistributorFee

```solidity
error InvalidSplit__InvalidDistributorFee(uint32 distributorFee)
```

Invalid distributorFee `distributorFee` cannot be greater than 10% (1e5)

#### Parameters

| Name           | Type   | Description                   |
| -------------- | ------ | ----------------------------- |
| distributorFee | uint32 | Invalid distributorFee amount |

### InvalidSplit\_\_InvalidHash

```solidity
error InvalidSplit__InvalidHash(bytes32 hash)
```

Invalid hash `hash` from split data (accounts, percentAllocations,
distributorFee)

#### Parameters

| Name | Type    | Description  |
| ---- | ------- | ------------ |
| hash | bytes32 | Invalid hash |

### InvalidSplit\_\_TooFewAccounts

```solidity
error InvalidSplit__TooFewAccounts(uint256 accountsLength)
```

Invalid number of accounts `accountsLength`, must have at least 2

#### Parameters

| Name           | Type    | Description              |
| -------------- | ------- | ------------------------ |
| accountsLength | uint256 | Length of accounts array |

### Unauthorized

```solidity
error Unauthorized(address sender)
```

Unauthorized sender `sender`

#### Parameters

| Name   | Type    | Description        |
| ------ | ------- | ------------------ |
| sender | address | Transaction sender |

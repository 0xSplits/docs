# SplitMain

*0xSplits*

> SplitMain

A composable and gas-efficient protocol for deploying splitter contracts.

*Split recipients, ownerships, and keeper fees are stored onchain as calldata &amp; re-passed as args / validated via hashing when needed. Each split gets its own address &amp; proxy for maximum composability with other contracts onchain. For these proxies, we extended EIP-1167 Minimal Proxy Contract to avoid `DELEGATECALL` for `receive()` to accept hard gas-capped `sends` &amp; `transfers`.*

## Methods

### PERCENTAGE_SCALE

```solidity
function PERCENTAGE_SCALE() external view returns (uint256)
```

constant to scale uints into percentages (1e6 == 100%)




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined

### acceptOwnership

```solidity
function acceptOwnership(address split) external nonpayable
```

Accepts transfer of the controlling address of mutable split `split`



#### Parameters

| Name | Type | Description |
|---|---|---|
| split | address | Address of mutable split to accept ownership transfer for

### cancelOwnershipTransfer

```solidity
function cancelOwnershipTransfer(address split) external nonpayable
```

Cancels transfer of the controlling address of mutable split `split`



#### Parameters

| Name | Type | Description |
|---|---|---|
| split | address | Address of mutable split to cancel ownership transfer for

### createSplit

```solidity
function createSplit(address[] accounts, uint32[] percentAllocations, uint32 splitterFee, address owner) external nonpayable returns (address split)
```

Creates a new split with recipients `accounts` with ownerships `percentAllocations`, a keeper fee for splitting of `splitterFee` and the controlling address `owner`



#### Parameters

| Name | Type | Description |
|---|---|---|
| accounts | address[] | Ordered, unique list of addresses with ownership in the split
| percentAllocations | uint32[] | Percent allocations associated with each address
| splitterFee | uint32 | Keeper fee paid by split to cover gas costs of distribution
| owner | address | Controlling address (0x0 if immutable)

#### Returns

| Name | Type | Description |
|---|---|---|
| split | address | Address of newly created split

### getERC20Balance

```solidity
function getERC20Balance(address account, contract ERC20 token) external view returns (uint256)
```

Returns the ERC20 balance of token `token` for account `account`



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | Account to return ERC20 `token` balance for
| token | contract ERC20 | Token to return balance for

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Account&#39;s balance of `token`

### getETHBalance

```solidity
function getETHBalance(address account) external view returns (uint256)
```

Returns the current ETH balance of account `account`



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | Account to return ETH balance for

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Account&#39;s balance of ETH

### getHash

```solidity
function getHash(address split) external view returns (bytes32)
```

Returns the current hash of split `split`



#### Parameters

| Name | Type | Description |
|---|---|---|
| split | address | Split to return hash for

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | Split&#39;s hash

### getNewPotentialOwner

```solidity
function getNewPotentialOwner(address split) external view returns (address)
```

Returns the current newPotentialOwner of split `split`



#### Parameters

| Name | Type | Description |
|---|---|---|
| split | address | Split to return newPotentialOwner for

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | Split&#39;s newPotentialOwner

### getOwner

```solidity
function getOwner(address split) external view returns (address)
```

Returns the current owner of split `split`



#### Parameters

| Name | Type | Description |
|---|---|---|
| split | address | Split to return owner for

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | Split&#39;s owner

### makeSplitImmutable

```solidity
function makeSplitImmutable(address split) external nonpayable
```

Turns mutable split `split` immutable



#### Parameters

| Name | Type | Description |
|---|---|---|
| split | address | Address of mutable split to turn immutable

### predictSplitAddress

```solidity
function predictSplitAddress(address[] accounts, uint32[] percentAllocations, uint32 splitterFee) external view returns (address split)
```

Predicts the address for an immutable split created with recipients `accounts` with ownerships `percentAllocations` and a keeper fee for splitting of `splitterFee`



#### Parameters

| Name | Type | Description |
|---|---|---|
| accounts | address[] | Ordered, unique list of addresses with ownership in the split
| percentAllocations | uint32[] | Percent allocations associated with each address
| splitterFee | uint32 | Keeper fee paid by split to cover gas costs of distribution

#### Returns

| Name | Type | Description |
|---|---|---|
| split | address | Predicted address of such an immutable split

### splitBalanceFor

```solidity
function splitBalanceFor(address split, address[] accounts, uint32[] percentAllocations, uint32 splitterFee) external nonpayable
```

Splits the ETH balance for split `split`

*`accounts`, `percentAllocations`, and `splitterFee` are verified by hashing &amp; comparing to the hash in storage associated with split `split`*

#### Parameters

| Name | Type | Description |
|---|---|---|
| split | address | Address of split to split balance for
| accounts | address[] | Ordered, unique list of addresses with ownership in the split
| percentAllocations | uint32[] | Percent allocations associated with each address
| splitterFee | uint32 | Keeper fee paid by split to cover gas costs of distribution

### splitERC20BalanceFor

```solidity
function splitERC20BalanceFor(address split, contract ERC20 token, address[] accounts, uint32[] percentAllocations, uint32 splitterFee) external nonpayable
```

Splits the ERC20 `token` balance for split `split`

*`accounts`, `percentAllocations`, and `splitterFee` are verified by hashing &amp; comparing to the hash in storage associated with split `split`pernicious ERC20s may cause overflow in this function, but results do not affect ETH &amp; other ERC20 balances*

#### Parameters

| Name | Type | Description |
|---|---|---|
| split | address | Address of split to split balance for
| token | contract ERC20 | Address of ERC20 to split balance for
| accounts | address[] | Ordered, unique list of addresses with ownership in the split
| percentAllocations | uint32[] | Percent allocations associated with each address
| splitterFee | uint32 | Keeper fee paid by split to cover gas costs of distribution

### transferOwnership

```solidity
function transferOwnership(address split, address newOwner) external nonpayable
```

Begins transfer of the controlling address of mutable split `split` to `newOwner`

*Two-step ownership transfer inspired by [dharma](https://github.com/dharma-eng/dharma-smart-wallet/blob/master/contracts/helpers/TwoStepOwnable.sol)*

#### Parameters

| Name | Type | Description |
|---|---|---|
| split | address | Address of mutable split to transfer control for
| newOwner | address | Address to begin transferring control to

### updateSplit

```solidity
function updateSplit(address split, address[] accounts, uint32[] percentAllocations, uint32 splitterFee) external nonpayable
```

Updates an existing split with recipients `accounts` with ownerships `percentAllocations` and a keeper fee for splitting of `splitterFee`



#### Parameters

| Name | Type | Description |
|---|---|---|
| split | address | Address of mutable split to update
| accounts | address[] | Ordered, unique list of addresses with ownership in the split
| percentAllocations | uint32[] | Percent allocations associated with each address
| splitterFee | uint32 | Keeper fee paid by split to cover gas costs of distribution

### walletImplementation

```solidity
function walletImplementation() external view returns (address)
```

address of wallet implementation for split proxies




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined

### withdrawFor

```solidity
function withdrawFor(address account, bool eth, contract ERC20[] tokens) external nonpayable
```

Withdraw ETH &amp;/ ERC20 balances for account `account`



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | Address to withdraw on behalf of
| eth | bool | Bool of whether to withdraw ETH
| tokens | contract ERC20[] | Addresses of ERC20s to withdraw for


## Events

### CreateSplit

```solidity
event CreateSplit(address indexed split)
```

emitted after each successful split creation



#### Parameters

| Name | Type | Description |
|---|---|---|
| split `indexed` | address | Address of the created split |

### OwnershipTransfer

```solidity
event OwnershipTransfer(address indexed split, address indexed previousOwner, address indexed newOwner)
```

emitted after each successful split ownership transfer



#### Parameters

| Name | Type | Description |
|---|---|---|
| split `indexed` | address | Address of the split ownership was transferred for |
| previousOwner `indexed` | address | Address of the split&#39;s previous owner |
| newOwner `indexed` | address | Address of the split&#39;s new owner |

### SplitBalance

```solidity
event SplitBalance(address indexed split, uint256 amount)
```

emitted after each successful ETH balance split



#### Parameters

| Name | Type | Description |
|---|---|---|
| split `indexed` | address | Address of the split that distributed its balance |
| amount  | uint256 | Amount of ETH distributed |

### SplitERC20Balance

```solidity
event SplitERC20Balance(address indexed split, contract ERC20 token, uint256 amount)
```

emitted after each successful ERC20 balance split



#### Parameters

| Name | Type | Description |
|---|---|---|
| split `indexed` | address | Address of the split that distributed its balance |
| token  | contract ERC20 | Address of ERC20 distributed |
| amount  | uint256 | Amount of ERC20 distributed |

### UpdateSplit

```solidity
event UpdateSplit(address indexed split)
```

emitted after each successful split update



#### Parameters

| Name | Type | Description |
|---|---|---|
| split `indexed` | address | Address of the updated split |

### Withdrawal

```solidity
event Withdrawal(address indexed account, bool eth, contract ERC20[] tokens, uint256[] amounts)
```

emitted after each successful withdrawal



#### Parameters

| Name | Type | Description |
|---|---|---|
| account `indexed` | address | Address that funds were withdrawn to |
| eth  | bool | Boolean for whether ETH was distributed |
| tokens  | contract ERC20[] | Addresses of ERC20s distributed |
| amounts  | uint256[] | Amounts of ETH/ERC20 distributed (if ETH was distributed (`eth`),  will be first in the array Remaining array matches order of `tokens`) |



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




### InvalidNewOwner

```solidity
error InvalidNewOwner(address newOwner)
```

Invalid new controlling address `newOwner` for mutable split



#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | Invalid new owner |

### InvalidSplit__AccountsAndAllocationsMismatch

```solidity
error InvalidSplit__AccountsAndAllocationsMismatch(uint256 accountsLength, uint256 allocationsLength)
```

Array lengths of accounts &amp; percentAllocations don&#39;t match (`accountsLength` != `allocationsLength`)



#### Parameters

| Name | Type | Description |
|---|---|---|
| accountsLength | uint256 | Length of accounts array |
| allocationsLength | uint256 | Length of percentAllocations array |

### InvalidSplit__AccountsOutOfOrder

```solidity
error InvalidSplit__AccountsOutOfOrder(uint256 index)
```

Invalid accounts ordering at `index`



#### Parameters

| Name | Type | Description |
|---|---|---|
| index | uint256 | Index of out-of-order account |

### InvalidSplit__AllocationMustBePositive

```solidity
error InvalidSplit__AllocationMustBePositive(uint256 index)
```

Invalid percentAllocation of zero at `index`



#### Parameters

| Name | Type | Description |
|---|---|---|
| index | uint256 | Index of zero percentAllocation |

### InvalidSplit__InvalidAllocationsSum

```solidity
error InvalidSplit__InvalidAllocationsSum(uint32 allocationsSum)
```

Invalid percentAllocations sum `allocationsSum` must equal `PERCENTAGE_SCALE`



#### Parameters

| Name | Type | Description |
|---|---|---|
| allocationsSum | uint32 | Sum of percentAllocations array |

### InvalidSplit__InvalidHash

```solidity
error InvalidSplit__InvalidHash(bytes32 hash)
```

Invalid hash `hash` from split data (accounts, percentAllocations, splitterFee)



#### Parameters

| Name | Type | Description |
|---|---|---|
| hash | bytes32 | Invalid hash |

### InvalidSplit__InvalidSplitterFee

```solidity
error InvalidSplit__InvalidSplitterFee(uint32 splitterFee)
```

Invalid splitterFee `splitterFee` cannot be greater than 10% (1e5)



#### Parameters

| Name | Type | Description |
|---|---|---|
| splitterFee | uint32 | Invalid splitterFee amount |

### InvalidSplit__TooFewAccounts

```solidity
error InvalidSplit__TooFewAccounts(uint256 accountsLength)
```

Invalid number of accounts `accountsLength`, must have at least 2



#### Parameters

| Name | Type | Description |
|---|---|---|
| accountsLength | uint256 | Length of accounts array |

### Unauthorized

```solidity
error Unauthorized(address sender)
```

Unauthorized sender `sender`



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender | address | Transaction sender |



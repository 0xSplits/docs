# SplitWallet

*0xSplits*

> SplitWallet

The implementation logic for `SplitProxy`.

*`SplitProxy` handles `receive()` itself to avoid the gas cost with `DELEGATECALL`.*

## Methods

### sendERC20ToMain

```solidity
function sendERC20ToMain(contract ERC20 token, uint256 amount) external payable
```

Sends erc20 in proxy to SplitMain



#### Parameters

| Name | Type | Description |
|---|---|---|
| token | contract ERC20 | Token to send
| amount | uint256 | Amount to send

### sendETHToMain

```solidity
function sendETHToMain(uint256 amount) external payable
```

Sends eth in proxy to SplitMain



#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | Amount to send

### splitMain

```solidity
function splitMain() external view returns (contract ISplitMain)
```

address of SplitMain for split distributions &amp; EOA/SC withdrawals




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ISplitMain | undefined



## Events

### ReceiveETH

```solidity
event ReceiveETH(address indexed split, uint256 amount)
```

emitted after each successful ETH transfer to proxy



#### Parameters

| Name | Type | Description |
|---|---|---|
| split `indexed` | address | Address of the split that received ETH |
| amount  | uint256 | Amount of ETH received |



## Errors

### Unauthorized

```solidity
error Unauthorized()
```

Unauthorized sender






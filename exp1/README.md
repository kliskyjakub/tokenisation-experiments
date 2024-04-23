## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
### Results
| Test | ConstructingBeauty.t.sol | SolmateToken.t.sol | BasicToken.t.sol |
|------|--------------------------|---------------------|------------------|
| testAirdropGetTokenURI() | 138,571 | 135,469 | 137,129 |
| testAirdropMultipleRecipients() | 291,487 | 289,264 | 290,354 |
| testAirdropOneRecipient() | 134,907 | 132,676 | 133,076 |
| testAirdropRevertWhenMaxSupplyExceeded() | 2,392,078 | 2,389,935 | 2,389,979 |
| testAirdropRevertWhenNonOwnerCalls() | 58,789 | 58,833 | 58,877 |
| testAirdropRevertWhenReceiverIsZeroAddress() | 43,864 | 41,721 | 41,765 |
| testRedeem() | 186,218 | 183,666 | 184,108 |
| testRedeemReturnOwnershipOfToken() | 184,064 | 181,333 | 181,795 |
| testRedeemReturnRedeemingAddress() | 185,501 | 182,927 | 183,369 |
| testRedeemReturnRedemptionId() | 185,909 | 183,335 | 183,777 |
| testRedeemRevertWhenNonOwnerCalls() | 134,972 | 132,398 | 132,818 |
| testRedeemRevertWhenTokenAlreadyRedeemed() | 186,090 | 182,924 | 183,495 |
| testRedeemRevertWhenTokenDoesNotExist() | 13,806 | 13,787 | 13,769 |
| testSetBaseURI() | 23,444 | 23,443 | 23,443 |
| testSetBaseURIRevertWhenNonOwnerCalls() | 11,193 | 11,170 | 11,170 |
| testSetContractURI() | 23,451 | 23,451 | 23,429 |
| testSetContractURIRevertWhenNonOwnerCalls() | 11,189 | 11,189 | 11,189 |

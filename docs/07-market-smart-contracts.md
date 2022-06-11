## 07. Market smart contracts

Following smart contracts are part of the HydroBlox project and are an implementation of a basic market mechanism. The contracts were written in Solidity.

### SimpleMarket

The SimpleMarket contract allows to exchange ERC20 tokens against other ERC20 tokens. The code allows for any ERC20 token, however for this project it's solely used to buy and sell HBT (HydroBloxToken) against WETH (Wrapped Ether). 

An offer can be made and gets an ID. Consumers with a matching interest can take these orders, fully or partially. Someone who made an offer can also cancel it. When an offer is made the payment is locked in the contract until the order is either filled or cancelled. The orderbook is on chain so does require . 

Before making an offer, the consumer has to approve that the market contract can transfer the tokens which are used to pay. 
The code is modification of code from the DAI Foundation and can be found here:

https://github.com/daifoundation/maker-otc/blob/master/src/simple_market.sol

### Weth

The Weth smart contract allows to create wrapped ether (WETH), ERC20 tokens. Although this contract is available on main and test net it was added for testing purposes.

### Math

A smart contract implementing safely some mathematical functions to capture overflow and underflow issues.

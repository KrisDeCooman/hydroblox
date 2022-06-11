## 11. HydroBlox Tokenomics
The HydroBlox tokens are transferrable, In combination with smart contracts running on a blockchain this allows to create the right economics to achieve multiple goals. The system has a number of objectives in mind:
1. In times of scarcity, i.e. droughts, the tokens should get more costly. This is to create the correct economic incentives for consumers, a large consumer will see that his behaviour comes at a cost
2. The smart contracts should prevent speculative behaviour and unnecessary hoarding of tokens
3. Ensure basic access to water needs to be guaranteed
4. When returning to a situation where there's plenty of water, the available tokens for each consumer should return to a state where every consumer has an equivalent amount of tokens (weighted to the size of the household).

#### Solution 1
These goals ensure an acceptable ecosystem for all participants. A key element that is incorporated is the maximum amount of water a producer can buffer. This is an important constraint influencing the minting of new tokens. As an illustration: during a wet period, when all buffer capacity is full, extra rainfall isn't stored but flows to the sea and it implies that few tokens are minted.
The implementation of this is
1. by creating a market place where consumers buy and sell HBT
2. by limiting the amount of tokens each consumer can claim, the limit is consumer's share of total maximum water supply, it prevents hoarding it severely limits speculation
3. done by guaranteeing basic access to water through linking the non-drought sensitive sources of water for this need
4. distributing tokens evenly between consumers that haven't reached their maximum amount of HBT when supplies fill up again (plenty of rainfall) 

#### Solution 2
As we want to avoid price fluctuations, as a result of speculators that want to exploit our system for their own benefits, we came up with the following countermeasure. When a consumption meter has an oversupply of HBT tokens, it will automatically offer a part of these tokens for sale. The amount of tokens that will be offered for sale, will be based on the current market demand (total water supply). But also on the consumer's past usage, so it would still have enough tokens to cover its own demand. On the other hand, the consumption meter will also automatically buy tokens when it is running out. The price of an HBT token will be determined based on an fixed algorithm, known in advance, that takes the current water supply into account. The less water supply there is, the higher the price of the HBT token will be.
The mechanism described above can be compared with a liquidity pool. The consumers with an oversupply provide liquidity, making sure no one runs out of water. But this comes with a price: the price of the HBT token is based on a fixed algorithm, which increases the price when the total supply decreases.

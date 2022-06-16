## 02. HydroBlox Solution

HydroBlox offers a solution to control the drinkwater usage and incentivizes users to be frugal, especially during periods of droughts.
Small consumers will be rewarded, large consumers will be confronted with larger fees.
HydroBlox tokens (HBT) will be used to create the right economic environment.

The amount of HydroBlox tokens will always represent the amount of available drinkable water.
During periods of influx (pumping of groundwater, rainfall, ...) tokens will be created (minted), equal to the amount of water that became available.
These tokens will immediately be divided among the users.
While consuming water, tokens will be destroyed (burned).
Each consumer pays a fixed price to receive HBT tokens during a fixed period in time.
This amount covers all costs: filtering, infrastructure, transport, ...

During periods of draughts, there is less or no influx of new water. So little or no tokens are minted.
Large consumers, running out of tokens, will need to buy tokens from small consumers.
This ensures that small consumers are rewarded for their efforts and large consumers are presented the bill.

![HydroBlox mechanism](images/hydroblox_mechanism.png)

In order to make our solution secure and tamperproof, we rely on smart digital water meters, for both production and consumption.
These water meters each have a wallet and run a small piece of software, that allows them to integrate with our smart contracts.
Each water meter has a distributed identity (DID) to identity itself as a certified and eligble consumption or production meter.

When a consumption meter is assigned to a consumer (delivery address), the DID is updated so it reflects the number of people living there.
Once the consumer has approved the consumption meter to spend ether on his behalf, consumption can start.

### HydroBlox Tokenomics

The HydroBlox tokens are transferrable, In combination with smart contracts running on a blockchain this allows to create the right economics to achieve multiple goals. The system has a number of objectives in mind:
1. In times of scarcity, i.e. droughts, the tokens should get more costly. This is to create the correct economic incentives for consumers, a large consumer will see that his behaviour comes at a cost
2. The smart contracts should prevent speculative behaviour and unnecessary hoarding of tokens, this to avoid price fluctuations which will increase trust
3. Ensure basic access to water needs to be guaranteed

#### Solution

We came up with a solution which tries to meet the above objectives. When a consumption meter has an oversupply of HBT, it will automatically offer a part of these tokens for sale but based on the consumer's past usage, it would still conserve enough tokens to cover its own demand such that not all tokens can be bought by someone else. On the other hand, the consumption meter will also automatically buy tokens when it is running out of HBT. The price of an HBT token will be determined based on an fixed algorithm, known in advance, that takes the total water supply into account. The less water supply there is, the higher the price of the HBT token will be.

Please note that no HBT can be bought manualy, this in order to prevent any speculation.

The mechanism described above can be compared with the functionalty of a liquidity pool. The consumers with an oversupply provide liquidity, making sure no one runs out of water. But this comes with a price: the price of the HBT token is based on a fixed algorithm, which increases the price when the total supply decreases. Note that theoretically there could be no HBT being offered for sale but the increase in price, which is inverse to the amount of oversupply, will ensure that large consumer are encourged to consume less water as the price will become  veryhigh bringing demand down and small/normal consumers are encourged to be extra frugal because of the high price, bringing new HBT "to the market".

The formalized version of the algorithm could look as follows:

The price 1 HBT will be a function of the the total aggregated oversupply of HBT.
![image](https://user-images.githubusercontent.com/25088136/173746398-b5479383-abe5-48d8-b4b2-c1a3650bbd10.png)

 
The oversupply of HBT for each consumer at a time T can be defined as as having more tokens then needed to cover X amount time of water usage, based on an average of the usage in the past.

![image](https://user-images.githubusercontent.com/25088136/173758017-93d11c75-b342-4e2c-a00c-f2d9d923788d.png)

In the above example the predicted water usage for X amount of time for consumer C at time T will be 4000 HBT. If Consumer C would have more then 4000 HBT then these can be sold at a price determined by the algorithm above based on the total oversupply of HBT

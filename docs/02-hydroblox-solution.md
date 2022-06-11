## 02. HydroBlox Solution

HydroBlox offers a solution to control the drinkwater usage and incentivizes users to be frugal, especially during periods of droughts.
Small consumers will be rewarded, large consumers will be confrontend with larger fees.
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

As we want to avoid price fluctuations, as a result of speculators that want to exploit our system for their own benefits, we came up with the following.
The consumption meter will automatically sell HBT tokens when it has too many, based on its past usage.
On the other hand, the consumption meter will also automatically buy tokens when it has too little.
The price of an HBT token will be determined based on an fixed algorithm, known in advance that takes the current water supply into account.

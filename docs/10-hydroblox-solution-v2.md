## 02. HydroBlox Solution v2

### General
HydroBlox offers a solution to control and manage supplies of drinking water by bringing responsibility and market mechanics to the level of the end user. As a result the management of this scarce resource is no longer production driven but consumption driven. It will create the right incentives for consumers, especially during periods for (prolonged) drought, to use drinking water sparingly, while at the same preventing abusive behaviour.

### Tokens
The HydroBlox tokens (HBT) represent drinking water that is available. The amount of HydroBlox tokens is always in line with the total amount of available drinking water. Available drinking water also comprises buffered water that can be quickly transformed into drinking water by the producer.

![image](https://github.com/KrisDeCooman/hydroblox/blob/feature/solution-described/docs/images/hydroblox_mechanism.png)

### The producer
The producers have two types of sources they use to produce tap water: 
- drought sensitive sources of water like surface water reservoirs filled by rainfall via rivers and canals and groundwater in top layers
- non-drought sensitive sources of water like groundwater in deep layers and water coming from water rich regions- this amount is limited.

On the production side tokens are created (minted) in line with water being buffered in drought sensitive sources combined with the production from non-drought sensitive sources. A producer doesn't have full control over the capacity he can produce. During dry periods the buffered amount is limited and sources can get depleted and supply can become significantly reduced. It has to be kept in mind that even during periods of drought the non-drought sensitive sources are still available. This guarantees always a minimum amount of drinking water for each consumer although this amount will be below comfort levels for most households. 
The producers are paid a fixed amount (in a digital currency) which should cover the costs of running their operation and a reasonable profit.

### The consumer 
When a consumption meter is assigned to a consumer (delivery address), the DID is updated so that it reflects the number of people living there. Once the consumer has approved the consumption meter to spend ether on his behalf, consumption can start. 
During periods of drought, there is limited inflow of new water and tokens. Consumers with large consumption will need to buy tokens from those with limited consumption. This ensures that small consumers are rewarded and that the large consumers will pay for it.
In order to make our solution secure and tamper proof, we rely on smart digital water meters, for consumers. These water meters each have a wallet and run a small piece of software, that allows them to integrate with our smart contracts. Each water meter has a distributed identity (DID) to identity itself as a certified and eligible meter. The meter ensures that only water is delivered as long as the consumption meter has tokens available.

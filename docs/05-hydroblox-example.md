## 05. HydroBlox Example

Below we give an example of a typical customer journey who wants to participate in the Hydroblox blockchain.  A future customer, named "Jenny" should first get a  HydroBloxConsumptionMeter (HBCM). With this meter, she can consume water and every time water is used the HBCM will burn the same amount of HBT. 

The HBCM gets an NFT (ERC721) from a central authority. This authority could be the organization that installs the physical consumption meters. This NTF will be later used to verify that the address that wants to subscribe in the HBT blockchain for a period as a consumer is well and truly an HBCM.

Once the HBCM has the NTF it can subscribe for the current subscription run. The subscription run represents a period of time during which the HBCM can claim their share of the minted HBT in that period of time. To enroll for the current run, a fixed fee in Ether needs be paid, in our example 1 ETH. This fee will be used later to reimburse the producers of water for the cost they have to make such as maintenance of the reservoirs, wages of staff etc.

Producers, represented by a HydroBloxProductionMeter (HBPM) mint HBT. Every time it rains, the HBPM will register how much water gets into the water reservoir of the producer and will mint the same amount in HBT. Producers follow a similar process as the consumers to subscribe for a period. Once a consumer/producer is subscribed, we wait until the state of the blockchain gets changed from "Enrollment" (the period during which producers/consumers can subscribe) to "Running" (the period during which producers/consumers produce/claim tokens if subscribed). With modifiers we ensure that a consumer/producer can only subscribe once and that only HBT/ETH can be claimed if subscribed for that period.

We assume that there is already 1 consumer "Jos" and 1 producer "De Watergroep" being subscribed to the same subscription period as Jenny.

Let's say that it rains and that the HBPM of De Watergroep mints 100 HBT. The total amount of tokens minted will be saved as the TokensToDivide variable. Jos can claim his part of the minted tokens (50), as there are in our example 2 consumers. His part of the minted tokens is saved under TokensToClaim and is calculated by tokensToDivide/amount of consumers subscribed. To ensure that Jos can not claim more tokens than his fair share, we also save the tokens already claimed by each consumer under tokensAlreadyClaimed. Jenny decides that she doesn’t claim her tokens yet.

Later it rains again and 30 HBT gets minted. Jos can now only claim 15 HBT (TokensToClaim(65)-tokensAlreadyClaimed(50)). Jenny however can still claim her 65 HBT.

Once the period is finished, the state will change to the "Finished" state. No HBT can be minted anymore in this state. Consumers can still claim their share of HBT and producers can claim Ether for every HBT they minted in proportion to the total minted HBT of that period. In this example there were 2 consumers, who paid 1 ETH each and only 1 producer. So in this case De Watergroep can claim 2 ETH.

After the period is finished we will transition to "Enrollment" state again. During this transition we will update the subscriptionRunId  with +1 and tokens/ETH that were not claimed will be "transferred" to tokensToDivide/EtherToDivide such that consumers/producers can claim these orphaned tokens/ETH during the next "Running" state.

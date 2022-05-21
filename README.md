# HydroBlox

The HydroBlox project was developed as part of the Blockchain@Home education at Howest.

Table of content
- [Analysis](?anchor=analysis)
- [Design decisions](?anchor=design-decisions)
- [Usage](?anchor=usage)
- [Authors](?anchor=authors)

## Analysis
Due to climate change, we are experiencing more droughts, which are having an impact on nature and our scarce water supply. Every year we are seeing more and more news articles that the situation is becoming more problematic.
![image](https://user-images.githubusercontent.com/25088136/169395654-f6d79a40-cb66-4c54-8b65-fc8c0228bd08.png)

In general, we see 3 problems with the current policy:

  1. Current measurements taken are all centralized and focused on prohibitions, which are difficult to enforce in practice

  2. People are not incentivized to be more frugal with water, especially during droughts, as the price is always stable with no penalty for irresponsible       
  consumers.While people who take the water shortages seriously by changing their way of consumption are not rewarded.
  
  3. Although more and more news articles are published, the problem is still under recognized as the problem is only becoming worse instead of better.

We have come up with Hydroblox, which is a blockchain based solution which should tackle the above problems in a cost-effective decentralized scalable way by using blockchain technology.

## Design decisions

### General design principles

#### Gaining trust & maintainability
In order to reduce the unexpected behavior of our code as much as possible, we used state machines for the business objects. This gives a clear view for users on what the smart contract actually does in a transparent way. Next we also tried to make use of modifiers to check certain preconditions which improves the readability.

Adding new features in the future should also be safer as it's more concise and better manageable from a security point of view. This should increase the trustworthiness in Hydroblox for users and thus ultimately increase the usage.

#### Upgradability and costs
We decided to create a separate contract for the business logic and the actual data storage. It adds some complexity and code for a relative small project, but this should make Hydroblox more future-proof to work on as data storage is abstracted from the business logic. In order to minimize gas usage we tried to avoid using loops and made use of the Withdrawal pattern where users instead of the contract pay to withdraw tokens.

This limitation was not always easy and required a bit of creativity sometimes. For example, one of the functionalities is that we calculate how many tokens each consumer can claim during a subscription period while making sure that they don't claim more tokens than their "fair share", without updating this every time for every consumer individually when new tokens are minted.


### Smart contracts

The following smart contracts are part of the HydroBlox project. These contracts were written in Solidity.

#### HydroBloxToken

The HydroBloxToken (HBT) smart contract is the representation of drinkable water, implemented as an ERC20 token. 1 HBT is equal to 1 liter of drinkable water.

HBT tokens are minted when a producer produces water. HBT tokens are burned when a consumer consumes water.

#### HydroBloxDistributor

The HydroBloxDistributor is the main smart contract and uses most of the other smart contacts discussed here.
Both consumers and producers call this contract when they want to enroll into the HydroBlox drinkable water distribution process.
Consumers need to pay in ether when they want to enroll. Producers are paid in ether when they produce water.
Enrolled consumers are entitled to claim HBT tokens, which they can then use to consume drinkable water.

#### HydroBloxStorage

The HydroBloxDistributor smart contract uses the HydroBloxStorage contract to keep track of the enrolled consumers, enrolled producers, the HBT tokens to divide and the ether to divide.

#### HydroBloxStateMachine

The HydroBloxDistributor smart contract implements the HydroBloxStateMachine contract, which is a representation of a subscription state machine.
The state machine can be in states:
- Enrollment: during this state, consumers and producers can enroll for the upcoming subscription run
- Running: during this state, producers can produce water and consumers can claim HBT tokens
- Finished: during this state, producers can claim their earned ether and consumers can claim HBT tokens

The reason why we use a state machine, is to keep the consumers and producers fixed during the running and finished state.
Having a fixed set of consumers and producers enables us to evenly divide the ether and HBT tokens, without the need for complex computations and/or for loops.

We chose to transition from one state to the next one manually, by calling a function on the smart contract.
We do this for testing purposes. In reality, we would implement the transitions to happen automatically tiggered by time (using the block number).

![image](https://user-images.githubusercontent.com/25088136/169662319-956f08e6-bbc1-454c-983a-605418598031.png)


#### HydroBloxConsumptionMeter

The HydroBloxConsumptionMeter (HBCM) smart contract is a DID representation for a consumption meter, implemented as an ERC721 token (NFT).
A physical consumption meter will need to have a HBCM token in its wallet in order to identity itself to the HydroBloxDistributor smart contract when enrolling as consumer.
Currently no claims are assigned to this identity.
In the future, claims could be added such as the amount of persons using this consumption meter.
HBT tokens could then be divided taking the amount of persons into account.

#### HydroBloxProductionMeter

The HydroBloxProductionMeter (HBPM) smart contract is a DID representation for a production meter, implemented as an ERC721 token (NFT).
A physical production meter will need to have a HBPM token in its wallet in order to identity itself to the HydroBloxDistributor smart contract when enrolling as producer.
Currently no claims are assigned to this identity.

#### HydroBloxAuthority

The HydroBloxAuthority smart contract is the issuer of HydroBloxConsumptionMeter (HBCM) and HydroBloxProductionMeter (HBPM) tokens.

#### MultiOwnable

Both the HydroBloxDistributor and HydroBloxAuthority smart contracts implement the MultiOwnable smart contract.
This smart contract exists for testing purposes only, so each of team members can be an owner on the deployed environment.
The owners are for example able to transition the state machine from one state to another, or to issue HBCM and HBPM identities.

### Example

Below we give an example of a typical customer journey who wants to participate in the Hydroblox blockchain.  A future customer, named "Jenny" should first get a  HydroBloxConsumptionMeter (HBCM). With this meter, she can consume water and every time water is used the HBCM will burn the same amount of HBT. 

The HBCM gets an NFT (ERC721 ) from a central authority. This authority could be the organization that installs the physical consumption meters. This NTF will be later used to verify that the address that wants to enroll in the HBT blockchain for a period as a consumer is well and truly an HBCM.

 Once the HBCM got the NTF it can enroll for the current subscriptionRunId. This
subscriptionRunId represents a period of time during which the HBCM can claim their share of the minted HBT in that period of time. To enroll for a period , a fixed fee in Ether needs be paid, in our example 1 ETH. This fee will be used later to reimburse the producers of water for the cost they have to make such as maintenance of the reservoirs, wages of staff etc.

Producers, represented by a HydroBloxProductionMete(HBPM) mint HBT. Every time it rains, the HBPM will register how much water gets into the water reservoir of the producer and will mint the same amount in HBT. Producers follow a similar process as the consumers to subscribe for a period. Once a consumer/producer is subscribed, she/he will transfer to the “Running” state.  We ensure with these states that a consumer/ producer can only subscribe once and that only HBT/ETH can be claimed if subscribed for that period.

We assume that there is already 1 consumer "Jos" and 1 producer "De Watergroep" being subscribed to the same subscription period as Jenny.

Let's say that it rains and that the HBPM of De Watergroep mints 100 HBT. The total amount of tokens minted will be saved as the TokensToDivide variable. Jos can claim his part of the minted tokens (50), as there are in our example 2 consumers. His part of the minted tokens is saved under TokensToClaim  and  is calculated by  tokensToDivide/amount of consumers subscribed. To ensure that Jos can not claim more tokens than his fair share, we also save the tokens already claimed by each consumer under tokensAlreadyClaimed. Jenny decides that she doesn’t claim her tokens yet.

Later it rains again and 30 HBT gets minted. Jos can now only claim 15 HBT(TokensToClaim(65)-tokensAlreadyClaimed(50)). Jenny however can still claim her 65 HBT.

Once the period is finished, the consumers and producers will be transferred to the “Finished” state. No HBT can be minted anymore for the period. Consumers can still claim their share of HBT and producers can claim Ether for every HBT they minted in proportion to the total minted HBT of that period. In this example there were 2 consumers, who paid 1 ETH each and only 1 producer. So in this case De Watergroep can claim 2 ETH.

After the period is finished we will transition to a new subscription period by the function onTransitionToEnrollment(). This will update the subscriptionRunId  with +1 and any tokens and ETH that were not claimed will be transferred to this new subscription period such that consumers/producers can claim these orphaned tokens/ETH during the new subscription period.


### Frontend

angular

### Hosting

- IPFS
- ethereum test net. which one. why? polygon in we wuold go to production? why?

### Development

Remix
Visual Studio Code

### Deployment

Deployment of the smart contracts can easily be done using Remix, following these steps:
- Deploy the HydroBloxAuthority smart contract
- Get the address of the HydroBloxConsumptionMeter and HydroBloxProductionMeter contracts (created by HydroBloxAuthority)
- Deploy the HydroBloxDistributor smart contract, given the addresses of the HydroBloxConsumptionMeter and HydroBloxProductionMeter contracts

Cloudflare?

## Usage

## Authors

- Bart Denecker
- Ian Haegemans
- Jeroen Janssens
- Kris De Cooman

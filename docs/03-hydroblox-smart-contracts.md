## 03. Smart contracts

The following smart contracts are part of the HydroBlox project. These contracts were written in Solidity.

### HydroBloxToken

The HydroBloxToken (HBT) smart contract is the representation of drinkable water, implemented as an ERC20 token. 1 HBT is equal to 1 liter of drinkable water.

HBT tokens are minted when a producer produces water. HBT tokens are burned when a consumer consumes water.

### HydroBloxDistributor

The HydroBloxDistributor is the main smart contract and uses most of the other smart contacts discussed here.
Both consumers and producers call this contract when they want to enroll into the HydroBlox drinkable water distribution process.
Consumers need to pay in ether when they want to subscribe. Producers are paid in ether when they produce water.
Subscribed consumers are entitled to claim HBT tokens, which they can then use to consume drinkable water.

### HydroBloxStorage

The HydroBloxDistributor smart contract uses the HydroBloxStorage contract to keep track of the subscribed consumers, subscribed producers, the HBT tokens to divide and the ether to divide.

### HydroBloxStateMachine

The HydroBloxDistributor smart contract implements the HydroBloxStateMachine contract, which is a representation of a subscription state machine.
The state machine can be in states:
- Enrollment: during this state, consumers and producers can enroll (subscribe) for the upcoming subscription run
- Running: during this state, producers can produce water and consumers can claim HBT tokens
- Finished: during this state, producers can claim their earned ether and consumers can claim HBT tokens

The reason why we use a state machine, is to keep the consumers and producers fixed during the running and finished state.
Having a fixed set of consumers and producers enables us to evenly divide the ether and HBT tokens, without the need for complex computations and/or for loops.

We chose to transition from one state to the next one manually, by calling a function on the smart contract.
We do this for testing purposes. In reality, we would implement the transitions to happen automatically tiggered by time (using the block number).

TODO: fix naming in image

![image](https://user-images.githubusercontent.com/25088136/169668849-38bf3047-15a2-4592-a834-d17211a8f575.png)

### HydroBloxConsumptionMeter

The HydroBloxConsumptionMeter (HBCM) smart contract is a DID representation for a consumption meter, implemented as an ERC721 token (NFT).
A physical consumption meter will need to have a HBCM token in its wallet in order to identity itself to the HydroBloxDistributor smart contract when subscribing as consumer.
Currently no claims are assigned to this identity.
In the future, claims could be added such as the amount of persons using this consumption meter.
HBT tokens could then be divided taking the amount of persons into account.

### HydroBloxProductionMeter

The HydroBloxProductionMeter (HBPM) smart contract is a DID representation for a production meter, implemented as an ERC721 token (NFT).
A physical production meter will need to have a HBPM token in its wallet in order to identity itself to the HydroBloxDistributor smart contract when subscribing as producer.
Currently no claims are assigned to this identity.

### HydroBloxAuthority

The HydroBloxAuthority smart contract is the issuer of HydroBloxConsumptionMeter (HBCM) and HydroBloxProductionMeter (HBPM) tokens.

### MultiOwnable

Both the HydroBloxDistributor and HydroBloxAuthority smart contracts implement the MultiOwnable smart contract.
This smart contract exists for testing purposes only, so each of team members can be an owner on the deployed environment.
The owners are for example able to transition the state machine from one state to another, or to issue HBCM and HBPM identities.

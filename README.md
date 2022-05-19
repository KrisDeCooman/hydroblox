# HydroBlox

The HydroBlox project was developed as part of the Blockchain@Home education at Howest.

Table of content
- [Analysis](?anchor=analysis)
- [Design decisions](?anchor=design-decisions)
- [Usage](?anchor=usage)
- [Authors](?anchor=authors)

## Analysis

## Design decisions

### Smart contracts

#### HydroBloxToken

The HydroBloxToken (HBT) smart contract is the representation of drinkable water, implemented as an ERC20 token. 1 HBT is equal to 1 liter of drinkable water.

HBT tokens are minted when a producer produces water. HBT tokens are burned when a consumer consumers water.

#### HydroBloxStateDistributor

The HydroBloxStateDistributor is the main smart contract and uses most of the other smart contacts discussed here.
Both consumers and producers call this contract when they want to enroll into the HydroBlox drinkable water distribution process.
Consumers need to pay in ether when they want to enroll. Producers are paid in ether when they produce water.
Enrolled consumers are entitled to claim HBT tokens, which they can then use to consume drinkable water.

#### HydroBloxStorage

The HydroBloxStateDistributor smart contract uses the HydroBloxStorage to keep track of the consumers, producers, the HBT tokens to divide and the ether to divide.

#### HydroBloxStateMachine

The HydroBloxStateDistributor smart contract implements the HydroBloxStateMachine contract, which is a representation of a subscription state machine.
The state machine can be in states:
- Enrollment: during this state, consumers and producers can enroll for the upcoming subscription run
- Running: during this state, producers can produce water and consumers can claim HBT tokens
- Finished: during this state, producers can claim their earned ether and consumers can claim HBT tokens

The reason why we use a state machine, is to keep the consumers and producers fixed during the running and finished state.
Having a fixed set of consumers and producers enables us to evenly divide the ether and HBT tokens, without the need for complex computations and/or for loops.

We chose to transition from one state to the next one manually, by calling a function on the smart contract.
We do this for testing purposes. In reality, we would implement the transitions to happen automatically tiggered by time (using the block number).

#### HydroBloxConsumptionMeter

The HydroBloxConsumptionMeter (HBCM) smart contract is a DID representation for a consumption meter, implemented as an ERC721 token (NFT).
A physical consumption meter will need to have a HBCM token in its wallet in order to identity itself to the HydroBloxStateDistributor smart contract when enrolling as consumer.
Currently no claims are assigned to this identity.
In the future, claims could be added such as the amount of persons using this consumption meter.
HBT tokens could then be divided taking the amount of persons into account.

#### HydroBloxProductionMeter

The HydroBloxProductionMeter (HBPM) smart contract is a DID representation for a production meter, implemented as an ERC721 token (NFT).
A physical production meter will need to have a HBPM token in its wallet in order to identity itself to the HydroBloxStateDistributor smart contract when enrolling as producer.
Currently no claims are assigned to this identity.

#### HydroBloxAuthority

The HydroBloxAuthority smart contract is the issuer of HydroBloxConsumptionMeter (HBCM) and HydroBloxProductionMeter (HBPM) tokens.

#### MultiOwnable

Both the HydroBloxStateDistributor and HydroBloxAuthority smart contracts implement the MultiOwnable smart contract.
This smart contract only exists for testing purposes only, so each of team members can be owner on the deployed environment.
The owners are able to transition the state machine from one state to another, or to issue HBCM and HBPM identities.

### Example

todo example

### Frontend

angular

### Hosting

- IPFS
- ethereum test net. which one. why? polygon in we wuold go to production? why?

### Development

Remix
Visual Studio Code

### Deployment

Deployment of the smart contracts easily can be done using Remix, following these steps:
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

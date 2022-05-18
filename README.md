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

todo:
- transitions can be triggered by owners (for testing purposes)
- IRL we would implement the state machine to transition automatically based on the block number (representation of time)
- multi-ownable for testing purposes so we all can do the transitions
- state machine with states enrollment, running, finished. reason: keep the consumers and producers fixed during running/finished phase (so we can evenly divide tokens and ether)
- example of state machine with consumers and producers

#### MultiOwnable
#### HydroBloxToken
#### HydroBloxStorage
#### HydroBloxStateMachine
#### HydroBloxStateDistributor
#### HydroBloxConsumptionMeter
#### HydroBloxProductionMeter

### Frontend

angular

### Hosting

IPFS

### Development

Remix
Visual Studio Code

### Deployment

Remix
Cloudflare?

## Usage

## Authors

- Bart Denecker
- Ian Haegemans
- Jeroen Janssens
- Kris De Cooman

## 08. Market demo scenario

### Start state
We have two consumers A and B, where A only has limited amount of available tokens and B still has plenty.
- A = 5 HBT
- B = 200 HBT

### Actions needed to acquire more tokens
A wants to buy 100 HBT against paying 2,000,000 WETH. 
Before A can *make* an offer, A has to *approve* that the market contract can transfer an amount of A's tokens to the market smart contract.
This approve is for the paying leg of the offer (here WETH). It ensures that the amount A has to pay is locked in the market contract.
Then A can put in an offer. This offer gets an ID, 1 in this case.

When B sees this offer, which matches his interest, he can decide to *take* the offer. 
Just like A, B has to *approve* that the market contract can transfer the tokens B has to pay for (this is HBT).
However B doesn't want to take the entire offer, he will only take half.
B can *take* offer 1 for the quantity of 1,000,000 WETH. This will transfer 50 HBT from A to B.

Note that the WETH contract is in wei.

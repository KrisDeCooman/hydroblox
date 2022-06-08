## 02. General design principles

During the project we tried to keep some import values/design principles in mind.

### Gaining trust & maintainability
In order to reduce the unexpected behavior of our code as much as possible, we used of the state machine pattern. This gives a clear view for users on what the smart contract actually does in a transparent way. Next we also tried to make use of modifiers to check certain preconditions which improves the readability.

Adding new features in the future should also be safer as it's more concise and better manageable from a security point of view. This should increase the trustworthiness in Hydroblox for users and thus ultimately increase the usage.

### Upgradability & costs
We decided to create a separate contract for the business logic and the actual data storage. It adds some complexity and code for a relative small project, but this should make Hydroblox more future-proof to work on as data storage is abstracted from the business logic. In order to minimize gas usage we tried to avoid using loops and made use of the Withdrawal pattern where users instead of the contract pay to withdraw tokens.

This limitation was not always easy and required a bit of creativity sometimes. For example, one of the functionalities is that we calculate how many tokens each consumer can claim during a subscription period while making sure that they don't claim more tokens than their "fair share", without updating this every time for every consumer individually when new tokens are minted.

### Economic value
The blockchain solution we developed should make economic sense and should try to solve the 3 current problems we see with the current water management policy as stated in Analysis section.

1. Our solution is decentralized and allows that minted tokens, which will depend on the amount of rain being captured in the reservoirs, gets divided in a fair way to subscribed consumers. Consumers can then use these tokens as they wish, no prohibitions required.
  
2. Spendthrift/unresponsible consumers will get penalized as they will run out of tokens during droughts as no new tokens will get created, they will need to buy tokens from frugal consumers who will have a surplus of tokens and thus get rewarded for being frugal.
  
3. As the amount and the price of the tokens will be visible on a website/app this should make more consumers aware of the fact that water is something valuable, especially during droughts.
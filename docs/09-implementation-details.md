## 09. Implementation details

### Development

Development of HydroBlox was done using Remix and Visual Studio Code.

#### Frontend

We tried to identity the best frontend framework to create our DApp in. But we came to the conclusion that there is no such framework and that most/all Javascript SPA framework can be used. We chose Angular since on of us already had some experience with it.

We invested time to improve the usability in the frontend and lower the chance on errors:
- Show loader when calling/sending to smart contract
- Show snacks (error messages) with a usefull description in case errors occur
- Reload the application when switching account (back to home), so you can test with multiple accounts
- Reload the application when switching network (back to home), to make sure you are on the right network
- Check whether the connected network is the one configured (Volta)
- Reload the current page when events are triggered from the smart contracts

### Deployment

Deployment of the smart contracts can easily be done using Remix, following these steps:
- Deploy the HydroBloxAuthority smart contract
- Get the address of the HydroBloxConsumptionMeter and HydroBloxProductionMeter contracts (created by HydroBloxAuthority)
- Deploy the HydroBloxDistributor smart contract, given the addresses of the HydroBloxConsumptionMeter and HydroBloxProductionMeter contracts

### Hosting

#### Smart contracts

Our smart contracts are hosted on the Energy Web's Volta testnet. Energy Web is fast: it has a blocktime of less than 5 seconds. And Energy Web is relatively cheap: it has a low transaction cost.

To connect your MetaMask to the Volta testnet, you need to add a new network with the following details:
- Network name: Volta
- New RPC URL: https://volta-rpc.energyweb.org
- ChaindID: 73799
- Symbol: VT
- Blockexplorer: https://volta-explorer.energyweb.org/

Volta tokens can be received from the faucet: https://voltafaucet.energyweb.org/.

Blocks and transaction can be explored using the Volta explorer: https://volta-explorer.energyweb.org/.

#### Frontend

Our frontend is hosted on IPFS. To make our frontend compatible with IPFS, we needed to do two steps:
- Change <base href> tag
- Build our frontend as follows: ng build --prod --aot

This will deliver some artifacts in the dist folder, that can then be uploaded to IPFS.

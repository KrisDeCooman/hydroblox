## 08. Implementation details

### Frontend

angular
googled for the best frontend framework to be used, but concluded that all frameworks should be usable

features to improve usability:
- loader when calling/sending to smart contract
- snacks (error messages) with a usefull description in case errors occur
- reload application when switching account (back to home) -> so you can test with multiple accoutns
- reload application when switching network (back to home)
- check whether network is rinkeby
- reload current page when events from smart contract

### Hosting

#### Smart contracts

Our smart contracts are hosted on the Energy Web's Volta testnet. Energy Web is fast: it has a blocktime of less than 5 seconds. And Energy Web is relatively cheap: it has a low transaction cost.

To connect your MetaMask to the Volta testnet, you need to add a new network with the following details:
- Network name: Volta
- New RPC URL: https://volta-rpc.energyweb.org
- ChaindID: 73799
- Symbol: VT
- Blockexplorer: https://volta-explorer.energyweb.org/

Volta tokens can be received from the faucet: https://voltafaucet.energyweb.org/
Blocks and transaction can be explored using the Volta explorer: https://volta-explorer.energyweb.org/

#### Frontend

Our frontend is hosted on IPFS. To make our frontend compatible with IPFS, we needed to do two steps:
- Change <base href> tag
- Build our frontend as follows: ng build --prod --aot

This will deliver some artifacts in the dist folder, that can then be uploaded to IPFS.

### Development

Remix
Visual Studio Code

### Deployment

Deployment of the smart contracts can easily be done using Remix, following these steps:
- Deploy the HydroBloxAuthority smart contract
- Get the address of the HydroBloxConsumptionMeter and HydroBloxProductionMeter contracts (created by HydroBloxAuthority)
- Deploy the HydroBloxDistributor smart contract, given the addresses of the HydroBloxConsumptionMeter and HydroBloxProductionMeter contracts

Cloudflare?

updateable smart contracts?

beschrijven: chip op de smart meters die de access tot de blockchain zullen doen (consume/produce)
consumption meter: deze zullen automatisch hun tokens claimen wanneer deze beschikbaar zijn
-> zelfde voor production meter
het zal ook de consumption meter zijn die tokens te koop zal aanbieden wanneer deze (te) veel tokens ter beschikking heeft
het zal ook de consumption meter zijn die tokens zal aankopen wanneer deze te weinig heeft
=> hebben de regels rond de prijszetting dan zelf in de hand

wat met initiele PDF dat we gemaakt hebben? hierin verwerken of is dat reeds gebeurd?
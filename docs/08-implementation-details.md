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

- IPFS
- volta (energy web): snel (blocktime 5 seconden) + cheap (low transaction cost)
connect your metamask: https://pedroporky.medium.com/how-to-test-energy-webs-staking-mechanism-using-volta-testnet-tokens-223196b2b4c4
get volta tokens from faucet: https://voltafaucet.energyweb.org/
volta explorer: https://volta-explorer.energyweb.org/

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
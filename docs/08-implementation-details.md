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

updateable smart contracts?
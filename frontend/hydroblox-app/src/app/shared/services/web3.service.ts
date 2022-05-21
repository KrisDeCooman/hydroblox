import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { ErrorCodes, ErrorSnackService } from './errorsnack.service';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

    private expectedChainId = "0x4"; // Rinkeby Test Network -- TODO get this from settings?
    private connected = false;

    constructor(private errorSnackService: ErrorSnackService) {
    }

    public isConnected() : boolean {
        return this.connected;
    }

    public async connect(): Promise<boolean> {
        // see: https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

        this.connected = false;

        const provider = await detectEthereumProvider();
        if (!provider) {
            this.errorSnackService.showError(ErrorCodes.MetaMaskNotInstalled);
            return false;
        }

        if (provider !== window.ethereum) {
            this.errorSnackService.showError(ErrorCodes.MultipleWallets);
            return false;
        }

        var accounts: any;
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        }
        catch (error: any) {
            if (error.code === 4001) {
                this.errorSnackService.showError(ErrorCodes.MetaMaskUserRejected);
                return false;
            }
            else if (error.code === -32002) {
                this.errorSnackService.showError(ErrorCodes.MetaMaskAlreadyProcessing);
                return false;
            }
            else {
                console.error(error);
                this.errorSnackService.showError(ErrorCodes.Unexpected);
                return false;
            }
        }

        if (accounts.length === 0) {
            this.errorSnackService.showError(ErrorCodes.MetaMaskLockedOrNoAccounts);
            return false;
        }

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId != this.expectedChainId) {
            this.errorSnackService.showError(ErrorCodes.MetaMaskWrongChain);
            return false;
        }

        console.log('Connected to Metamask!');
        this.connected = true;
        return true;
    }
}

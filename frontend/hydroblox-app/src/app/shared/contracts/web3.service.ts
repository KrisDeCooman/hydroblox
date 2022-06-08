import { Injectable, NgZone } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { Constants } from './constants';
import { ErrorCodes, ErrorSnackService } from '../services/errorsnack.service';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { Router } from '@angular/router';

declare const window: any;

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    private web3: Web3 | undefined;
    private distributor: Contract | undefined;
    private storage: Contract | undefined;
    private token: Contract | undefined;
    private consumptionMeter: Contract | undefined;

    constructor(
        zone: NgZone,
        router: Router,
        private errorSnackService: ErrorSnackService) {

        // see: https://docs.metamask.io/guide/ethereum-provider.html#events
        var onChainOrAccountsChanged = () => {
            console.log('Your chain or account changed in MetaMask. You will be redirected to home.');
            this.web3 = undefined;
            zone.run(() => router.navigate(['']));
        };
        if (window.ethereum) {
            window.ethereum.on('chainChanged', onChainOrAccountsChanged);
            window.ethereum.on('accountsChanged', onChainOrAccountsChanged);
        }
    }

    public isConnected(): boolean {
        return this.web3 != undefined;
    }

    public async connect(): Promise<boolean> {
        // see: https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

        this.web3 = undefined;

        const provider = await detectEthereumProvider();
        if (!provider) {
            this.errorSnackService.showError(ErrorCodes.MetaMaskNotInstalled);
            return false;
        }

        if (provider !== window.ethereum) {
            this.errorSnackService.showError(ErrorCodes.MultipleWallets);
            return false;
        }

        var accounts: string[];
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
        if (chainId != Constants.NetworkId) {
            this.errorSnackService.showError(ErrorCodes.MetaMaskWrongChain);
            return false;
        }

        console.log('Connected to Metamask!');

        this.web3 = new Web3(window.ethereum);
        this.web3.defaultAccount = accounts[0];
        this.distributor = new this.web3.eth.Contract(Constants.DistributorAbi, Constants.DistributorAddress, { from: accounts[0] });
        this.storage = new this.web3.eth.Contract(Constants.StorageAbi, Constants.StorageAddress, { from: accounts[0] });
        this.token = new this.web3.eth.Contract(Constants.TokenAbi, Constants.TokenAddress, { from: accounts[0] });
        this.consumptionMeter = new this.web3.eth.Contract(Constants.ConsumptionMeterAbi, Constants.consumptionMeterAddress, { from: accounts[0] });

        return true;
    }

    public getDistributorContract(): Contract {
        return this.distributor!;
    }

    public getStorageContract(): Contract {
        return this.storage!;
    }

    public getTokenContract(): Contract {
        return this.token!;
    }

    public getConsumptionMeterContract(): Contract {
        return this.consumptionMeter!;
    }



}

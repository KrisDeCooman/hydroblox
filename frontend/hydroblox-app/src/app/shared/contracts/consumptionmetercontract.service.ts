import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { ErrorSnackService } from '../services/errorsnack.service';
import { LoaderService } from '../services/loader.service';
import { BaseContractService } from './basecontract.service';
import { Web3Service } from './web3.service';
import Web3 from 'web3';

declare const window: any;

@Injectable({
    providedIn: 'root'
})

export class ConsumptionMeterContractService extends BaseContractService {



    private web3: Web3 | undefined;

    constructor(
        private web3Service: Web3Service,
        loadService: LoaderService,
        snackService: ErrorSnackService) {
        super(loadService, snackService);


    }


    async isConsumer(): Promise<boolean> {

        var accounts: string[];

        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        this.web3 = new Web3(window.ethereum);
        this.web3.defaultAccount = accounts[0];
        var contract = this.web3Service.getConsumptionMeterContract();
        var status = await contract.methods.balanceOf(accounts[0]).call();

        if (status = 1) {
            return true;
        } else {
            return false;
        }




    }

    async getTokenBalance(): Promise<number> {
        var accounts: string[];

        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        this.web3 = new Web3(window.ethereum);
        this.web3.defaultAccount = accounts[0];

        var contract = this.web3Service.getTokenContract();
        var amount = await contract.methods.balanceOf(accounts[0]).call();
        return amount;
    }

    async getSubscriptionState(): Promise<boolean> {

        var accounts: string[];

        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        this.web3 = new Web3(window.ethereum);
        this.web3.defaultAccount = accounts[0];


        var contract = this.web3Service.getStorageContract();

        return await contract.methods.isConsumer(accounts[0]).call();



    }



    async currentState(): Promise<string> {
        var contract = this.web3Service.getDistributorContract();
        var result = await super.call<string>(contract, 'state');

        if (result === '0') {
            return 'Enrollment';
        }
        else if (result === '1') {
            return 'Running';
        }
        else if (result === '2') {
            return 'Finished';
        }
        else {
            return 'Unkown'
        }
    }
}

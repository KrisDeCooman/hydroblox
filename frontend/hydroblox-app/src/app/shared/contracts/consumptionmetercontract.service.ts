import { Injectable } from '@angular/core';
import { ErrorSnackService } from '../services/errorsnack.service';
import { LoaderService } from '../services/loader.service';
import { BaseContractService } from './basecontract.service';
import { Web3Service } from './web3.service';

@Injectable({
    providedIn: 'root'
})

export class ConsumptionMeterContractService extends BaseContractService {

    constructor(
        private web3Service: Web3Service,
        loadService: LoaderService,
        snackService: ErrorSnackService) {
            super(loadService, snackService);
    }

    async isConsumptionMeter(): Promise<boolean> {

        var contract = this.web3Service.getConsumptionMeterContract();
        var account = this.web3Service.getDefaultAccount();
        var balance = await super.call<number>(contract, 'balanceOf', account);

        if (balance > 0) {
            return true;
        } else {
            return false;
        }
    }
}

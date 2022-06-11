import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConsumptionMeterContractService } from 'src/app/shared/contracts/consumptionmetercontract.service';
import { DistributorContractService } from 'src/app/shared/contracts/distributorcontract.service';
import { StorageContractService } from 'src/app/shared/contracts/storagecontract.service';
import { HydroBloxTokenContractService } from 'src/app/shared/contracts/hydrobloxtokencontract.service';

@Component({
    templateUrl: './consumption-meter.component.html',
    styleUrls: ['./consumption-meter.component.css']
})

export class ConsumptionMeterComponent implements OnInit {

    hasTokens: boolean = false;
    tokensAvailableToClaim: boolean = false;
    tokenBalance: number = 0;
    isSubscribedConsumer: boolean = false;


    currentState: string = '';

    constructor(
        private distributorContractService: DistributorContractService,
        private consumptionMeterContractService: ConsumptionMeterContractService,
        private hydrobloxtokenContractService: HydroBloxTokenContractService,
        private storageContractService: StorageContractService) { }


    async ngOnInit(): Promise<void> {
        this.currentState = await this.distributorContractService.currentState();
        this.tokenBalance = await this.hydrobloxtokenContractService.tokenBalance();
        this.isSubscribedConsumer = await this.storageContractService.isSubscribedConsumer();

        if (await this.distributorContractService.tokenTotalSupply() > 0) {
            this.tokensAvailableToClaim = true;
        }

    }

    async consumeTokens() {

    }

    async subscribeAsConsumer(): Promise<boolean> {
        return this.distributorContractService.subscribeAsConsumer();
    }

    async claimTokensAsConsumer() {
        return this.distributorContractService.claimTokensAsConsumer();
    }
}
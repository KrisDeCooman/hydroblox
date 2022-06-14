import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConsumptionMeterContractService } from 'src/app/shared/contracts/consumptionmetercontract.service';
import { DistributorContractService } from 'src/app/shared/contracts/distributorcontract.service';
import { StorageContractService } from 'src/app/shared/contracts/storagecontract.service';

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
        private storageContractService: StorageContractService) { }


    async ngOnInit(): Promise<void> {
        this.currentState = await this.distributorContractService.currentState();
        this.tokenBalance = await this.distributorContractService.tokenBalance();
        this.isSubscribedConsumer = await this.storageContractService.isSubscribedConsumer();

        if (await this.distributorContractService.tokenTotalSupply() > 0 && this.currentState === 'Running') {
            this.tokensAvailableToClaim = true;
        }

        if (this.tokenBalance > 0) {
            this.hasTokens = true;
        }

    }

    async consumeTokens(amountOfHBT: string): Promise<void> {
        return this.distributorContractService.consume(parseInt(amountOfHBT));
    }

    async subscribeAsConsumer(): Promise<void> {
        return this.distributorContractService.subscribeAsConsumer();
    }

    async claimTokensAsConsumer(): Promise<void> {
        return this.distributorContractService.claimTokensAsConsumer();
    }
}
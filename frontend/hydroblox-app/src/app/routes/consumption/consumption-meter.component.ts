import { Component, OnInit } from '@angular/core';
import { DistributorContractService } from 'src/app/shared/contracts/distributorcontract.service';
import { StorageContractService } from 'src/app/shared/contracts/storagecontract.service';

@Component({
    templateUrl: './consumption-meter.component.html',
    styleUrls: ['./consumption-meter.component.css']
})
export class ConsumptionMeterComponent implements OnInit {

    tokenBalance: number = 0;
    isSubscribedConsumer: boolean = false;
    currentState: string = '';
    canConsume: boolean = false;
    canSubscribe: boolean = false;
    canClaim: boolean = false;

    constructor(
        private distributorContractService: DistributorContractService,
        private storageContractService: StorageContractService) { }

    async ngOnInit(): Promise<void> {
        this.currentState = await this.distributorContractService.currentState();
        this.tokenBalance = await this.distributorContractService.tokenBalance();
        this.isSubscribedConsumer = await this.storageContractService.isSubscribedConsumer();

        this.canConsume = this.tokenBalance > 0;
        this.canSubscribe = this.currentState === 'Enrollment' && !this.isSubscribedConsumer;
        this.canClaim = this.currentState !== 'Enrollment' && this.isSubscribedConsumer;
    }

    async consumeTokens(amountOfHBT: string): Promise<void> {
        await this.distributorContractService.consume(parseInt(amountOfHBT));
        await this.ngOnInit();
    }

    async subscribeAsConsumer(): Promise<void> {
        await this.distributorContractService.subscribeAsConsumer();
        await this.ngOnInit();
    }

    async claimTokensAsConsumer(): Promise<void> {
        await this.distributorContractService.claimTokensAsConsumer();
        await this.ngOnInit();
    }
}
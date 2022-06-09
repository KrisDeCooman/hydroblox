import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumptionMeterContractService } from 'src/app/shared/contracts/consumptionmetercontract.service';
import { DistributorContractService } from 'src/app/shared/contracts/distributorcontract.service';
import { StorageContractService } from 'src/app/shared/contracts/storagecontract.service';

@Component({
    templateUrl: './consumption-meter.component.html',
    styleUrls: ['./consumption-meter.component.css']
})

export class ConsumptionMeterComponent implements OnInit {

    hasTokens: boolean = false;
    tokenBalance: number = 0;
    isSubscribedConsumer: boolean = false;

    currentState: string = '';

    constructor(
        private distributorContractService: DistributorContractService,
        private consumptionMeterContractService: ConsumptionMeterContractService,
        private storageContractService: StorageContractService,
        private router: Router) { }


    async ngOnInit(): Promise<void> {
        this.currentState = await this.distributorContractService.currentState();
        this.tokenBalance = await this.distributorContractService.tokenBalance();
        this.isSubscribedConsumer = await this.storageContractService.isSubscribedConsumer();
    }

    async consumeTokens() {
        await this.router.navigate(['authority']);
    }

    async subscribe() {

    }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumptionMeterContractService } from 'src/app/shared/contracts/consumptionmetercontract.service';

@Component({
    templateUrl: './consumption-meter.component.html',
    styleUrls: ['./consumption-meter.component.css']
})

export class ConsumptionMeterComponent implements OnInit {

    hasTokens: boolean = false;
    tokenBalance: number = 0;
    subscriptionState: boolean = false;

    currentState: string = '';

    constructor(private consumptionMeterContractService: ConsumptionMeterContractService,
        private router: Router) { }


    async ngOnInit(): Promise<void> {
        this.currentState = await this.consumptionMeterContractService.currentState();
        this.tokenBalance = await this.consumptionMeterContractService.getTokenBalance();
        this.subscriptionState = await this.consumptionMeterContractService.getSubscriptionState();

    }

    async consumeTokens() {
        await this.router.navigate(['authority']);
    }

    async subscribe() {

    }



}
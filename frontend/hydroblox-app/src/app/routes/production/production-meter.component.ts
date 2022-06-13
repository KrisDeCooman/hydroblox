import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { DistributorContractService } from 'src/app/shared/contracts/distributorcontract.service';
import { StorageContractService } from 'src/app/shared/contracts/storagecontract.service';

@Component({
  templateUrl: './production-meter.component.html',
  styleUrls: ['./production-meter.component.css']
})

export class ProductionMeterComponent implements OnInit {
  productionWater!: number;
    currentState: string = '';
    isSubscribedProducer: boolean = false;
    isNotsubscribedProducer: boolean = true;


    
  
    constructor(private distributorContractService: DistributorContractService,
      private storageContractService: StorageContractService) { }
  
    async ngOnInit(): Promise<void> {
      this.currentState = await this.distributorContractService.currentState();
      this.isSubscribedProducer = await this.storageContractService.isSubscribedProducer();
      this.isNotsubscribedProducer =! await this.storageContractService.isSubscribedProducer();
    }
    async subscribe() {
        await this.distributorContractService.subscribeProducer();
      
  
    }
    async producewater( productionWater:number) {
      await this.distributorContractService.produce(productionWater);
    }
    async claimProducer() {
      await this.distributorContractService.claimTokensAsProducer();
    }
    
  }
  
  

import { Component, OnInit } from '@angular/core';
import { DistributorContractService } from 'src/app/shared/contracts/distributorcontract.service';
import { StorageContractService } from 'src/app/shared/contracts/storagecontract.service';

@Component({
    templateUrl: './production-meter.component.html',
    styleUrls: ['./production-meter.component.css']
})

export class ProductionMeterComponent implements OnInit {

    currentState: string = '';
    isSubscribedProducer: boolean = false;
  
    constructor(private distributorContractService: DistributorContractService,
      private storageContractService: StorageContractService,) { }
  
    async ngOnInit(): Promise<void> {
      this.currentState = await this.distributorContractService.currentState();
      this.isSubscribedProducer = await this.storageContractService.isSubscribedProducer();
    }
    async subscribe() {
        await this.distributorContractService.subscribeProducer();
      
  
    }
  
  }
  
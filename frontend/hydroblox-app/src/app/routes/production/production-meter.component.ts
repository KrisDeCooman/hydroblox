import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { DistributorContractService } from 'src/app/shared/contracts/distributorcontract.service';
import { StorageContractService } from 'src/app/shared/contracts/storagecontract.service';

@Component({
  templateUrl: './production-meter.component.html',
  styleUrls: ['./production-meter.component.css']
})
export class ProductionMeterComponent implements OnInit {

  currentState: string = '';
  isSubscribedProducer: boolean = false;
  canProduce: boolean = false;
  canSubscribe: boolean = false;
  canClaim: boolean = false;

  constructor(private distributorContractService: DistributorContractService,
    private storageContractService: StorageContractService) { }

  async ngOnInit(): Promise<void> {
    this.currentState = await this.distributorContractService.currentState();
    this.isSubscribedProducer = await this.storageContractService.isSubscribedProducer();

    this.canProduce = this.currentState === 'Running' && this.isSubscribedProducer;
    this.canSubscribe = this.currentState === 'Enrollment' && !this.isSubscribedProducer;
    this.canClaim = this.currentState === 'Finished' && this.isSubscribedProducer;
  }

  async subscribe(): Promise<void> {
    await this.distributorContractService.subscribeAsProducer();
    await this.ngOnInit();
  }

  async producewater(productionWater: number): Promise<void> {
    await this.distributorContractService.produce(productionWater);
  }

  async claimProducer(): Promise<void> {
    await this.distributorContractService.claimTokensAsProducer();
  }
}

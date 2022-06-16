import { Component, OnInit } from '@angular/core';
import { DistributorContractService } from 'src/app/shared/contracts/distributorcontract.service';
import { StorageContractService } from 'src/app/shared/contracts/storagecontract.service';

@Component({
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {

  currentState: string = '';
  subscriptionRunId: number | undefined;
  tokenTotalSupply: number | undefined;
  tokensToDivide: number | undefined;
  etherToDivide: number | undefined;
  numberOfConsumers: number | undefined;
  numberOfProducers: number | undefined;

  constructor(
    private distributorContractService: DistributorContractService,
    private storageContractService: StorageContractService) { }

  async ngOnInit(): Promise<void> {
    const oneEther = 1000000000000000000;
    this.currentState = await this.distributorContractService.currentState();
    this.subscriptionRunId = await this.storageContractService.subscriptionRunId();
    this.tokenTotalSupply = await this.distributorContractService.tokenTotalSupply();
    this.tokensToDivide = await this.storageContractService.tokensToDivide();
    this.etherToDivide = await this.storageContractService.etherToDivide() / oneEther;
    this.numberOfConsumers = await this.storageContractService.numberOfConsumers();
    this.numberOfProducers = await this.storageContractService.numberOfProducers();
  }

  async onTransitionClicked() {
    await this.distributorContractService.transitionToNextState();
  }
}

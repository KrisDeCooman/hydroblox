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

  constructor(
    private distributorContractService: DistributorContractService,
    private storageContractService: StorageContractService) { }

  async ngOnInit(): Promise<void> {
    this.currentState = await this.distributorContractService.currentState();
    this.subscriptionRunId = await this.storageContractService.subscriptionRunId();
    this.tokenTotalSupply = await this.distributorContractService.tokenTotalSupply();
  }

  async onTransitionClicked() {
    await this.distributorContractService.transitionToNextState();
  }
}

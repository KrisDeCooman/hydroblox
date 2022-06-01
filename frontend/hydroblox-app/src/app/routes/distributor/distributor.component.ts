import { Component, OnInit } from '@angular/core';
import { DistributorContractService } from 'src/app/shared/contracts/distributorcontract.service';

@Component({
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {

  currentState: string = '';

  constructor(private distributorContractService: DistributorContractService) { }

  async ngOnInit(): Promise<void> {
    this.currentState = await this.distributorContractService.currentState();
  }

  async onTransitionClicked() {
    await this.distributorContractService.transitionToNextState();
    this.currentState = await this.distributorContractService.currentState();
  }
}

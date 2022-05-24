import { Component, OnInit } from '@angular/core';
import { DistributorContractService } from 'src/app/shared/services/distributorcontract.service';

@Component({
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {

  constructor(private distributorContractService: DistributorContractService) {
  }

  async ngOnInit(): Promise<void> {
    await this.distributorContractService.isOwner();
  }
}

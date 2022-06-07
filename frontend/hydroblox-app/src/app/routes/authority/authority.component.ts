import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthorityContractService } from 'src/app/shared/contracts/authoritycontract.service';

@Component({
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent implements OnInit {

  @ViewChild('consumptionMeterAddress') consumptionMeterAddress: ElementRef | undefined;
  @ViewChild('productionMeterAddress') productionMeterAddress: ElementRef | undefined;

  constructor(private authorityContractService: AuthorityContractService) { }

  async ngOnInit(): Promise<void> {
  }

  async onIssueConsumptionMeterTokenClicked(address: string) {
    await this.authorityContractService.issueConsumptionMeter(address);
    this.consumptionMeterAddress!.nativeElement.value = null;
  }

  async onIssueProductionMeterTokenClicked(address: string) {
    await this.authorityContractService.issueProductionMeter(address);
    this.productionMeterAddress!.nativeElement.value = null;
  }
}

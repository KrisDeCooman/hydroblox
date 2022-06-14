import { Injectable } from '@angular/core';
import { ErrorSnackService } from '../services/errorsnack.service';
import { LoaderService } from '../services/loader.service';
import { BaseContractService } from './basecontract.service';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorityContractService extends BaseContractService {

  constructor(
    private web3Service: Web3Service,
    loadService: LoaderService,
    snackService: ErrorSnackService) {
    super(loadService, snackService);
  }

  async isOwner(): Promise<boolean> {
    var contract = this.web3Service.getAuthorityContract();
    return await super.call<boolean>(contract, 'isOwner');
  }

  async issueConsumptionMeter(address: string): Promise<void> {
    var contract = this.web3Service.getAuthorityContract();
    return await super.send<void>(contract, 'issueConsumptionMeter', 0, address);
  }

  async issueProductionMeter(address: string): Promise<void> {
    var contract = this.web3Service.getAuthorityContract();
    return await super.send<void>(contract, 'issueProductionMeter', 0, address);
  }
}

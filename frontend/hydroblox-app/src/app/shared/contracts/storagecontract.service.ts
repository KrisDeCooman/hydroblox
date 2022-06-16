import { Injectable } from '@angular/core';
import { ErrorSnackService } from '../services/errorsnack.service';
import { LoaderService } from '../services/loader.service';
import { BaseContractService } from './basecontract.service';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class StorageContractService extends BaseContractService {

  constructor(
    private web3Service: Web3Service,
    loadService: LoaderService,
    snackService: ErrorSnackService) {
    super(loadService, snackService);
  }

  async isSubscribedConsumer(): Promise<boolean> {
    var contract = this.web3Service.getStorageContract();
    var account = this.web3Service.getDefaultAccount();
    return await super.call<boolean>(contract, 'isSubscribedConsumer', account);
  }

  async isSubscribedProducer(): Promise<boolean> {
    var contract = this.web3Service.getStorageContract();
    var account = this.web3Service.getDefaultAccount();
    return await super.call<boolean>(contract, 'isSubscribedProducer', account);
  }

  async subscriptionRunId(): Promise<number> {
    var contract = this.web3Service.getStorageContract();
    return await super.call<number>(contract, 'subscriptionRunId');
  }

  async tokensToDivide(): Promise<number> {
    var contract = this.web3Service.getStorageContract();
    return await super.call<number>(contract, 'tokensToDivide');
  }

  async etherToDivide(): Promise<number> {
    var contract = this.web3Service.getStorageContract();
    return await super.call<number>(contract, 'etherToDivide');
  }

  async numberOfConsumers(): Promise<number> {
    var contract = this.web3Service.getStorageContract();
    return await super.call<number>(contract, 'numberOfConsumers');
  }

  async numberOfProducers(): Promise<number> {
    var contract = this.web3Service.getStorageContract();
    return await super.call<number>(contract, 'numberOfProducers');
  }
}

import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class DistributorContractService {

    constructor(private web3Service: Web3Service) {
    }

    async isOwner(): Promise<boolean> {
        var contract = this.web3Service.getDistributorContract();
        var result = await contract.methods.isOwner().call();
        return result;
    }

    async currentState(): Promise<string> {
      var contract = this.web3Service.getDistributorContract();
      var result: string = await contract.methods.state().call();

      if (result === '0') {
        return 'Enrollment';
      }
      else if (result === '1') {
        return 'Running';
      }
      else if (result === '2') {
        return 'Finished';
      }
      else {
        return 'Unkown'
      }
    }

    async transitionToNextState(): Promise<void> {
      var contract = this.web3Service.getDistributorContract();
      await contract.methods.transitionToNextState().send();
    }
}

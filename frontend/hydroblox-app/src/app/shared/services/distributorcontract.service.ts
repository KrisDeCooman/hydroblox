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

        alert('isOwner: ' + result);

        return result;
    }
}

import { Injectable } from '@angular/core';
import { ErrorCodes, ErrorSnackService } from './errorsnack.service';
import { LoaderService } from './loader.service';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class DistributorContractService {

    constructor(
      private web3Service: Web3Service,
      private loadService: LoaderService,
      private snackService: ErrorSnackService) {
    }

    async isOwner(): Promise<boolean> {
      var result: boolean = false;
      try {
        this.loadService.show();

        var contract = this.web3Service.getDistributorContract();
        result = await contract.methods.isOwner().call();
      }
      catch (error) {
        console.error(error);
        this.snackService.showError(ErrorCodes.Unexpected);
      }
      finally {
        this.loadService.hide();
      }

      return result;
    }

    async currentState(): Promise<string> {
      var result: string | undefined;
      try {
        this.loadService.show();

        var contract = this.web3Service.getDistributorContract();
        result = await contract.methods.state().call();
      }
      catch (error) {
        console.error(error);
        this.snackService.showError(ErrorCodes.Unexpected);
      }
      finally {
        this.loadService.hide();
      }

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
      try {
        this.loadService.show();

        var contract = this.web3Service.getDistributorContract();
        await contract.methods.transitionToNextState().send();
      }
      catch (error) {
        console.error(error);
        this.snackService.showError(ErrorCodes.Unexpected);
      }
      finally {
        this.loadService.hide();
      }
    }
}

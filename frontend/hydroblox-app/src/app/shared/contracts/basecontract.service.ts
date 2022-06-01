import { ErrorCodes, ErrorSnackService } from '../services/errorsnack.service';
import { LoaderService } from '../services/loader.service';
import { Contract } from 'web3-eth-contract';

export abstract class BaseContractService {

    constructor(
      private loadService: LoaderService,
      private snackService: ErrorSnackService) {
    }

    protected async call<T>(contract: Contract, method: string): Promise<T> {
      var result;
      try {
        this.loadService.show();
        result = await contract.methods[method]().call();
      }
      catch {
        this.snackService.showError(ErrorCodes.Unexpected);
      }
      finally {
        this.loadService.hide();
      }
      return result;
    }

    protected async send<T>(contract: Contract, method: string): Promise<T> {
        var result;
        try {
          this.loadService.show();
          result = await contract.methods[method]().send();
        }
        catch {
          this.snackService.showError(ErrorCodes.Unexpected);
        }
        finally {
          this.loadService.hide();
        }
        return result;
      }
}

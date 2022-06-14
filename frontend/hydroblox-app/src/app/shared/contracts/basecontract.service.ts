import { ErrorCodes, ErrorSnackService } from '../services/errorsnack.service';
import { LoaderService } from '../services/loader.service';
import { Contract } from 'web3-eth-contract';

export abstract class BaseContractService {

  constructor(
    private loadService: LoaderService,
    private snackService: ErrorSnackService) {
  }

  protected async call<T>(contract: Contract, method: string, ...params: any[]): Promise<T> {
    var result;
    try {
      this.loadService.show();
      result = await contract.methods[method](...params).call();
    }
    catch (error: any) {
      var errorCode = new ErrorCodes(error.message);
      this.snackService.showError(errorCode);
    }
    finally {
      this.loadService.hide();
    }
    return result;
  }

  protected async send<T>(contract: Contract, method: string, value: number, ...params: any[]): Promise<T> {
    var result;
    try {
      this.loadService.show();
      result = await contract.methods[method](...params).send({ value });
    }
    catch (error: any) {
      var errorCode = new ErrorCodes(error.message);
      this.snackService.showError(errorCode);
    }
    finally {
      this.loadService.hide();
    }
    return result;
  }
}

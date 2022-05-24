import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorSnackService {

  constructor(private snackBar: MatSnackBar) {
  }

  showError(error: ErrorCodes) {
    console.error(error.Description);
    this.snackBar.open(error.Description, 'OK', { duration: 10000 });
  }
}

export class ErrorCodes {

  constructor(private value: number, private description: string) {
  }

  get Description(): string {
    return this.description;
  }

  static Unexpected = new ErrorCodes(0, 'An unexpected error occurred.');
  static MetaMaskNotInstalled = new ErrorCodes(1, 'MetaMask is not installed. Please install MetaMask.');
  static MultipleWallets = new ErrorCodes(2, 'Do you have multiple wallets installed?');
  static MetaMaskUserRejected = new ErrorCodes(3, 'Please connect to MetaMask and do not reject the connection request.');
  static MetaMaskAlreadyProcessing = new ErrorCodes(4, 'MetaMask is already processing your connection request.');
  static MetaMaskLockedOrNoAccounts = new ErrorCodes(5, 'MetaMask is locked or you do not have accounts connected.');
  static MetaMaskWrongChain = new ErrorCodes(6, 'MetaMask is connected to the wrong chain to use this DApp.');
}

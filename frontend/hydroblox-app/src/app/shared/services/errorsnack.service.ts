import {Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorSnackService {

  constructor(private snackBar: MatSnackBar) {
  }

  showError(error: ErrorCodes) {
    this.snackBar.open(error.Description, 'OK', { duration: 10000 });
  }
}

export class ErrorCodes {

  constructor(private value: number, private description: string) {
  }

  get Description(): string {
    return this.description;
  }

  static Unexpected = new ErrorCodes(0, 'An unexpected error occurred');
}

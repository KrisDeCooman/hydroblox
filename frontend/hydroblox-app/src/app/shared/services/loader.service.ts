import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {

  showLoading = new Subject<boolean>();

  show() {
    this.showLoading.next(true);
  }

  hide() {
    this.showLoading.next(false);
  }
}

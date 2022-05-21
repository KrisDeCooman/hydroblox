import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';

@Injectable()
export class LoaderService {

  private overridden = false;

  showLoading = new Subject<boolean>();
  showFinished = new Subject<boolean>();

  show() {
    if (!this.overridden) {
      this.showLoading.next(true);
    }
  }

  hide() {
    if (!this.overridden) {
      this.showLoading.next(false);
    }
  }

  overrideShow() {
    this.show();
    this.overridden = true;
  }

  overrideHide() {
    this.overridden = false;
    this.hide();
  }

  async overrideHideWithFinish(ms: number) {
    this.overrideHide();
    this.showFinished.next(true);
    await timer(ms);
    this.showFinished.next(false);
  }
}

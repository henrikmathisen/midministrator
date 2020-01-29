import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material';
import { BehaviorSubject, timer } from 'rxjs'
import { scan, map, debounce } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinner: OverlayRef = this.cdkSpinnerCreate();

  spin$ = new BehaviorSubject<boolean>(false);

  constructor(private overlay: Overlay) {
    this.spin$
      .asObservable()
      .pipe(
        map(val => val ? 1 : -1),
        scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
      )
      .subscribe(
        (res) => {
          if (res === 1) { if (!this.spinner.hasAttached()) this.showSpinner() }
          else if (res == 0) {
            this.spinner.hasAttached() ? this.stopSpinner() : null;
          }
        }
      )
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically("-20%")
    });
  }

  showSpinner() {
    this.spinner.attach(new ComponentPortal(MatSpinner))
  }

  stopSpinner() {
    this.spinner.detach();
  }
}

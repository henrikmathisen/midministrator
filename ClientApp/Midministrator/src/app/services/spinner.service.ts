import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { BehaviorSubject, timer } from 'rxjs'
import { scan, map, debounce, tap } from 'rxjs/operators'
import { AuthService } from './auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinner: OverlayRef = this.cdkSpinnerCreate();

  spin$ = new BehaviorSubject<boolean>(false);

  constructor(private overlay: Overlay, private authService: AuthService) {
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
      this.authService.loggedIn$.pipe(
        tap(loggedin => {
          if (!loggedin) this.spin$.next(true);
        })
      )
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically("-60vh")
    });
  }

  showSpinner() {
    this.spinner.attach(new ComponentPortal(MatProgressSpinner))
  }

  stopSpinner() {
    this.spinner.detach();
  }
}

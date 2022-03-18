import { Component, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription, tap } from 'rxjs';
import { authCodeFlowConfig } from './auth-config';
import { AuthService } from './services/auth/auth.service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  private loggedInSub: Subscription;

  constructor(private router: Router, private spinner: SpinnerService, private authService: AuthService ) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        spinner.spin$.next(true);
      }
      if (event instanceof NavigationEnd) {
        spinner.spin$.next(false);
      }
      if (event instanceof NavigationCancel) {
        spinner.spin$.next(false);
      }
      if (event instanceof NavigationError) {
        spinner.spin$.next(false);
      }
    });
  }

  title = 'Midministrator';

  ngOnDestroy(): void {
    this.loggedInSub.unsubscribe();
  }

}

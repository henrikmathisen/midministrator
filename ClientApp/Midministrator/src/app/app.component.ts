import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth-config';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private spinner: SpinnerService, private authService: OAuthService ) {
    this.authService.configure(authCodeFlowConfig);
    this.authService.loadDiscoveryDocument().then(discoveryDoc => {
      if (!this.authService.hasValidAccessToken()) {
        this.authService.initLoginFlowInPopup();
      } else {
        this.authService.setupAutomaticSilentRefresh();
      }
    });

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

}

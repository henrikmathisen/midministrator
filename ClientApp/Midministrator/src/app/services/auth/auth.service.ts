import { Injectable, OnInit } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, Subject } from 'rxjs';
import { AuthResult } from '../../models/auth-result';
import { OAuthEvent, OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/auth-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loggedIn$ = this.loggedIn.asObservable();

  constructor(public oAuthService: OAuthService)
  {

    this.oAuthService.events.subscribe({
      next: event => {
        console.log(event);
        if (event.type === 'token_received' || event.type === 'token_refreshed') {
          this.loggedIn.next(true);
        }
      }
    });



    this.oAuthService.configure(authCodeFlowConfig);

    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(discoSuccess => {
      if (discoSuccess && !this.oAuthService.hasValidAccessToken()) {
        this.oAuthService.initLoginFlowInPopup();
      }
    });

    this.oAuthService.setupAutomaticSilentRefresh();

    if (this.oAuthService.hasValidAccessToken()) {
      console.log("valid token", this.oAuthService.hasValidAccessToken())
      this.loggedIn.next(true);
    }

    this.loggedIn.next(this.oAuthService.hasValidAccessToken());

  }

}

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthResult } from '../../models/auth-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private authService: AuthService) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.getAuthPromise();
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
      return this.getAuthPromise();
    }

    getAuthPromise(): Promise<boolean> {
      return this.authService.AuthStatus().toPromise().then(next => {
        if (!next.loggedIn) {
          console.log("Not logged in.");
          window.location.reload();
          return false;
        }
        if (next.loggedIn && !next.success) {
          alert("Unauthorized.");
        }
        console.log(next);
        return next.success;
      }, error => {
        console.error(error);
        return false;
      });
    }

  }

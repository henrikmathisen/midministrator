import { Injectable, OnDestroy, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { combineLatest, Observable, of, Subscription, throwError } from 'rxjs';
import { tap, catchError, skipUntil, retryWhen, filter, timeout, map, concatMap } from 'rxjs/operators';
import { OAuthModuleConfig, OAuthResourceServerErrorHandler, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';
import { M } from '@angular/cdk/keycodes';


@Injectable({
  providedIn: 'root'
})
export class ServerInterceptorService implements HttpInterceptor  {


  constructor(
    private authStorage: OAuthStorage,
    private authService: AuthService,
    private errorHandler: OAuthResourceServerErrorHandler,
    @Optional() private moduleConfig: OAuthModuleConfig
) {
}

public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  let url = req.url.toLowerCase();

  if (!this.moduleConfig) return next.handle(req);
  if (!this.moduleConfig.resourceServer) return next.handle(req);
  if (!url.startsWith(`${environment.midentityUrl}/api`)) return next.handle(req);

    req = this.transformRequest(req);

    return this.authService.loggedIn$.pipe(
      filter(v => v),
      map(loggedIn => req.clone( { setHeaders: { Authorization: `Bearer ${this.authService.oAuthService.getAccessToken()}` } } )),
      concatMap(authReq => next.handle(authReq))
    );

      // return next.handle(req).pipe(

      //   catchError(error => {
      //           console.error("error intercepted");
      //           console.error(error);
      //           return throwError(() => new Error(error));
      //         }),
      //   retryWhen(errors =>
      //     this.authService.loggedIn$.pipe(
      //     filter(v => v),
      //     tap(any => {

      //      })
      //     )
      //   ));
}

private transformRequest (req: HttpRequest<any>) : HttpRequest<any> {
  let token = this.authStorage.getItem('access_token');
  let header = 'Bearer ' + token;
  let headers = req.headers
                      .set('Authorization', header);
  req = req.clone({ headers });
  console.log(req);
  return req;
}


//   public intercept(req: HttpRequest<any>,
//     next: HttpHandler): Observable<HttpEvent<any>> {
//       return next.handle(req).pipe(catchError(error => {
//         console.error("error intercepted");
//         console.error(error);
// //        if (error.status && error.status === 401) window.location.reload();
//         return throwError(error);
//       }));
//   }
}

import { Injectable, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, concatMap, catchError } from 'rxjs/operators';
import { OAuthModuleConfig, OAuthResourceServerErrorHandler, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';
import { SpinnerService } from '../services/spinner.service';


@Injectable({
  providedIn: 'root'
})
export class ServerInterceptorService implements HttpInterceptor  {


  constructor(
    private authStorage: OAuthStorage,
    private authService: AuthService,
    private errorHandler: OAuthResourceServerErrorHandler,
    private spinnerService: SpinnerService,
    @Optional() private moduleConfig: OAuthModuleConfig
) {
}

public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  let url = req.url.toLowerCase();

  this.spinnerService.spin$.next(true);

  if (!this.moduleConfig || !this.moduleConfig.resourceServer || !url.startsWith(`${environment.midentityUrl}/api`))
  {
    return next.handle(req)
    .pipe(
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.spinnerService.spin$.next(false);
        }
        return evt;
      }));
  }

    req = this.transformRequest(req);

    return this.authService.loggedIn$.pipe(
      filter(v => v),
      map(loggedIn => req.clone( { setHeaders: { Authorization: `Bearer ${this.authService.oAuthService.getAccessToken()}` } } )),
      concatMap(authReq => next.handle(authReq)),
      catchError(error => { console.error(error); this.spinnerService.spin$.next(false); throw error })
    ).pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
      if (evt instanceof HttpResponse) {
        this.spinnerService.spin$.next(false);
      }
      return evt;
    }));

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

}

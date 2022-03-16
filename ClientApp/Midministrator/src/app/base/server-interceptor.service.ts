import { Injectable, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { OAuthModuleConfig, OAuthResourceServerErrorHandler, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServerInterceptorService implements HttpInterceptor  {

  constructor(
    private authStorage: OAuthStorage,
    private errorHandler: OAuthResourceServerErrorHandler,
    @Optional() private moduleConfig: OAuthModuleConfig
) {
}
public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  let url = req.url.toLowerCase();

  if (!this.moduleConfig) return next.handle(req);
  if (!this.moduleConfig.resourceServer) return next.handle(req);
  if (!this.moduleConfig.resourceServer.allowedUrls) return next.handle(req);
  if (!url.startsWith(`${environment.midentityUrl}/api`)) return next.handle(req);

      let token = this.authStorage.getItem('access_token');
      let header = 'Bearer ' + token;

      let headers = req.headers
                          .set('Authorization', header);

      req = req.clone({ headers });


      return next.handle(req).pipe(catchError(error => {
                console.error("error intercepted");
                console.error(error);
                return throwError(() => new Error(error));
              }));

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

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServerInterceptorService implements HttpInterceptor  {

  public intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(catchError(error => {
        console.error("error intercepted");
        console.error(error);
        if (error.status && error.status === 401) window.location.reload();
        return throwError(error);
      }));
  }
}

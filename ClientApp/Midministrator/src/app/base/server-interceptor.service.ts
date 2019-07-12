import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServerInterceptorService implements HttpInterceptor  {

  public intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(tap(
           ev => {
             console.log("default");
            console.log(ev);
           },
           error => {
            console.log(error);
            if (error && error.status === 401) {
              window.location.reload();
            }
           }
        ));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseHttpService } from '../base-http.service';
import { Application } from 'src/app/models/application';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends BaseHttpService {

  apiUrl = `${environment.midentityUrl}/api/applications`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(public http: HttpClient) {
    super(http);
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

  updateApplication(application: Application): Observable<any> {
    let body = JSON.stringify(application);
    return this.http.post(`${this.apiUrl}/Update`, body, { headers: this.headers });
  }

  createApplication(application: Application): Observable<number> {
    let body = JSON.stringify(application);
    return this.http.post<number>(`${this.apiUrl}/Create`, body, { headers: this.headers });
  }

}

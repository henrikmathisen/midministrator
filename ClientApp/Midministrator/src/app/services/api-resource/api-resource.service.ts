import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResource } from '../../models/api-resource';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiResourceService extends BaseHttpService {
  private apiResourceUrl = 'api/apiresources';

  constructor(
    public http: HttpClient
  ) { 
    super(http);
  }

  
  getApiResources(): Observable<ApiResource[]> {
    var clients = this.http.get<ApiResource[]>(this.apiResourceUrl);
    return clients;
  }

  getApiResource(id: number): Observable<ApiResource> {
    return this.http.get<ApiResource>(`${this.apiResourceUrl}/${id}`);
  }

  updateApiResource(apiResource: ApiResource): Observable<any> {
    let body = JSON.stringify(apiResource);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiResourceUrl}/Update`, body, { headers: headers, responseType: 'text' });
  }

  createApiResource(apiResource: ApiResource): Observable<Number> {
    let body = JSON.stringify(apiResource);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Number>(`${this.apiResourceUrl}/Create`, body, { headers: headers });
  }
  
}


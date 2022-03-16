import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IdentityResource } from '../../models/identity-resource';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IdentityResourceService extends BaseHttpService {

  private identityResourceUrl = `${environment.midentityUrl}/api/identityresources`;

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  getIdentityResources(): Observable<IdentityResource[]> {
    var identityResources = this.http.get<IdentityResource[]>(this.identityResourceUrl);
    return identityResources;
  }

  getIdentityResource(id: number): Observable<IdentityResource> {
    return this.http.get<IdentityResource>(`${this.identityResourceUrl}/${id}`);
  }

  updateIdentityResource(identityResource: IdentityResource): Observable<any> {
    let body = JSON.stringify(identityResource);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.identityResourceUrl}/Update`, body, { headers: headers, responseType: 'text' });
  }

  createIdentityResource(identityResource: IdentityResource): Observable<Number> {
    let body = JSON.stringify(identityResource);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Number>(`${this.identityResourceUrl}/Create`, body, { headers: headers });
  }

}



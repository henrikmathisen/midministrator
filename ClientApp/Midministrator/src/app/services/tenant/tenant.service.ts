import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Tenant } from '../../models/tenant';
import { environment } from 'src/environments/environment';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';


@Injectable({
  providedIn: 'root'
})
export class TenantService extends BaseHttpService implements DataSource<Tenant> {

  private apiUrl = `${environment.midentityUrl}/api`;

  constructor(public http: HttpClient)
  {
    super(http);
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly Tenant[]> {
    return this.http.get<Tenant[]>(`${this.apiUrl}/tenant/all`);
  }
  disconnect(collectionViewer: CollectionViewer): void {

  }

  getTenants(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(`${this.apiUrl}/tenant/all`);
  }

  getTenant(id: number): Observable<Tenant> {
    return this.http.get<Tenant>(`${this.apiUrl}/tenant/id/${id}`);
  }


  addTenantToGroup(groupId: number, tenantId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tenant/AddGroupToTenant/${groupId}/${tenantId}`);
  }

  removeTenantFromGroup(groupId: number, tenantId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tenant/RemoveGroupFromTenant/${groupId}/${tenantId}`);
  }

  addOrUpdateTenant(tenant: Tenant): Observable<Tenant> {
    let body = JSON.stringify(tenant);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Tenant>(`${this.apiUrl}/tenant/AddOrUpdate`, body, { headers: headers });
  }

}

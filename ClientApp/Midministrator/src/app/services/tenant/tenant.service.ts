import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

}

import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tenant } from '../../models/tenant';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends BaseHttpService {

  private apiUrl = "api/tenant";

  constructor(public http: HttpClient) 
  { 
    super(http);
  }

  getTenants(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(`${this.apiUrl}/all`);
  }

}

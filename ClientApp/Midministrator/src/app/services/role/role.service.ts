import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/models/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseHttpService {
  apiUrl = "api/roles";

  constructor(public http: HttpClient) 
  { 
    super(http);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}`);
  }

  getRole(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }

  createRole(role: Role): Observable<number> {
    role.applicationRoles = [];
    let body = JSON.stringify(role);
    return this.http.post<number>(`${this.apiUrl}/Create`, body, { headers: this.headers });
  }

  updateRole(role: Role): Observable<any> {
    role.applicationRoles = [];
    let body = JSON.stringify(role);
    return this.http.post(`${this.apiUrl}/Update`, body, { headers: this.headers });
  }

}

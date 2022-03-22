import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseHttpService {

  private apiUrl = `${environment.midentityUrl}/api`;

  constructor(public http: HttpClient) {
    super(http);
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/groups/adfs`);
  }

  getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/groups/${id}`);
  }

  updateGroup(group: Group): Observable<Group> {
    group.accountGroups = null;
    let model = JSON.stringify(group);
    return this.http.post<Group>(`${this.apiUrl}/groups/Update`, model, { headers: this.headers });
  }

  getGroupsForTenant(tenantId: number): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/tenant/GetGroupsForTenant/${tenantId}`);
  }

}

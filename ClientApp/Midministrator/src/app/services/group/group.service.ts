import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseHttpService {

  private apiUrl = 'api/groups';

  constructor(public http: HttpClient) { 
    super(http);
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}adfs`);
  }

  getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }

  updateGroup(group: Group): Observable<Group> {
    group.accountGroups = null;
    let model = JSON.stringify(group);
    return this.http.post<Group>(`${this.apiUrl}/Update`, model, { headers: this.headers });
  }

}

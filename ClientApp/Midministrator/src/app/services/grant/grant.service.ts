import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Grant } from '../../models/grant';
import { Observable } from 'rxjs';
import { PagingModel } from '../../models/paging-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrantService extends BaseHttpService {

  private apiUrl = `${environment.midentityUrl}/api/grants`;

  constructor(public http: HttpClient)
  {
    super(http);
  }

  getGrants(
    filter = '', sortBy = '', sortOrder = 'asc', pageNumber = 1, pageSize = 25): Observable<PagingModel<Grant>> {
    return this.http.get<PagingModel<Grant>>(`${this.apiUrl}/filtered`, {
      params: new HttpParams()
      .set('filter', filter)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
    });
  }

  removeGrant(key: string): Observable<boolean> {
    let body = {
      key: key
    };
    return this.http.post<boolean>(`${this.apiUrl}/Revoke`, JSON.stringify(body), { headers:  this.headers });
  }

  removeGrantsForUser(subjectId: string): Observable<boolean> {
    let body = {
      key: subjectId
    };
    return this.http.post<boolean>(`${this.apiUrl}/Revoke/subjectId`, JSON.stringify(body), { headers: this.headers });
  }

}

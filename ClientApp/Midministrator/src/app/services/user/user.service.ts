import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagingModel } from '../../models/paging-model';
import { MidentityAccount } from 'src/app/models/account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {

  apiUrl = `${environment.midentityUrl}/api/user`;

  constructor(public http: HttpClient)
  {
    super(http);
  }

  getUser(id: number): Observable<MidentityAccount> {
    return this.http.get<MidentityAccount>(`${this.apiUrl}/${id}`);
  }

  getUsers(
    filter = '', sortBy = '', sortOrder = 'asc', pageNumber = 1, pageSize = 25): Observable<PagingModel<MidentityAccount>> {
    return this.http.get<PagingModel<MidentityAccount>>(`${this.apiUrl}/filtered`, {
      params: new HttpParams()
      .set('filter', filter)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
    });
  }

  resetPassword(userName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ResetPassword/${userName}`);
  }

  updateUser(user: MidentityAccount): Observable<MidentityAccount> {
    user.accountGroups = null;
    user.tenantAccounts = null;
    var model = JSON.stringify(user);
    return this.http.post<MidentityAccount>(`${this.apiUrl}/Update`, model, { headers: this.headers });
  }

  updateUserFromAzure(user: MidentityAccount): Observable<MidentityAccount> {
    let model = JSON.stringify(user);
    return this.http.post<MidentityAccount>(`${this.apiUrl}/UpdateFromO365`, model, { headers: this.headers });
  }

}

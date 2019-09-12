import { Injectable, OnInit } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthResult } from '../../models/auth-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {
  
  private authServiceUrl = 'auth/';

  constructor(public http: HttpClient) 
  { 
    super(http);
  }

  AuthStatus(): Observable<AuthResult> {
    return this.http.get<AuthResult>(`${this.authServiceUrl}status`, { headers: this.headers });
  }

}

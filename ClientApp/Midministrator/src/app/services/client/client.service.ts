import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Client, ClientViewModel, ClientView } from '../../models/client';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseHttpService {
  private clientApiUrl = 'api/clients';

  constructor(
    public http: HttpClient
  ) { 
    super(http);
  }

  getClients(): Observable<Client[]> {
    var clients = this.http.get<Client[]>(this.clientApiUrl);
    return clients;
  }

  getClient(id: number): Observable<ClientViewModel> {
    const url = `${this.clientApiUrl}/${id}`;
    return this.http.get<ClientViewModel>(url);
  }

  getAvailableScopes(): Observable<string[]> {
    const url = `${this.clientApiUrl}/scopes`;
    return this.http.get<string[]>(url);
  }

  updateClient(client: ClientViewModel): Observable<any> {
    let body = JSON.stringify(client);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.clientApiUrl}/Update`, body, { headers: headers, responseType: 'text' });
  }

  createClient(client: ClientViewModel): Observable<Number> {
    let body = JSON.stringify(client);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Number>(`${this.clientApiUrl}/Create`, body, { headers: headers });
  }

  
}


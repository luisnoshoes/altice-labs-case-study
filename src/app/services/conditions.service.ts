import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Condition } from '../models/condition';

@Injectable({
  providedIn: 'root'
})
export class ConditionsService {
  apiUrl: string;

  constructor(private readonly httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  sendConditions(condition: Condition): Observable<number> {
    return this.httpClient.post<number>(`${this.apiUrl}/conditions`, condition);
  }

  getConditions(): Observable<Condition[]> {
    return this.httpClient.get<Condition[]>(`${this.apiUrl}/conditions`)
  }
}

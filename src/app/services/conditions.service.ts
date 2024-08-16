import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Conditions } from '../models/conditions';

@Injectable({
  providedIn: 'root'
})
export class ConditionsService {
  apiUrl: string;

  constructor(private readonly httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  sendConditions(conditions: Conditions): Observable<number> {
    return this.httpClient.post<number>(`${this.apiUrl}/conditions`, conditions);
  }
}

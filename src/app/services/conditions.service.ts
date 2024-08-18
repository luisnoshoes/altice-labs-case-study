import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { delay, map, Observable, of } from 'rxjs';
import { Condition } from '../models/condition';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class ConditionsService {
  apiUrl: string;

  constructor(private readonly httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  sendConditions(condition: Condition): Observable<number> {
    condition.date = (condition.date as DateTime).toISODate()!;
    return this.httpClient.post<number>(`${this.apiUrl}/conditions`, condition);
  }

  getConditions(): Observable<Condition[]> {
    return this.httpClient.get<Condition[]>(`${this.apiUrl}/conditions`)
      .pipe(
        map((conditions) => conditions.map((condition) => {
          condition.date = DateTime.fromISO(condition.date as string)
          return condition;
        }))
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { delay, Observable, of } from 'rxjs';
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
    return of(this.tempConditions).pipe(delay(1000))
    // return this.httpClient.get<Condition[]>(`${this.apiUrl}/conditions`)
  }

  private readonly tempConditions: Condition[] = [
    {
        "city": "Aveiro",
        "date": "2024-08-17",
        "temperature": 25,
        "altitude": 120,
        "rainingStatus": 20,
        "networkPower": 4
    },
    {
        "city": "Lisboa",
        "date": "2024-08-15",
        "temperature": 23,
        "altitude": 16,
        "rainingStatus": 33,
        "networkPower": 3
    },
    {
        "city": "Lisboa",
        "date": "2024-08-16",
        "temperature": 24,
        "altitude": 45,
        "rainingStatus": 40,
        "networkPower": 4
    }
]
}

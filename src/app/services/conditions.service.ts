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
    return of(this.tempConditions).pipe(delay(1000))

    // return this.httpClient.get<Condition[]>(`${this.apiUrl}/conditions`)
    //   .pipe(
    //     map((conditions) => conditions.map((condition) => {
    //       condition.date = DateTime.fromISO(condition.date as string)
    //       return condition;
    //     }))
    //   );
  }

  private readonly tempConditions: Condition[] = [
    {
      city: "Aveiro",
      date: DateTime.fromISO("2024-08-17"),
      temperature: 25,
      altitude: 120,
      rainingStatus: 20,
      networkPower: 4,
    },
    {
      city: "Lisboa",
      date: DateTime.fromISO("2024-08-15"),
      temperature: 23,
      altitude: 16,
      rainingStatus: 33,
      networkPower: 3,
    },
    {
      city: "Lisboa",
      date: DateTime.fromISO("2024-08-16"),
      temperature: 24,
      altitude: 45,
      rainingStatus: 40,
      networkPower: 4,
    },
    {
      city: "Porto",
      date: DateTime.fromISO("2024-08-18"),
      temperature: 22,
      altitude: 104,
      rainingStatus: 25,
      networkPower: 3,
    },
    {
      city: "Aveiro",
      date: DateTime.fromISO("2024-08-19"),
      temperature: 26,
      altitude: 121,
      rainingStatus: 15,
      networkPower: 5,
    },
    {
      city: "Lisboa",
      date: DateTime.fromISO("2024-08-20"),
      temperature: 27,
      altitude: 50,
      rainingStatus: 10,
      networkPower: 3,
    },
    {
      city: "Porto",
      date: DateTime.fromISO("2024-08-21"),
      temperature: 21,
      altitude: 98,
      rainingStatus: 35,
      networkPower: 4,
    },
    {
      city: "Coimbra",
      date: DateTime.fromISO("2024-08-17"),
      temperature: 24,
      altitude: 90,
      rainingStatus: 30,
      networkPower: 4,
    },
    {
      city: "Faro",
      date: DateTime.fromISO("2024-08-22"),
      temperature: 29,
      altitude: 12,
      rainingStatus: 5,
      networkPower: 2,
    },
    {
      city: "Braga",
      date: DateTime.fromISO("2024-08-23"),
      temperature: 23,
      altitude: 210,
      rainingStatus: 40,
      networkPower: 5,
    },
    {
      city: "Porto",
      date: DateTime.fromISO("2024-08-24"),
      temperature: 22,
      altitude: 100,
      rainingStatus: 20,
      networkPower: 3,
    },
    {
      city: "Lisboa",
      date: DateTime.fromISO("2024-08-25"),
      temperature: 28,
      altitude: 60,
      rainingStatus: 18,
      networkPower: 2,
    },
    {
      city: "Coimbra",
      date: DateTime.fromISO("2024-08-26"),
      temperature: 25,
      altitude: 85,
      rainingStatus: 22,
      networkPower: 4,
    },
    {
      city: "Braga",
      date: DateTime.fromISO("2024-08-27"),
      temperature: 24,
      altitude: 215,
      rainingStatus: 38,
      networkPower: 4,
    },
    {
      city: "Porto",
      date: DateTime.fromISO("2024-08-28"),
      temperature: 23,
      altitude: 110,
      rainingStatus: 30,
      networkPower: 3,
    },
    {
      city: "Aveiro",
      date: DateTime.fromISO("2024-08-29"),
      temperature: 26,
      altitude: 125,
      rainingStatus: 18,
      networkPower: 4,
    },
    {
      city: "Lisboa",
      date: DateTime.fromISO("2024-08-30"),
      temperature: 29,
      altitude: 55,
      rainingStatus: 12,
      networkPower: 3,
    },
    {
      city: "Faro",
      date: DateTime.fromISO("2024-08-31"),
      temperature: 30,
      altitude: 14,
      rainingStatus: 7,
      networkPower: 2,
    },
    {
      city: "Coimbra",
      date: DateTime.fromISO("2024-09-01"),
      temperature: 26,
      altitude: 95,
      rainingStatus: 28,
      networkPower: 4,
    },
    {
      city: "Braga",
      date: DateTime.fromISO("2024-09-02"),
      temperature: 25,
      altitude: 220,
      rainingStatus: 32,
      networkPower: 3,
    },
    {
      city: "Porto",
      date: DateTime.fromISO("2024-09-03"),
      temperature: 24,
      altitude: 115,
      rainingStatus: 24,
      networkPower: 4,
    },
    {
      city: "Aveiro",
      date: DateTime.fromISO("2024-09-04"),
      temperature: 27,
      altitude: 130,
      rainingStatus: 16,
      networkPower: 5,
    },
    {
      city: "Lisboa",
      date: DateTime.fromISO("2024-09-05"),
      temperature: 30,
      altitude: 62,
      rainingStatus: 14,
      networkPower: 2,
    },
    {
      city: "Faro",
      date: DateTime.fromISO("2024-09-06"),
      temperature: 31,
      altitude: 16,
      rainingStatus: 4,
      networkPower: 3,
    },
    {
      city: "Coimbra",
      date: DateTime.fromISO("2024-09-07"),
      temperature: 27,
      altitude: 100,
      rainingStatus: 26,
      networkPower: 4,
    },
    {
      city: "Braga",
      date: DateTime.fromISO("2024-09-08"),
      temperature: 26,
      altitude: 225,
      rainingStatus: 34,
      networkPower: 4,
    },
    {
      city: "Porto",
      date: DateTime.fromISO("2024-09-09"),
      temperature: 25,
      altitude: 120,
      rainingStatus: 22,
      networkPower: 3,
    },
    {
      city: "Aveiro",
      date: DateTime.fromISO("2024-09-10"),
      temperature: 28,
      altitude: 135,
      rainingStatus: 14,
      networkPower: 4,
    },
    {
      city: "Lisboa",
      date: DateTime.fromISO("2024-09-11"),
      temperature: 31,
      altitude: 65,
      rainingStatus: 10,
      networkPower: 3,
    },
    {
      city: "Faro",
      date: DateTime.fromISO("2024-09-12"),
      temperature: 32,
      altitude: 18,
      rainingStatus: 3,
      networkPower: 2,
    },
    {
      city: "Coimbra",
      date: DateTime.fromISO("2024-09-13"),
      temperature: 28,
      altitude: 105,
      rainingStatus: 24,
      networkPower: 4,
    },
    {
      city: "Braga",
      date: DateTime.fromISO("2024-09-14"),
      temperature: 27,
      altitude: 230,
      rainingStatus: 30,
      networkPower: 3,
    },
    {
      city: "Porto",
      date: DateTime.fromISO("2024-09-15"),
      temperature: 26,
      altitude: 125,
      rainingStatus: 18,
      networkPower: 4,
    },
    {
      city: "Aveiro",
      date: DateTime.fromISO("2024-09-16"),
      temperature: 29,
      altitude: 140,
      rainingStatus: 12,
      networkPower: 5,
    },
    {
      city: "Lisboa",
      date: DateTime.fromISO("2024-09-17"),
      temperature: 32,
      altitude: 70,
      rainingStatus: 8,
      networkPower: 2,
    },
    {
      city: "Faro",
      date: DateTime.fromISO("2024-09-18"),
      temperature: 33,
      altitude: 20,
      rainingStatus: 2,
      networkPower: 3,
    },
  ];
}

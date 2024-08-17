import { Component } from '@angular/core';
import { Condition } from '../models/condition';
import { ConditionsService } from '../services/conditions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CityOverview } from '../models/city-overview';
import { DateTime } from 'luxon';
import { CityOverviewListComponent } from '../city-overview-list/city-overview-list.component';
import { CityDetailsComponent } from '../city-details/city-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { catchError, pipe, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-condition-overview',
  standalone: true,
  imports: [CityOverviewListComponent, CityDetailsComponent, MatProgressSpinnerModule],
  templateUrl: './condition-overview.component.html',
  styleUrl: './condition-overview.component.scss'
})
export class ConditionOverviewComponent {
  conditions: Condition[] | undefined;

  cityOverviewList: CityOverview[] | undefined;
  selectedCityConditions: Condition[] | undefined;

  constructor(private readonly conditionsService: ConditionsService, private readonly snackBar: MatSnackBar, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.conditionsService.getConditions().pipe(
      tap((conditions) => {
        this.conditions = conditions;
        this.cityOverviewList = this.getCityOverviewList(conditions);
      }),
      switchMap(() => this.route.queryParamMap),
      tap((paramMap) => {
        const selectedCity = paramMap.get('city');

        if (selectedCity) {
          this.selectedCityConditions = this.conditions!
            .filter((condition) => condition.city === selectedCity)
            .sort((a, b) => DateTime.fromISO(b.date).toMillis() -  DateTime.fromISO(a.date).toMillis());
        }
      })
    ).subscribe({
      error: () => this.snackBar.open("Failed retrieve conditions", 'Close')
    })
  }

  private getCityOverviewList(conditions: Condition[]): CityOverview[] {
    const cities = [...new Set(conditions.map((condition) => condition.city))]

    const cityOverviewList: CityOverview[] = [];

    for (const city of cities) {
      const cityConditions = conditions.filter((condition) => condition.city === city)

      const lastUpdate = DateTime.max(...cityConditions.map((condition) => DateTime.fromISO(condition.date)))
      const lastNetworkPower = cityConditions.find((condition) => condition.date === lastUpdate.toISODate())!.networkPower;

      const cityOverview: CityOverview = {
        name: city,
        lastUpdate: lastUpdate,
        lastNetworkPower: lastNetworkPower,
        avgTemperature: cityConditions.map((condition) => condition.temperature).reduce((a, b) => a + b) / cityConditions.length,
        avgRainingStatus: cityConditions.map((condition) => condition.rainingStatus).reduce((a, b) => a + b) / cityConditions.length,
        avgAltitude: cityConditions.map((condition) => condition.altitude).reduce((a, b) => a + b) / cityConditions.length,
      }

      cityOverviewList.push(cityOverview);
    }

    return cityOverviewList;
  }
}

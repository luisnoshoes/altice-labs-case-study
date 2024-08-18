import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
import { switchMap, tap } from 'rxjs';
import { CityDetailsComponent } from '../city-details/city-details.component';
import { CityOverviewItemComponent } from '../city-overview-item/city-overview-item.component';
import { CityOverview } from '../models/city-overview';
import { Condition } from '../models/condition';
import { ConditionsService } from '../services/conditions.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CityOverviewItemComponent, CityDetailsComponent, MatProgressSpinnerModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
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

        if (selectedCity && this.conditions!.some((condition) => condition.city === selectedCity)) {
          this.selectedCityConditions = this.conditions!
            .filter((condition) => condition.city === selectedCity)
            .sort((a, b) => (b.date as DateTime).toMillis() -  (a.date as DateTime).toMillis());
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

      const lastUpdate = DateTime.max(...cityConditions.map((condition) => condition.date as DateTime))
      const lastNetworkPower = cityConditions.find((condition) => +condition.date === +lastUpdate)!.networkPower;

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

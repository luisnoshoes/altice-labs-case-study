import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CityOverview } from '../models/city-overview';
import { Condition } from '../models/condition';
import { ConditionsService } from '../services/conditions.service';
import { DateTime } from 'luxon';
import { CityOverviewItemComponent } from '../city-overview-item/city-overview-item.component';

@Component({
  selector: 'app-condition-list',
  standalone: true,
  imports: [CityOverviewItemComponent],
  templateUrl: './condition-list.component.html',
  styleUrl: './condition-list.component.scss'
})
export class ConditionListComponent implements OnInit {
  conditions: Condition[] | undefined;
  cityOverviewList: CityOverview[] | undefined;

  constructor(private readonly conditionsService: ConditionsService, private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.conditionsService.getConditions().subscribe({
      next: (conditions) => {
        this.conditions = conditions;
        this.cityOverviewList = this.getCityOverviewList(conditions);

        console.log(conditions);
        console.log(this.cityOverviewList)
      },
      error: () => this.snackBar.open("Failed retrieve conditions", 'Close')
    })
  }

  private getCityOverviewList(conditions: Condition[]): CityOverview[] {
    const cities = [...new Set(conditions.map((condition) => condition.city))]

    const cityOverviewList: CityOverview[] = [];

    for (const city of cities) {
      const cityConditions = conditions.filter((condition) => condition.city === city)

      const cityOverview: CityOverview = {
        name: city,
        lastUpdate: DateTime.max(...cityConditions.map((condition) => DateTime.fromISO(condition.date))),
        lastNetworkPower: Math.max(...cityConditions.map((condition) => condition.networkPower)),
        avgTemperature: cityConditions.map((condition) => condition.temperature).reduce((a, b) => a + b) / cityConditions.length,
        avgRainingStatus: cityConditions.map((condition) => condition.rainingStatus).reduce((a, b) => a + b) / cityConditions.length,
        avgAltitude: cityConditions.map((condition) => condition.altitude).reduce((a, b) => a + b) / cityConditions.length,
      }

      cityOverviewList.push(cityOverview);
    }

    return cityOverviewList;
  }
}

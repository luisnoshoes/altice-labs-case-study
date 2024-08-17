import { Component, Input } from '@angular/core';
import { CityOverviewItemComponent } from '../city-overview-item/city-overview-item.component';
import { CityOverview } from '../models/city-overview';

@Component({
  selector: 'app-city-overview-list',
  standalone: true,
  imports: [CityOverviewItemComponent],
  templateUrl: './city-overview-list.component.html',
  styleUrl: './city-overview-list.component.scss'
})
export class CityOverviewListComponent{
  @Input({required: true}) cityOverviewList!: CityOverview[];
}

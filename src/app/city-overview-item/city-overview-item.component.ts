import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CityOverview } from '../models/city-overview';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-city-overview-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './city-overview-item.component.html',
  styleUrl: './city-overview-item.component.scss'
})
export class CityOverviewItemComponent {
  @Input({ required: true }) cityOverview!: CityOverview;
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CityOverview } from '../models/city-overview';

@Component({
  selector: 'app-city-overview-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatRippleModule, RouterModule],
  templateUrl: './city-overview-item.component.html',
  styleUrl: './city-overview-item.component.scss'
})
export class CityOverviewItemComponent {
  @Input({ required: true }) cityOverview!: CityOverview;

}

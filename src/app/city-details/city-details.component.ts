import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Condition } from '../models/condition';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-city-details',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, TranslateModule],
  templateUrl: './city-details.component.html',
  styleUrl: './city-details.component.scss'
})
export class CityDetailsComponent implements AfterViewInit, OnChanges{
  @Input({required: true}) conditions!: Condition[];
  dataSource = new MatTableDataSource<Condition>();
  readonly columns = ['date', 'temperature', 'altitude', 'rainingStatus', 'networkPower'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['conditions']){
      this.dataSource.data = changes['conditions'].currentValue;
      if(this.paginator){
        this.dataSource.paginator = this.paginator!;
      }
    }
  }
}
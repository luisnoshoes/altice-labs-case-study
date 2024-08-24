import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';
import { Condition } from '../models/condition';

@Component({
  selector: 'app-city-chart',
  standalone: true,
  imports: [],
  templateUrl: './city-chart.component.html',
  styleUrl: './city-chart.component.scss'
})
export class CityChartComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) conditions!: Condition[];

  chart: Chart<'scatter', any, any> | undefined;

  ngAfterViewInit(): void {
    const canvas = document.querySelector<HTMLCanvasElement>("#city-chart")!;
    this.chart = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [{
          pointHitRadius: 20,
          label: 'Network power',
          data: this.conditions.map((condition) => ({ x: (condition.date as DateTime)!, y: condition.networkPower }))
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 5
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: false,
            callbacks: {
              label: function (context) {
                const label = context.dataset.label;

                var date = (context.raw as any).x as DateTime;
                var networkPower = context.parsed.y;

                return `${date.toLocaleString(DateTime.DATE_MED)} ${label}: ${networkPower}`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'week',
              displayFormats: {
                week: "DD"
              }
            },
            ticks: {
              maxTicksLimit: 5

            }
          },
          y: {
            min: 0.5,
            max: 5.5,
            ticks: {
              callback: function (value) {
                return Number.isInteger(value) ? value : null;
              }
            }
          }
        },
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['conditions'] && !changes['conditions'].isFirstChange()) {
      const newConditions = changes['conditions'].currentValue as Condition[];
      this.chart!.data.datasets[0].data = newConditions.map((condition) => ({ x: (condition.date as DateTime)!, y: condition.networkPower }))
      this.chart!.update();
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { IForecast } from '../interfaces/ForecastData';

@Component({
  selector: 'app-forecast-report',
  templateUrl: './forecast-report.component.html',
  styleUrls: ['./forecast-report.component.scss'],
})
export class ForecastReportComponent implements OnInit {
  @Input() forecastData!: IForecast;

  constructor() {}

  ngOnInit(): void {}

  getDate(dt: number): Date {
    let date = new Date(dt * 1000);
    return date;
  }
}

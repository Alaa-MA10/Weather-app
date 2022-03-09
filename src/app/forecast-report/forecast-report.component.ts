import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IForecast } from '../interfaces/ForecastData';
import { WeatherService } from '../services/weather.service';

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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { concatMap, filter, map, Observable, Subscription, tap } from 'rxjs';
import { WeatherService } from './../../services/weather.service';
import { IWeather } from './../../interfaces/WeatherData';
import { IForecast } from './../../interfaces/ForecastData';
import { Country } from 'country-state-city';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss'],
})
export class WeatherReportComponent implements OnInit, OnDestroy {
  lat: any;
  lon: any;
  weather: any;

  cityName!: string;
  countryCode!: string;
  countryName?: string;
  // $ -> indicate that the variable is an Observable
  weatherData$!: Observable<IWeather>;

  weatherData!: IWeather;
  forecastData!: IForecast;
  routeSub!: Subscription;
  weatherSub!: Subscription;
  forecastSub!: Subscription;

  today: Date = new Date();
  loading = false;

  constructor(
    private weatherServices: WeatherService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.weatherData$ = this.route.params.pipe(
    //   // 1. Get the cityName parameter from the route params
    //   // Use the map operator to transform the params object
    //   map(params => params["cityName"]),
    //   // 2. Check if the parameter has some value
    //   // Use the filter operator to check if we have a valid-value(use the double !!)
    //   filter(name => !!name),
    //   // tap “side effect” in observable pipeline
    //   tap(() => {
    //     this.loading = true;
    //   }),
    //   // 3. Call weather-service function for this value
    //   // Use a concatMap operator to append or concatenate service function (which also is an observable)
    //   concatMap(name => this.weatherServices.getWeatherByCity(name)),
    //   tap(()=>{
    //     this.loading = false
    //   })
    // );
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.countryCode = params['countryCode'];
      this.cityName = params['cityName'];
      // if there a selected city
      if (this.cityName) {
        this.getWeatherData(this.cityName);
        this.countryName = Country.getCountryByCode(this.countryCode)?.name;
      }
    });

    // date converting
    // let day = new Date(1646647200 * 1000);
    // console.log('convert date: ', day.toLocaleString().split(',')[0]);
    // console.log('convert day: ', day.toLocaleString('en', { weekday: 'long' }));
  }

  getWeatherData(cityName: string): void {
    this.weatherSub = this.weatherServices
      .getWeatherByCity(cityName)
      .subscribe((data) => {
        this.weatherData = data;
        this.lat = this.weatherData.coord.lat;
        this.lon = this.weatherData.coord.lon;
        // console.log('weatherData: ', this.weatherData);
        // console.log('Country: ', Country.getCountryByCode(this.weatherData.sys.country))

        // console.log('this.country: ', this.countryName);
        this.getForecast(this.lat, this.lon);
      });
  }

  getForecast(lat: number, lon: number) {
    this.forecastSub = this.weatherServices
      .getForecastByCoord(lat, lon)
      .subscribe((data) => {
        this.forecastData = data;
        // console.log('forecastData: ', this.forecastData);
      });
    // console.log('getforecast(): ', this.weatherServices.getForecastByCoord())
  }

  getDate(dt: number): Date {
    let date = new Date(dt * 1000);
    return date;
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((resp) => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;

        this.weatherServices
          .getWeatherByCoord(this.lat, this.lon)
          .subscribe((data) => {
            this.weather = data;
          });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.weatherSub) {
      this.weatherSub.unsubscribe();
    }
    if (this.forecastSub) {
      this.forecastSub.unsubscribe();
    }
  }
}

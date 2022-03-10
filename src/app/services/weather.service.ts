import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// The HttpClient service makes use of observables for all transactions
// so, import the RxJS observable and operator symbols
import { delay, map, Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { Daily, IForecast } from '../interfaces/ForecastData';
import { IWeather } from '../interfaces/WeatherData';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<IWeather> {
    let params = new HttpParams().set('q', city);

    return this.http.get<IWeather>(`${env.WETHER_BASE_URL}`, { params }).pipe(
      // delay(1500),
      // Adding the weather icon with RxJS Map
      map((data) => ({
        ...data,
        image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      }))
    );
  }

  getForecastByCoord(lat: number, lon: number): Observable<IForecast> {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('exclude', 'hourly,minutely,alert');

    return this.http
      .get<IForecast>(`${env.FORECAST_BASE_URL}`, { params })
      .pipe(
        map((data: IForecast) => {
          data.daily.forEach((d: Daily) => {
            d.image = `http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`;
          });
          return data;
        })
      );
  }

  getWeatherByCoord(lat: any, lon: any) {
    let params = new HttpParams().set('lat', lat).set('lon', lon);

    return this.http.get(`${env.WETHER_BASE_URL}`, { params });
  }
}

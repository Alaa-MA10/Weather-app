import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// The HttpClient service makes use of observables for all transactions
// so, import the RxJS observable and operator symbols
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { ICity } from 'country-state-city/dist/lib/interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherByCity(city:string):Observable<any>{
    // let params = new HttpParams().set('q',city).set('appid', this.apiKey)
    let params = new HttpParams().set('q',city).set('units','metric')
    return this.http.get<ICity>(`${env.WETHER_BASE_URL}`, {params})
  }

  getWeatherByCoord(lat:any, lon:any){
    let params = new HttpParams().set('lat', lat).set('lon',lon)

    return this.http.get(`${env.WETHER_BASE_URL}`, {params})
  }
}

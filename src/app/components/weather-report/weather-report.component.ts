import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, map, Observable } from 'rxjs';
import { WeatherService } from './../../services/weather.service';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit {

  lat: any;
  lon: any;
  weather :any;
  // $ -> indicate that the variable is an Observable
  weatherData$!: Observable<any>;
  today:Date = new Date()
  
  constructor(private weatherServices: WeatherService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.weatherData$ = this.route.params.pipe(
      // 1. Get the cityName parameter from the route params
      // Use the map operator to transform the params object
      map(params => params["cityName"]),
      // 2. Check if the parameter has some value
      // Use the filter operator to check if we have a valid-value(use the double !!)
      filter(name => !!name),
      // 3. Call weather-service function for this value
      // Use a concatMap operator to append or concatenate service function (which also is an observable)
      concatMap(name => this.weatherServices.getWeatherByCity(name))
    );
    
    console.log('', this.weatherServices.getWeatherByCity('cairo'))
    console.log('typeof data$: ', typeof this.weatherData$)
  }

  getLocation(){
    if('geolocation' in navigator){

      navigator.geolocation.watchPosition( (resp)=>{
        this.lat = resp.coords.latitude
        this.lon = resp.coords.longitude

        this.weatherServices.getWeatherByCoord(this.lat, this.lon).subscribe( data =>{
          this.weather = data
        })
      })
    }
  }

}

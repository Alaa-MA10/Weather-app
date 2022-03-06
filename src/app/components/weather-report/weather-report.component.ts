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
  data$!: Observable<any>;
  
  constructor(private weatherServices: WeatherService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.params
    // this.getLocation()

    this.data$ = this.route.params.pipe(
      map(params => params["locationName"]),
      filter(name => !!name),
      concatMap(name => this.weatherServices.getWeatherByCity(name))
    );
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

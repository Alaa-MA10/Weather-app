import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, Subscription, takeUntil } from 'rxjs';

import { Country, State, City } from 'country-state-city';
// Import Interfaces`
import { ICountry, ICity } from 'country-state-city/dist/lib/interface';
// import { ICountry, IState, ICity } from 'country-state-city';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'weather-app';

  cities!: ICity[] | any;
  countries!: ICountry[];

  countryCode!: string;

  selectedCountry!: string;
  selectedCity!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.countries = Country.getAllCountries();
  }

  onChange(e: any) {
    console.log('onChange(): ', this.selectedCountry);
    console.log('cities: ', City.getCitiesOfCountry(this.selectedCountry));
    this.cities = City.getCitiesOfCountry(this.selectedCountry);
  }

  openWeatherDetails(e:any){
    // console.log('this.selectedCity:',this.selectedCity)
    // console.log('Open() e: ', e.value)

      this.router.navigate([this.selectedCity]);
  }

  ngOnDestroy() {
    // this.unsubscribe$.next();
    // this.unsubscribe$.complete();
  }
}

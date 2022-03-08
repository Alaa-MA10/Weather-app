import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Country, City } from 'country-state-city';
// Import Interfaces`
import { ICountry, ICity } from 'country-state-city/dist/lib/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'weather-app';

  cities?: ICity[];
  countries!: ICountry[];

  countryCode!: string;

  selectCountry!: string;
  selectCity!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.countries = Country.getAllCountries();
  }

  onChange() {
    console.log('onChange(): ', this.selectCountry);

    console.log('cities: ', City.getCitiesOfCountry(this.selectCountry));
    this.cities = City.getCitiesOfCountry(this.selectCountry);
  }

  openWeatherDetails() {
    this.router.navigate([this.selectCountry, this.selectCity]);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectCountryCityComponent } from './components/select-country-city/select-country-city.component';
import { WeatherReportComponent } from './components/weather-report/weather-report.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherReportComponent,
  },
  {
    path: ':countryCode/:cityName',
    component: WeatherReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WeatherReportComponent } from './components/weather-report/weather-report.component';

const routes: Routes = [
  {
    path: "",
    component: WeatherReportComponent
  },
  {
    path: ":cityName",
    component: WeatherReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

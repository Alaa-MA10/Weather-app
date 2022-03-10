import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WeatherReportComponent } from './components/weather-report/weather-report.component';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { SelectCountryCityComponent } from './components/select-country-city/select-country-city.component';
import { ForecastReportComponent } from './forecast-report/forecast-report.component';
@NgModule({
  declarations: [
    AppComponent,
    WeatherReportComponent,
    SelectCountryCityComponent,
    ForecastReportComponent,
  ],
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,

    FormsModule,
    ReactiveFormsModule,

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

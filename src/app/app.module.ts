import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatDividerModule} from '@angular/material/divider'
import { FlexLayoutModule } from '@angular/flex-layout';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { WeatherReportComponent } from './components/weather-report/weather-report.component'
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { HomeComponent } from './components/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    WeatherReportComponent,
    HomeComponent,
  ],
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    FlexLayoutModule,

    FormsModule,
  ReactiveFormsModule,

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

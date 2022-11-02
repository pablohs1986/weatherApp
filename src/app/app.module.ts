import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherComponent } from './weather/weather.component';
import { WeatherSelectComponent } from './weather/weather-select/weather-select.component';
import { WeatherFavouritesComponent } from './weather/weather-favourites/weather-favourites.component';
import { WeatherDetailComponent } from './weather/weather-detail/weather-detail.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, WeatherComponent, WeatherSelectComponent, WeatherFavouritesComponent, WeatherDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

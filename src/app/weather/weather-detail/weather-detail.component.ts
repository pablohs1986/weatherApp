import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { Weather } from 'src/app/models/weather.model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css'],
})
export class WeatherDetailComponent implements OnInit, OnDestroy {
  selectedCitySubsctiption: Subscription;
  selectedCity: City;
  weatherInSelectedCity: Weather;
  isLoading = false;
  iconSrc: string;
  zoom = 12;
  center: google.maps.LatLngLiteral;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.selectedCitySubsctiption =
      this.weatherService.selectedCitySubject.subscribe((city: City) => {
        this.selectedCity = city;
        this.onGetWeatherInSelectedCity();
        this.centerMapOnCity();
      });
  }

  centerMapOnCity() {
    this.center = {
      lat: +this.selectedCity.coord.lat,
      lng: +this.selectedCity.coord.lon,
    };
  }

  onGetWeatherInSelectedCity() {
    this.isLoading = true;
    this.weatherService.getWeatherInSelectedCity().subscribe(
      (response: any) => {
        this.weatherInSelectedCity = new Weather(
          response.weather[0].id,
          response.weather[0].description,
          response.weather[0].main,
          response.weather[0].icon,
          response.main.temp,
          response.main.temp_max,
          response.main.temp_min
        );

        this.iconSrc = `http://openweathermap.org/img/wn/${this.weatherInSelectedCity.icon}@2x.png`;
        this.isLoading = false;
      },
      (error) => {
        alert(`Error ${error.status}: ${error.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedCitySubsctiption.unsubscribe();
  }
}

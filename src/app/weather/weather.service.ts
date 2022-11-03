import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { City } from '../models/city.model';
import { Coord } from '../models/coord.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements OnInit {
  private API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  private API_KEY = '5b4a5fb7fff1a8f5a3c0cd68dc4e9a5b';
  cities: City[] = [];
  selectedCity: City;
  selectedCitySubject = new Subject<City>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Take the cities from the assets/json/cities.json file, transform them into
   * the corresponding models and return an array of City
   */
  fetchCities() {
    this.http.get<any[]>('./assets/json/cities.json').subscribe((response) => {
      response.forEach((city) => {
        this.cities.push(
          new City(
            city.id,
            city.name,
            city.state,
            city.country,
            new Coord(city.lon, city.lat)
          )
        );
      });
      this.orderCitiesByName();
    });
  }

  /**
   * Sort the array of cities alphabetically
   */
  orderCitiesByName() {
    this.cities = this.cities.sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  setSelectedCity(city: City) {
    this.selectedCity = city;
    this.selectedCitySubject.next(city);
  }

  getWeatherInSelectedCity() {
    let urlRequest = `${this.API_URL}?id=${this.selectedCity.id}&appid=${this.API_KEY}&units=metric`;
    return this.http.get(urlRequest);
  }
}

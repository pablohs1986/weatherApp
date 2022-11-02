import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { City } from '../models/city.model';
import { Coord } from '../models/coord.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements OnInit {
  cities: City[] = [];

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
    });
  }
}

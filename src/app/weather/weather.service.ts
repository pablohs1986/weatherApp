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
  favourites: City[] = [];
  favouritesSubject = new Subject<City[]>();

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
            new Coord(city.coord.lon, city.coord.lat)
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

  /**
   * Set the city that receives as selected city and notify it to the observer
   * @param city 
   */
  setSelectedCity(city: City) {
    this.selectedCity = city;
    this.selectedCitySubject.next(city);
  }

  /**
   * Make a request to Open Weather Map to fetch weather data for the selected city.
   */
  getWeatherInSelectedCity() {
    let urlRequest = `${this.API_URL}?id=${this.selectedCity.id}&appid=${this.API_KEY}&units=metric`;
    return this.http.get(urlRequest);
  }

  fetchFavourites() {
    return this.favourites.slice();
  }

  /**
   * Add the city you receive to favorites if it is not in them.
   * @param city
   */
  addFavourite(city: City) {
    let isCityFavourite = this.favourites.some((c) => c.id === city.id);

    if (isCityFavourite === false) {
      this.favourites.push(city);
      this.favouritesSubject.next(this.favourites.slice());
    }
  }

  /**
   * Removes the array of cities it receives from the array of favorites
   * @param favouriteSelection
   */
  deleteFavouriteSelection(favouriteSelection: City[]) {
    favouriteSelection.forEach((f) => this.deleteFavourite(f.id));
    this.favouritesSubject.next(this.favourites.slice());
  }

  /**
   * Removes the city with the recived id from the favorites array
   * @param id
   */
  deleteFavourite(id: number) {
    let cityIndex = this.favourites.findIndex((c) => c.id === id);
    this.favourites.splice(cityIndex, 1);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-select',
  templateUrl: './weather-select.component.html',
  styleUrls: ['./weather-select.component.css'],
})
export class WeatherSelectComponent implements OnInit {
  formControl = new FormControl<string | City>('');
  cities: City[] = [];
  filteredCities: Observable<City[]>;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.fetchCities();
    this.initAutocomplete();
  }

  /**
   * Take the cities of service
   */
  fetchCities() {
    this.weatherService.fetchCities();
    this.cities = this.weatherService.cities;
  }

  initAutocomplete() {
    this.filteredCities = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.cities.slice();
      })
    );
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.cities.filter((city) =>
      city.name.toLowerCase().includes(filterValue)
    );
  }

  setCityInSelect(city: City): string {
    return city && city.name ? city.name : '';
  }

  /**
   * Use the weather service to set the selected city as selected in the service.
   * Also add that city to the list of favorites.
   */
  onSelectCity(city: City) {
    this.weatherService.setSelectedCity(city);
    this.weatherService.addFavourite(city);
  }

  onClear() {
    this.formControl.reset();
  }
}

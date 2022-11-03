import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-favourites',
  templateUrl: './weather-favourites.component.html',
  styleUrls: ['./weather-favourites.component.css'],
})
export class WeatherFavouritesComponent implements OnInit {
  favouritesSubscription: Subscription;
  favourites: City[];
  isEdit = false;
  selectedFavourites: any[];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.favourites = this.weatherService.fetchFavourites();
    this.onAddCityToFavourites();
  }

  onAddCityToFavourites() {
    this.favouritesSubscription =
      this.weatherService.favouritesSubject.subscribe(
        (favourites: City[]) => {
          this.favourites = favourites;
        },
        (error) => {
          alert(`Error ${error.status}: ${error.message}`);
        }
      );
  }

  onDeleteFavourites() {
    this.weatherService.deleteFavouriteSelection(this.selectedFavourites);
    this.toggleEdit();
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  onSelectCity(city: City) {
    this.weatherService.setSelectedCity(city);
  }

  onDelete() {
    this.favouritesSubscription.unsubscribe();
  }
}

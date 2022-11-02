import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherFavouritesComponent } from './weather-favourites.component';

describe('WeatherFavouritesComponent', () => {
  let component: WeatherFavouritesComponent;
  let fixture: ComponentFixture<WeatherFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherFavouritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

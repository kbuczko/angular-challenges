import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import { CardType } from '../../model/card.model';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities"
    [type]="cardType"
    customClass="bg-light-yellow"
    ><img src="assets/img/city.jpg" width="200px"
  /></app-card>`,
  standalone: true,
  imports: [CardComponent],
  styles: [
    `
      ::ng-deep .bg-light-yellow {
        background-color: rgb(245 229 89);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;
  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }
}

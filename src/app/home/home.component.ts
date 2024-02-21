import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent ],
  template: `
  <div class = "container" aligh = "right">
  <section>
  <form>
    <input type="text" placeholder="Filter by city" #filter><br>
    <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>  </form>
  </section>
  </div>
  
  <section class="results">
    <app-housing-location 
     *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation">
    </app-housing-location> 
  </section>
  `,
  styleUrl: './home.component.css'

})

export class HomeComponent {
  
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList: HousingLocation[] = [];

  filteredLocationList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();

    this.filteredLocationList = this.housingLocationList;

    console.log(this.housingLocationList);
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );

    // this.filteredLocationList = this.housingLocationList.filter(
    //   housingLocation => housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    // );

  }

}





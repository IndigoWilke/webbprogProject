import { Component } from '@angular/core';
import { exhibitors } from './data/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   places = exhibitors.map(item => ({
    name: item.name,
    lat: item.coordinates[0],
    lng: item.coordinates[1],
    galleryType: item.galleryType,
    open: item.openingHours['öppnar'],
    closing: item.openingHours['stänger'],
    genre: item.genre,
    servesFood: item.servesFood,
    servesAlcoholicBev: item.servesAlcoholicBev,
  }));
  title = 'my-angular-project';
}

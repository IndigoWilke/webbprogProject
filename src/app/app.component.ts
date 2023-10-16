import { Component } from '@angular/core';
import { exhibitors } from './data/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // an array containing the data for the locations we are working with
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
 // places = [
 //   { name: 'Gallerian', lat: 55.61, lng: 13.02, description: "helt ok"},
 //  { name: 'Donken', lat: 55.61, lng: 13.03, description: "dålig mat"},
 //   { name: 'Donken igen', lat: 55.63, lng: 13.00, description: "helt ok"},
 //   { name: 'En tavla', lat: 55.59, lng: 13.03, description: "smakar inte gott"},
 //   { name: 'Bubbel', lat: 55.60, lng: 13.01, description: "inte såpbubblor"},
 //   {name: 'Mitt Möllan', lat:55.5897545, lng: 13.0085841, description: "test"},
 // ];
  title = 'my-angular-project';
}

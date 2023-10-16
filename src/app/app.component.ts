import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // an array containing the data for the locations we are working with
  places = [
    { name: 'Gallerian', lat: 55.61, lng: 13.02, description: "helt ok"},
    { name: 'Donken', lat: 55.61, lng: 13.03, description: "dålig mat"},
    { name: 'Donken igen', lat: 55.63, lng: 13.00, description: "helt ok"},
    { name: 'En tavla', lat: 55.59, lng: 13.03, description: "smakar inte gott"},
    { name: 'Bubbel', lat: 55.60, lng: 13.01, description: "inte såpbubblor"},
  ];
  title = 'my-angular-project';
}

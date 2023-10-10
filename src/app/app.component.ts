import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // an array containing the data for the locations we are working with
  places = [
    { name: 'Gallerian', lat: 55.61, lng: 13.02 },
    { name: 'Donken', lat: 55.61, lng: 13.03 },
  ];
  title = 'my-angular-project';
}

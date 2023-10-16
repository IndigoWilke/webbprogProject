import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import './map.component.css';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, OnChanges {
  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
   })
  };
 // @Input() places: { name: string; lat: number; lng: number; description: string }[] = [];
  @Input() places: { name: string; lat: number; lng: number; galleryType: string; open: number; closing: number;
  genre: string; servesFood: boolean; servesAlcoholicBev: boolean }[] = [];

  private map!: L.Map;

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['places']) {
      this.updateMarkers();
    }
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([55.61, 13.02], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.updateMarkers();
  }

  private updateMarkers(): void {
    // Clear existing markers
    if (this.map) {
      this.map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      // Add markers based on the updated places array
      this.places.forEach(place => {
        const marker = L.marker([place.lat, place.lng], this.icon).addTo(this.map);
      
        // Create a custom popup content
        const popupContent = `
          <h3>${place.name}</h3>
          <p>Beskrivning: ${place.genre}</p>
          <p>Öppettider: ${place.open} - ${place.closing}</p>
          <img src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png" alt="Image" width="100">
        `;
    
        // Bind the custom popup to the marker
        marker.bindPopup(popupContent);
    
        // Open the popup when the marker is clicked
        marker.on('click', () => {
          marker.openPopup();
        });
      });
    }
  }

}

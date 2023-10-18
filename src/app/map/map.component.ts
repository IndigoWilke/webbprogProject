import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import './map.component.css';
import { FilterService } from '../filter.service'; 
import { StateService } from '../state.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, OnChanges {
  galleryItems: any[] = [];
  selectedGalleries: any[] = [];
  markers: L.Marker[] = [];

  constructor(private filterService: FilterService, private stateService: StateService) {}

  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
   })
  };
  @Input() places: { name: string; lat: number; lng: number; galleryType: string; open: number; closing: number;
  genre: string; servesFood: boolean; servesAlcoholicBev: boolean }[] = [];

  private map!: L.Map;

  ngOnInit(): void {
    this.initializeMap();
    this.subscribeToSelectedGalleries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['places']) {
      this.updateMarkers();
    }
  }

  subscribeToSelectedGalleries() {
    this.stateService.selectedGalleries$().subscribe(selectedGalleries => {
      this.selectedGalleries = selectedGalleries;
      this.updateMarkers();
    });
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([55.61, 13.02], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.resetState();
    this.updateMarkers();
  }

  resetState() {
    const initialState = this.stateService.getCurrentState();
    this.galleryItems = initialState.galleryItems;
    this.selectedGalleries = initialState.selectedGalleries;
    
  }

  private updateMarkers(): void {

    // Clear existing markers
    if (this.map) {
      this.map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      this.selectedGalleries.forEach(place => {
        const marker = L.marker([place.coordinates[0], place.coordinates[1]], this.icon).addTo(this.map);
        const isFoodServing = place.servesFood;
        const isAlcoholServing = place.servesAlcoholicBev;
        
        let servingInfo = '';
        if (isFoodServing && isAlcoholServing) {
          servingInfo = 'Mat- och alkoholservering';
        } else if (isFoodServing) {
          servingInfo = 'Matservering';
        } else if (isAlcoholServing) {
          servingInfo = 'Alkoholservering';
        }
        const popupContent = `
          <h2>${place.name}</h2>
          <p>Gallerityp: ${place.galleryType}</p>
          <p>Beskrivning: ${place.genre}</p>
          ${servingInfo ? `<p> ${servingInfo}</p>` : ''}
          <h4>Öppettider: ${place.openingHours['öppnar']} - ${place.openingHours['stänger']}</h4>
          `;
    
        marker.bindPopup(popupContent);
    
        marker.on('click', () => {
          marker.openPopup();
        });
      });
    }
  }

  

}

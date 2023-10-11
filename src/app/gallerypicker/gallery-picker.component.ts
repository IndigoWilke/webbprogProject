import { Component } from '@angular/core';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gallery-picker',
  templateUrl: './gallery-picker.component.html',
  styleUrls: ['./gallery-picker.component.css'],
})

export class GallerypickerComponent {
  galleryItems: string[] = ['gallery1', 'gallery2', 'gallery3'];
  showChecklist: boolean = false;
  selectedGalleries: string[] = [];
  faMapPin = faMapPin;

  toggleChecklist() {
    this.showChecklist = !this.showChecklist;
  }

  submitForm() {
    // Handle form submission logic here
    console.log('Selected Galleries:', this.selectedGalleries);
  }
}

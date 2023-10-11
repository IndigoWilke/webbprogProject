import { Component, OnInit } from '@angular/core';
import { FilterService } from '../filter.service'; 

@Component({
  selector: 'app-gallery-picker',
  templateUrl: './gallery-picker.component.html',
  styleUrls: ['./gallery-picker.component.css'],
})

export class GallerypickerComponent implements OnInit {
  galleryItems: any[] = [];
  showChecklist: boolean = false;
  selectedGalleries: string[] = [];

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterService.filteredExhibitors$.subscribe((data) => {
      this.galleryItems = data;
      console.log('this.galleryItems: ', this.galleryItems);
    });
  }

  toggleChecklist() {
    this.showChecklist = !this.showChecklist;
  }


  submitForm() {
    // Handle form submission logic here
    console.log('Selected Galleries:', this.selectedGalleries);
  }
}

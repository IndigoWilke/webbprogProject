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
  selectedGalleries: string[] = []; // Array to hold selected galleries

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterService.filteredExhibitors$.subscribe((data) => {
      this.galleryItems = data.map(item => {
        return {
          ...item,
          checked: this.selectedGalleries.includes(item.name)
        };
      });
      console.log('this.galleryItems: ', this.galleryItems);
    });
  }

  toggleChecklist() {
    this.showChecklist = !this.showChecklist;
  }

  submitForm() {
    const newlySelectedGalleryNames = this.galleryItems
      .filter(gallery => gallery.checked)
      .map(gallery => gallery.name);
  
    const uniqueNewlySelectedGalleryNames = newlySelectedGalleryNames.filter(name => !this.selectedGalleries.includes(name));
  
    this.selectedGalleries = [...this.selectedGalleries, ...uniqueNewlySelectedGalleryNames];
  
    console.log('Selected Galleries:', this.selectedGalleries);
  }
  
}

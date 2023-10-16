import { Component, OnInit } from '@angular/core';
import { FilterService } from '../filter.service'; 
import { StateService } from '../state.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-gallery-picker',
  templateUrl: './gallery-picker.component.html',
  styleUrls: ['./gallery-picker.component.css'],
})

export class GallerypickerComponent implements OnInit {
  galleryItems: any[] = [];
  showChecklist: boolean = false;
  selectedGalleries: string[] = [];
  constructor(private filterService: FilterService, private stateService: StateService) {}

  ngOnInit() {
    this.filterService.filteredExhibitors$
      .subscribe((data) => {
      this.resetState();
      this.galleryItems = data.map(item => {
        return {
          ...item,
          checked: this.selectedGalleries.includes(item.name)
        };
      });
      console.log('this.selectedGalleris: ', this.selectedGalleries);
      console.log('this.galleryItems: ', this.galleryItems);
    });
  }

  resetState() {
    const initialState = this.stateService.getCurrentState();
    this.galleryItems = initialState.galleryItems;
    this.selectedGalleries = initialState.selectedGalleries;
  }

  toggleChecklist() {
    this.showChecklist = !this.showChecklist;
  }

  submitForm() {
    this.selectedGalleries = this.galleryItems.filter((gallery) => gallery.checked);
    console.log('Selected Galleries:', this.selectedGalleries);
    
    this.stateService.updateSelectedGalleries(this.selectedGalleries);
  } 
}

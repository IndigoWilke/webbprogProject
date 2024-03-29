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
  selectedGalleries: any[] = [];
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
        this.stateService.updateSelectedGalleries(this.selectedGalleries);
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

  showAll() {
    this.galleryItems.forEach((gallery) => {
      gallery.checked = true;
    });
    this.selectedGalleries = this.galleryItems.filter((gallery) => gallery.checked);
    this.stateService.updateSelectedGalleries(this.selectedGalleries);
  }
  
  hideAll() {
    this.galleryItems.forEach((gallery) => {
      gallery.checked = false;
    });
    this.selectedGalleries = this.galleryItems.filter((gallery) => gallery.checked);
    this.stateService.updateSelectedGalleries(this.selectedGalleries);
  }

  displayGalleries() {
    this.selectedGalleries = this.galleryItems.filter((gallery) => gallery.checked);
    this.stateService.updateSelectedGalleries(this.selectedGalleries);
  } 
}

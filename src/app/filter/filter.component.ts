import { FilterCategory} from './filter.model'; // Import the model
import { FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';
import { exhibitors } from '../data/data';
import { FilterService } from '.././filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  isFilterMenuVisible = false;
  constructor(private filterService: FilterService) {}

  toggleFilterMenu() {
    this.isFilterMenuVisible = !this.isFilterMenuVisible;
  }

  timeFormatValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value || value.match(/^([01]\d|2[0-3]):([0-5]\d)$/)) {
      return null;
    }
    return { invalidTimeFormat: true };
  }

  openingTimeControl = new FormControl('', [
    this.timeFormatValidator,
  ]);

  closingTimeControl = new FormControl('', [
    this.timeFormatValidator,
  ]);

  filterCategories: FilterCategory[] = [
    {
      name: 'Gallery Type',
      options: [
        { label: 'Popup', checked: false },
        { label: 'Gallerier och utställningsrum', checked: false },
      ],
    },
    {
      name: 'Opening Hours',
    },
    {
      name: 'Food and Drinks',
      options: [
        { label: 'Food Service', checked: false },
        { label: 'Alcohol Permit', checked: false },
      ],
    },
  ];

  clearFilters() {
    // Reset filter options in your model
    this.openingTimeControl.setValue('');
    this.closingTimeControl.setValue('');

    this.filterCategories.forEach((category) => {
      if (category.options) {
        category.options.forEach((option) => {
          option.checked = false;
        });
      }
    });

    this.applyFilters();
  }

  filterExhibitorsByGalleryType(selectedGalleryTypes: string[]): any[] {
    if (selectedGalleryTypes.length === 0) {
      return exhibitors;
    }
  
    return exhibitors.filter((exhibitor) => {
      return selectedGalleryTypes.includes(exhibitor.galleryType);
    });
  }
  

  applyFilters() {
    const openingTime = this.openingTimeControl.value;
    const closingTime = this.closingTimeControl.value;
  
    // Extract selected Gallery Types from filterCategories
    const galleryTypeCategory = this.filterCategories.find((category) => category.name === 'Gallery Type');
  
    if (galleryTypeCategory) {
      const selectedGalleryTypes = galleryTypeCategory.options
        ?.filter((option) => option.checked)
        .map((option) => option.label);
  
        if (selectedGalleryTypes) {
          const filteredExhibitors = this.filterExhibitorsByGalleryType(selectedGalleryTypes);
          this.filterService.setFilteredExhibitors(filteredExhibitors);
          console.log('Filtered Exhibitors:', filteredExhibitors);
        } else {
          // Handle the case where 'options' is not found
          console.log('No selected Gallery Types');
        }
    } else {
      // Handle the case where 'Gallery Type' category is not found
      console.log('Gallery Type category not found');
    }
  
    console.log("Opening Time:", openingTime);
    console.log("Closing Time:", closingTime);
  }
  
  
}

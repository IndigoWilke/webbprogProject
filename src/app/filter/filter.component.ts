import { FilterCategory, FilterOption } from './filter.model'; // Import the model
import { FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  isFilterMenuVisible = false;
  galleries = [{
    name: 'gallery1',
    type: 'popup',
    restaurant: true,
    alcohol: true,
    opening: '10:00',
    closing: '18:00',
  },
  {
    name: 'gallery2',
    type: 'popup',
    restaurant: true,
    opening: '10:00',
    closing: '18:00'
  },
  {
    name: 'gallery1',
    restaurant: true,
    type: 'option2',
    alcohol: true,
    opening: '10:00',
    closing: '18:00'
  },
  {
    name: 'gallery1',
    type: 'popup',
    restaurant: true,
    alcohol: true,
    opening: '12:00',
    closing: '16:00'
  }]

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
        { label: 'Option 2', checked: false },
        { label: 'Option 3', checked: false },
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

  applyFilters() {
    // Handle filter logic here
    const openingTime = this.openingTimeControl.value;
    const closingTime = this.closingTimeControl.value;
    console.log('galleries: ', this.galleries)
    console.log("Opening Time:", openingTime);
    console.log("Closing Time:", closingTime);
    
  }
}

// sidebar.component.ts

import { FilterCategory, FilterOption } from './filter.model'; // Import the model
import { FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'; // Import Angular animations

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  

  timeFormatValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value.match(/^([01]\d|2[0-3]):([0-5]\d)$/)) {
      return { invalidTimeFormat: true };
    }
    return null;
  }

  openingTimeControl = new FormControl('', [
    Validators.required,
    this.timeFormatValidator,
  ]);

  closingTimeControl = new FormControl('', [
    Validators.required,
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
    }
  ];

  applyFilters() {
    // Handle filter logic here
    const openingTime = this.openingTimeControl.value;
    const closingTime = this.closingTimeControl.value;
    console.log("Opening Time:", openingTime);
    console.log("Closing Time:", closingTime);
  }
}

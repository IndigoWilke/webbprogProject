import { FilterCategory} from './filter.model'; // Import the model
import { FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';
import { exhibitors } from '../data/data';
import { FilterService } from '.././filter.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  isFilterMenuVisible = false;
  constructor(private filterService: FilterService, private stateService: StateService) {
    this.stateService.setInitialState();
    this.filterService.setFilteredExhibitors(exhibitors);
  }

  toggleFilterMenu() {
    this.isFilterMenuVisible = !this.isFilterMenuVisible;
  }

  timeFormatValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as number;
    if (!value || (value >= 1 && value <= 24)) {
      return null;
    }
    return { invalidHourRange: true };
  }

  openingTimeControl = new FormControl(0, [this.timeFormatValidator]);
  closingTimeControl = new FormControl(0, [this.timeFormatValidator]);;

  filterCategories: FilterCategory[] = [
    {
      name: 'Gallery Type',
      options: [
        { label: 'Popup', checked: false },
        { label: 'Gallerier och utställningsrum', checked: false },
      ],
    },
    {
      name: 'Genre',
      options: [
        { label: 'Ljudkonst', checked: false },
        { label: 'Klassisk konst', checked: false },
        { label: 'Performance-konst', checked: false },
        { label: 'Feministisk konst', checked: false },
        { label: 'Övrigt', checked: false },
      ],
    },
    {
      name: 'Food and Drinks',
      options: [
        { label: 'Food Service', checked: false },
        { label: 'Alcohol Permit', checked: false },
      ],
    },
    {
      name: 'Opening Hours',
    },
  ];

  clearFilters() {
    this.openingTimeControl.setValue(0);
    this.closingTimeControl.setValue(0)

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
    const openingHour = this.openingTimeControl.value ? this.openingTimeControl.value : 0
    const closingHour = this.closingTimeControl.value ? this.closingTimeControl.value : 0
  
    const galleryTypeCategory = this.filterCategories.find((category) => category.name === 'Gallery Type');
    const genreCategory = this.filterCategories.find((category) => category.name === 'Genre');
    const foodAndAlcoholCategory = this.filterCategories.find((category) => category.name === 'Food and Drinks');
    const foodServiceChecked = foodAndAlcoholCategory?.options ? foodAndAlcoholCategory.options[0].checked : false;
    const alcoholPermitChecked = foodAndAlcoholCategory?.options ? foodAndAlcoholCategory.options[1].checked : false;
  
    const selectedGalleryTypes = galleryTypeCategory?.options
      ?.filter((option) => option.checked)
      .map((option) => option.label) || [];
  
    const selectedGenres = genreCategory?.options
      ?.filter((option) => option.checked)
      .map((option) => option.label) || [];
  
    const filterExhibitorsByFoodService = this.filterExhibitorsByFoodService(foodServiceChecked);
    const filteredExhibitorsByAlcoholPermit = this.filterExhibitorsByAlcoholPermit(alcoholPermitChecked);
    const filteredExhibitorsByGalleryType = this.filterExhibitorsByGalleryType(selectedGalleryTypes);
    const filteredExhibitorsByGenre = this.filterExhibitorsByGenre(selectedGenres);
    const filteredExhibitorsByOpeningHours = this.filterExhibitorsByOpeningHours(openingHour, closingHour);
  
    const filteredExhibitors = this.combineFilters(
      filterExhibitorsByFoodService,
      filteredExhibitorsByAlcoholPermit,
      filteredExhibitorsByGalleryType,
      filteredExhibitorsByGenre,
      filteredExhibitorsByOpeningHours
    );
  
    this.filterService.setFilteredExhibitors(filteredExhibitors);
    this.stateService.setInitialState();
  }
  
  filterExhibitorsByFoodService(foodServiceChecked: boolean): any[] {
    return foodServiceChecked
      ? exhibitors.filter((exhibitor) => exhibitor.servesAlcoholicBev)
      : exhibitors;
  }
  
  filterExhibitorsByAlcoholPermit(alcoholPermitChecked: boolean): any[] {
    return alcoholPermitChecked
      ? exhibitors.filter((exhibitor) => exhibitor.servesFood)
      : exhibitors;
  }
  
  filterExhibitorsByGalleryType(selectedGalleryTypes: string[]): any[] {
    return selectedGalleryTypes.length > 0
      ? exhibitors.filter((exhibitor) => selectedGalleryTypes.includes(exhibitor.galleryType))
      : exhibitors;
  }
  
  filterExhibitorsByGenre(selectedGenres: string[]): any[] {
    return selectedGenres.length > 0
      ? exhibitors.filter((exhibitor) => selectedGenres.includes(exhibitor.genre))
      : exhibitors;
  }

  filterExhibitorsByOpeningHours(openingHour: number, closingHour: number): any[] {
    return exhibitors.filter((exhibitor) => {
      let open = exhibitor.openingHours['öppnar'];
      let close = exhibitor.openingHours['stänger'];
  
      if (openingHour === 0 && closingHour === 0) {
        return true;
      }
  
      if (openingHour === 0) {
        return close < closingHour;
      }
  
      if (closingHour === 0) {
        return open > openingHour;
      }
  
      if (close < open) {
        close += 24;
      }
  
      return open <= openingHour && close >= closingHour;
    });
  }
  
  combineFilters(...filters: any[][]): any[] {
    return filters.reduce((combined, currentFilter) =>
      combined.filter((item) => currentFilter.includes(item))
    );
  }
  
}

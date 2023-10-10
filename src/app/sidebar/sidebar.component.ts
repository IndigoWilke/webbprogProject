// sidebar.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  filterOptions: any[] = [
    { label: 'Option 1', checked: false },
    { label: 'Option 2', checked: false },
    { label: 'Option 3', checked: false },
  ];

  applyFilters() {
    // Handle filter logic here
    console.log(this.filterOptions);
  }
}

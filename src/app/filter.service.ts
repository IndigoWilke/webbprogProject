import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filteredExhibitorsSubject = new BehaviorSubject<any[]>([]);
  filteredExhibitors$ = this.filteredExhibitorsSubject.asObservable();

  setFilteredExhibitors(data: any[]) {
    this.filteredExhibitorsSubject.next(data);
  }
}
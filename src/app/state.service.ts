import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private initialState: any = {
    galleryItems: [],
    selectedGalleries: [],
  };

  private currentState: any = { ...this.initialState };
  private selectedGalleriesSubject = new BehaviorSubject<string[]>([]);

  constructor() {
    this.selectedGalleriesSubject.next(this.initialState.selectedGalleries);
  }

  setInitialState() {
    this.currentState = { ...this.initialState };
  }

  getCurrentState() {
    return { ...this.currentState };
  }

  updateSelectedGalleries(selectedGalleries: string[]) {
    this.currentState.selectedGalleries = selectedGalleries;
    this.selectedGalleriesSubject.next(selectedGalleries);
  }

  // Create an observable for selectedGalleries
  selectedGalleries$(): Observable<string[]> {
    return this.selectedGalleriesSubject.asObservable();
  }
}

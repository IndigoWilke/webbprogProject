import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private initialState: any = {
    galleryItems: [],
    selectedGalleries: [],
  };

  private currentState: any = { ...this.initialState };

  setInitialState() {
    this.currentState = { ...this.initialState };
  }

  getCurrentState() {
    return { ...this.currentState };
  }
}

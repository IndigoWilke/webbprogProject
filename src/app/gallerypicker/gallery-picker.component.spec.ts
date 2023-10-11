import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerypickerComponent } from './gallery-picker.component';

describe('GallerypickerComponent', () => {
  let component: GallerypickerComponent;
  let fixture: ComponentFixture<GallerypickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GallerypickerComponent]
    });
    fixture = TestBed.createComponent(GallerypickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

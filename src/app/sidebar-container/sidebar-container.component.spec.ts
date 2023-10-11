import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContainerComponent } from './sidebar-container.component';

describe('SidebarContainerComponent', () => {
  let component: SidebarContainerComponent;
  let fixture: ComponentFixture<SidebarContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarContainerComponent]
    });
    fixture = TestBed.createComponent(SidebarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

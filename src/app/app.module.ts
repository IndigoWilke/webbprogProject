import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FilterComponent } from './filter/filter.component'
import { GallerypickerComponent } from './gallerypicker/gallery-picker.component';
import { MatExpansionModule } from '@angular/material/expansion';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';


@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    GallerypickerComponent,
    SidebarContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule, 
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

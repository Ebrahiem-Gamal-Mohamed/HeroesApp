import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// thirdParties
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// components ...
import { AppComponent } from './app.component';
import { HeroesListComponent } from './heroes/heroes-list/heroes-list.component';
import { HeroProfileComponent } from './heroes/hero-profile/hero-profile.component';

import { NgbdSortableHeader } from './shared/_directives/sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroProfileComponent,
    NgbdSortableHeader
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

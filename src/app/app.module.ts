import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// thirdParties
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';

import { InMemHeroService } from './shared/_services/fake-hero-api.service';
// components ...
import { AppComponent } from './app.component';
import { HeroesListComponent } from './heroes/heroes-list/heroes-list.component';
import { HeroProfileComponent } from './heroes/hero-profile/hero-profile.component';
import { EmptyComponent } from './shared/_components/empty/empty.component';
import { FastAccessComponent } from './shared/_components/fast-access/fast-access.component';

import { NgbdSortableHeader } from './shared/_directives/sortable.directive';
import { HeaderComponent } from './shared/_components/header/header.component';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroProfileComponent,
    NgbdSortableHeader,
    EmptyComponent,
    FastAccessComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InputSwitchModule,
    DialogModule,
    environment.production ?
    [] : HttpClientInMemoryWebApiModule.forRoot(InMemHeroService, { delay: 0 })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FastAccessComponent]
})
export class AppModule { }

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
//NgRx..
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; 
// thirdParties
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemHeroService } from "./shared/_services/fake-hero-api.service";

import { AppComponent } from "./app.component";

import { environment } from "src/environments/environment.prod";
import { SharedModule } from "./shared/shared.module";
import { HeroesModule } from "./heroes/heroes.module";
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Heroes App',
      maxAge: 25,
      logOnly: environment.production
    }),
    SharedModule,
    HeroesModule,
    environment.production
      ? []
      : HttpClientInMemoryWebApiModule.forRoot(InMemHeroService, { delay: 0 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

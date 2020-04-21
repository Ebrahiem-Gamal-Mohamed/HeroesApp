import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
//NgRx..
import { StoreModule } from "@ngrx/store";

import { SharedModule } from "./../shared/shared.module";
import { HeroesListComponent } from "./heroes-list/heroes-list.component";
import { HeroProfileComponent } from "./hero-profile/hero-profile.component";
import { heroReducer } from './state/hero.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HeroEffects } from './state/hero.effects';

const herosRoutes: Routes = [
  { path: "", component: HeroesListComponent },
  { path: ":id", component: HeroProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(herosRoutes),
    StoreModule.forFeature("heroes", heroReducer),
    EffectsModule.forFeature([HeroEffects])
  ],
  declarations: [HeroesListComponent, HeroProfileComponent],
  exports: [],
  providers: []
})
export class HeroesModule {}

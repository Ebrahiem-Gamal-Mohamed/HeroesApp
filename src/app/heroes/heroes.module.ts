import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from "./../shared/shared.module";
import { HeroesListComponent } from "./heroes-list/heroes-list.component";
import { HeroProfileComponent } from "./hero-profile/hero-profile.component";

const herosRoutes: Routes = [
  { path: '', component: HeroesListComponent },
  { path: ':id', component: HeroProfileComponent}
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(herosRoutes)],
  declarations: [HeroesListComponent, HeroProfileComponent],
  exports: [],
  providers: []
})
export class HeroesModule {}

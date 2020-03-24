import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesListComponent } from './heroes/heroes-list/heroes-list.component';
import { HeroProfileComponent } from 'src/app/heroes/hero-profile/hero-profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroesListComponent },
  { path: 'heroes/:id', component: HeroProfileComponent},
  { path: '**', redirectTo: '/heroes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

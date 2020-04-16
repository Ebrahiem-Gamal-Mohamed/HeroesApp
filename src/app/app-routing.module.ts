import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/heroes", pathMatch: "full" },
  {
    path: "heroes",
    loadChildren: () =>
      import("./heroes/heroes.module").then(m => m.HeroesModule)
  },
  { path: "**", redirectTo: "/heroes" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

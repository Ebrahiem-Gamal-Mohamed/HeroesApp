import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { HeroService } from "./../hero.service";
import { IHero } from "./../hero.model";
import * as HeroesActions from "./hero.actions";
import { mergeMap, map } from "rxjs/operators";

@Injectable()
export class HeroEffects {
  constructor(private actions$: Actions, private heroService: HeroService) {}

  @Effect()
  heroes$ = this.actions$.pipe(
    ofType(HeroesActions.HeroesActionTypes.Load),
    mergeMap((action: HeroesActions.Load) =>
      this.heroService
        .getHeroes()
        .pipe(map((heroes: IHero[]) => new HeroesActions.LoadSuccess(heroes)))
    )
  );
}

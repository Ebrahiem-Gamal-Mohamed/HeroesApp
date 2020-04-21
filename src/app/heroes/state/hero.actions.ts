import { Action } from "@ngrx/store";
import { IHero } from './../hero.model';

export enum HeroesActionTypes {
  ChangeSearchValue = "[Heroes List Filter] Change search value",
  ToggleSortBy = "[Heroes List Filter] Toggle sort by",
  ChangeSortType = "[Heroes List] Change sort type",
  Load = "[Heroes List] Load heroes",
  LoadSuccess = "[Heroes List] Load Heroes success",
  LoadFail = "[Heroes List] Load Heroes Fail"
}

export class ChangeSearchValue implements Action {
  readonly type = HeroesActionTypes.ChangeSearchValue;
  constructor(public payload: string) {}
}

export class ToggleSortBy implements Action {
  readonly type = HeroesActionTypes.ToggleSortBy;
  constructor(public payload: string) {}
}

export class ChangeSortType implements Action {
  readonly type = HeroesActionTypes.ChangeSortType;
  constructor(public payload: {column: string, direction: string}) {}
}

export class Load implements Action {
  readonly type = HeroesActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = HeroesActionTypes.LoadSuccess;
  constructor(public payload: IHero[]) {}
}

export class LoadFail implements Action {
  readonly type = HeroesActionTypes.LoadFail;
  constructor(public payload: string) {}
}

export type HeroesActions = ChangeSearchValue
  | ToggleSortBy
  | ChangeSortType
  | Load
  | LoadSuccess
  | LoadFail;

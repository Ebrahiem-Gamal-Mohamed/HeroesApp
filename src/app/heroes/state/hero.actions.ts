import { Action } from '@ngrx/store';

export enum HeroesActionTypes {
    ChangeSearchValue = '[Heroes List Filter] Change search value',
    ToggleSortBy = '[Heroes List Filter] Toggle sort by',
    ChangeSortType = '[Heroes List] Change sort type'
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
    constructor(public payload: string) {}
}

export type HeroesActions = ChangeSearchValue | ToggleSortBy | ChangeSortType;

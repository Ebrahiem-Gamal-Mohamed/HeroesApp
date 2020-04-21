import * as fromRoot from "../../state/app.state";
import { IHero } from "./../hero.model";
import { Sorter } from "./../../shared/appEnums";
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { HeroesActionTypes, HeroesActions } from "./hero.actions";
// States ...
export interface State extends fromRoot.State {
  heroes: HeroState;
}
export interface HeroState {
  heroes: IHero[];
  sortBy: string;
  sortType: {column: string, direction: string};
  searchValue: string;
}
const initialState: HeroState = {
  heroes: [],
  sortBy: Sorter.NAME,
  sortType: {column: '', direction: ''},
  searchValue: ""
};

// Selectors ....
const getHeroFeatureState = createFeatureSelector<HeroState>("heroes"); // feature selector
export const getHeroSortBy = createSelector(
  getHeroFeatureState,
  state => state.sortBy
); // state selector
export const getHeroSortType = createSelector(
  getHeroFeatureState,
  state => state.sortType
); // state selector
export const getHeroes = createSelector(
  getHeroFeatureState,
  state => state.heroes
); // state selector
export const getHeroSearchValue = createSelector(
  getHeroFeatureState,
  state => state.searchValue
); // state selector

// Reducer ....
export function heroReducer(
  state = initialState,
  action: HeroesActions
): HeroState {
  switch (action.type) {
    case HeroesActionTypes.ToggleSortBy:
      return {
        ...state,
        sortBy: action.payload
      };

    case HeroesActionTypes.ChangeSortType:
      return {
        ...state,
        sortType: {...action.payload}
      };

    case HeroesActionTypes.ChangeSearchValue:
      return {
        ...state,
        searchValue: action.payload
      };

    case HeroesActionTypes.LoadSuccess:
      return {
        ...state,
        heroes: action.payload
      };

    default:
      return state;
  }
}

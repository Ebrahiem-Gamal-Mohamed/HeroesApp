import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from "@angular/core";
import { HeroService } from "./../hero.service";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { Sorter } from "src/app/shared/appEnums";
import {
  SortEvent,
  NgbdSortableHeader,
  SortDirection
} from "./../../shared/_directives/sortable.directive";
// NgRx ...
import { Store, select } from "@ngrx/store";
import * as fromHeroes from "../state/hero.reducer";
import * as HeroesActions from "../state/hero.actions";
import { takeWhile } from 'rxjs/operators';

export interface Table {
  headers: any[];
}

@Component({
  selector: "app-heroes-list",
  templateUrl: "./heroes-list.component.html",
  styleUrls: ["./heroes-list.component.scss"],
  providers: [NgbRatingConfig]
})
export class HeroesListComponent implements OnInit, OnDestroy {
  tableOptions: Table;
  sortableColumnName: string = Sorter.NAME;
  filter: string;
  switchValue: boolean = true;
  componentActive = true;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public heroService: HeroService,
    private config: NgbRatingConfig,
    private store: Store<fromHeroes.State>
  ) {
    this.config.max = 5;
    this.config.readonly = true;
    this.tableOptions = {
      headers: [
        { name: Sorter.NAME, value: "Hero Name", sortable: true },
        { name: Sorter.POWERS, value: "Powers", sortable: true },
        { name: Sorter.RATE, value: "Rate", sortable: false }
      ]
    };
  }

  ngOnInit(): void {
    this.store.pipe(
      takeWhile(() => this.componentActive),
      select(fromHeroes.getHeroSortBy)
      ).subscribe(
      sortBy => {
      this.sortableColumnName = sortBy;
      this.sortableColumnName === Sorter.NAME
        ? (this.switchValue = true)
        : (this.switchValue = false);
    });

    this.store.pipe(
      takeWhile(() => this.componentActive),
      select(fromHeroes.getHeroSearchValue)
      ).subscribe(
      searchText => (this.filter = searchText));

    this.store.pipe(
      takeWhile(() => this.componentActive),
      select(fromHeroes.getHeroSortType)
      ).subscribe(({column, direction}) => {
      if (this.headers) this.headers.forEach(header => {
        if (header.sortable === column) {
          header.direction = direction as SortDirection;
        } else {
          header.direction = "";
        }
      });
    });
  }

  changeSearchCriteria(value: string) {
    this.store.dispatch(new HeroesActions.ChangeSearchValue(value));
    this.heroService.search(value);
  }

  toggleSort() {
    let soryByValue: string;
    this.sortableColumnName === Sorter.NAME
      ? (soryByValue = Sorter.POWERS)
      : (soryByValue = Sorter.NAME);
    this.store.dispatch(new HeroesActions.ToggleSortBy(soryByValue));
  }

  onSort({ column, direction }: SortEvent, colName: string) {
    if (colName === column) {
      this.store.dispatch(new HeroesActions.ChangeSortType({column, direction}));
      this.heroService.sortHeroes(column, direction);
    } else {
      // console.log('not sortable column');
    }
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}

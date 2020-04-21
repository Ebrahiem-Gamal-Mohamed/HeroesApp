import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { HeroService } from "./../hero.service";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { Sorter } from "src/app/shared/appEnums";
import {
  SortEvent,
  NgbdSortableHeader
} from "./../../shared/_directives/sortable.directive";
// NgRx ...
import { Store, select } from "@ngrx/store";
import * as fromHeroes from "../state/hero.reducer";
import * as HeroesActions from "../state/hero.actions";

export interface Table {
  headers: any[];
}

@Component({
  selector: "app-heroes-list",
  templateUrl: "./heroes-list.component.html",
  styleUrls: ["./heroes-list.component.scss"],
  providers: [NgbRatingConfig]
})
export class HeroesListComponent implements OnInit {
  tableOptions: Table;
  sortableColumnName: string = Sorter.NAME;
  filter: string;
  switchValue: boolean = true;

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
    this.store.pipe(select(fromHeroes.getHeroSortBy)).subscribe(
      sortBy => {
      this.sortableColumnName = sortBy;
      this.sortableColumnName === Sorter.NAME
        ? (this.switchValue = true)
        : (this.switchValue = false);
    });

    this.store.pipe(select(fromHeroes.getHeroSearchValue)).subscribe(
      searchText => (this.filter = searchText));
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
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = "";
        }
      });
      this.heroService.sortHeroes(column, direction);
    } else {
      // console.log('not sortable column');
    }
  }
}

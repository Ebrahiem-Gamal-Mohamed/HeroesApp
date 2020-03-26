import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { HeroService } from './../hero.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { IHero } from './../hero.model';
import { Sorter } from 'src/app/shared/appEnums';
import { FormControl } from '@angular/forms';
import { SortEvent, NgbdSortableHeader } from './../../shared/_directives/sortable.directive';
import { map, startWith, switchMap, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

// export type SortBy = 'fullName' | 'powers';

export interface Table {
  headers: any[];
}

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
  providers: [NgbRatingConfig]
})
export class HeroesListComponent implements OnInit {

  //heroes: IHero[] = [];
  heroes$: Observable<IHero[]>;
  tableOptions: Table;
  filter = new FormControl('');
  sortableColumnName: string = Sorter.NAME;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private heroService: HeroService,private config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
    this.tableOptions = {
      headers: [
        { name: Sorter.NAME, value: 'Hero Name' },
        { name: Sorter.POWERS, value: 'Powers' },
        { name: Sorter.RATE, value: 'Rate' }
      ]
    };
    this.heroes$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.heroService.search(text))
    );
  }

  ngOnInit(): void {
  }

  toggleSort() {
    this.sortableColumnName === Sorter.NAME ? this.sortableColumnName = Sorter.POWERS : this.sortableColumnName = Sorter.NAME;
  }

  onSort({column, direction}: SortEvent, colName: string) {
    if (colName === column) {
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
      //this.heroService.sortColumn = column;
      //this.heroService.sortDirection = direction;
      this.heroes$ = this.heroes$.pipe(
        debounceTime(10),
        switchMap(() => this.heroService.sortHeroes(column, direction) )
      );
    } else {
      // console.log('not sortable column');
    }
  }

}

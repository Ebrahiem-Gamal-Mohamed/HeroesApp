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

  tableOptions: Table;
  filter = new FormControl('');
  sortableColumnName: string = Sorter.NAME;
  switchValue: boolean = true

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public heroService: HeroService,private config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
    this.tableOptions = {
      headers: [
        { name: Sorter.NAME, value: 'Hero Name', sortable: true },
        { name: Sorter.POWERS, value: 'Powers', sortable: true },
        { name: Sorter.RATE, value: 'Rate', sortable: false }
      ]
    };
    this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.heroService.search(text))
    ).subscribe();
  }

  ngOnInit(): void {
  }

  toggleSort($event) {
    this.sortableColumnName === Sorter.NAME ? this.sortableColumnName = Sorter.POWERS : this.sortableColumnName = Sorter.NAME;
    this.switchValue = $event.checked;
  }

  onSort({column, direction}: SortEvent, colName: string) {
    if (colName === column) {
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
      this.heroService.sortHeroes(column, direction);
    } else {
      // console.log('not sortable column');
    }
  }

}

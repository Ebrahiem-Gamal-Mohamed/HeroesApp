import { SortEvent, NgbdSortableHeader } from './../../shared/_directives/sortable.directive';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { HeroService } from './../hero.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { IHero } from './../hero.model';
import { Sorter } from 'src/app/shared/appEnums';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  sortOptions: Sorter;
  filter = new FormControl('');

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private heroService: HeroService,private config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
    this.tableOptions = {
      headers: [
        { name: 'fullName', value: 'Hero Name' },
        { name: 'powers', value: 'Powers' },
        { name: 'rate', value: 'Rate' }
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
    
  }

  onSort({column, direction}: SortEvent) {
    
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    //this.heroService.sortColumn = column;
    //this.heroService.sortDirection = direction;
    this.heroes$ = this.heroService.sortHeroes(column, direction);
  }

}

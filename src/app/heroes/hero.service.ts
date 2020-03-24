import { Injectable } from '@angular/core';
import { IHero } from './hero.model';
import { Sorter } from 'src/app/shared/appEnums';
import {SortColumn, SortDirection} from './../shared/_directives/sortable.directive';
import { Observable } from 'rxjs/';
import { of } from 'rxjs/internal/observable/of';

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  heroes: IHero[] = [];

  //private _set(patch: Partial<State>) {
  //  Object.assign(this._state, patch);
  //  this._search$.next();
  //}

  constructor() {
    this.initHeros();
  }

  private initHeros(): void {
    this.heroes = [
      {
        id: 1,
        fullName: 'Ahmed Mohammed',
        powers: 'Angular, React and NodeJs',
        profileImage: '',
        description: 'Beutiful',
        rate: 2
      },
      {
        id: 2,
        fullName: 'Mohammed Ahmed',
        powers: 'PHP, Laravel & MySQL',
        profileImage: '',
        description: 'Perfect',
        rate: 3
      },
      {
        id: 3,
        fullName: 'Ebrahiem Mohammed',
        powers: 'Angular, NodeJs, Mongodb & Vue',
        profileImage: '',
        description: 'Beutiful',
        rate: 5
      },
      {
        id: 4,
        fullName: 'Ahmed Ezz',
        powers: 'DotNet, C# and Java',
        profileImage: '',
        description: 'Awesome',
        rate: 4
      }
    ];
    // for(let i = 0; i <= 10; i++) {
    //     this.heroes.push(new Hero(
    //         i+1,
    //         `Ahmed Mohammed ${i+1}`,
    //         'Angular, React and NodeJs',
    //         '',
    //         'Beutiful',
    //         2
    //     ));
    // }
  }

  getHeroes(): IHero[] {
    return [...this.heroes];
  }

  getHero(id: number): IHero {
    return this.heroes.find(item => item.id === id);
  }

  sortHeroes(column: string, direction: string): Observable<IHero[]> {
    //if (option === Sorter.BYNAME) {
      //this.heroes.sort((a, b) => {
        //return a.fullName > b.fullName ? 0 : 1;
      //});
    //} else {
      //this.heroes.sort((a, b) => {
        //return a.powers > b.powers ? 0 : 1;
      //});
    //}
    let heroes: IHero[] = [];
    if (direction === '' || column === '') {
      heroes = this.getHeroes();
    } else {
      heroes = [...this.heroes].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
    }
    return of(heroes);
  }

  search(searchText: string): IHero[] {
    return this.heroes.filter(hero => {
      const term = searchText.toLowerCase();
      return hero.fullName.toLowerCase().includes(term)
            || hero.powers.toLowerCase().includes(term)
    });
  }
}

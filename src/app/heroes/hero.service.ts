import { Injectable } from '@angular/core';
import { IHero } from './hero.model';
import { Sorter } from 'src/app/shared/appEnums';
import { SortColumn, SortDirection } from './../shared/_directives/sortable.directive';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  heroes: IHero[] = [];
  heroes$: Observable<IHero[]>;

  constructor() {
    this.initHeros();
  }

  private initHeros(): void {
    this.heroes = [
      {
        id: 1,
        fullName: 'Ahmed Mohammed',
        powers: 'Angular, React and NodeJs',
        profileImage: 'https://lh3.googleusercontent.com/proxy/rIywYjJ3weGtPN8Tvej_ROCfKvjXwCUeQj_yHnwfeKZixhUBaUDyIq8zbsVyhbinJVpvUom0XCxFHQ-9jFK70w37CkJjSQfJ-P-Rg7OWyGB7Umw5iJmXVEo',
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
        profileImage: 'https://torange.biz/photofx/19/8/image-profile-picture-beautiful-flowers-sunflower-19228.jpg',
        description: 'Beutiful',
        rate: 5
      },
      {
        id: 4,
        fullName: 'Ahmed Ezz',
        powers: 'DotNet, C# and Java',
        profileImage: 'https://image.freepik.com/free-photo/beautiful-profile-kestrel_58409-12462.jpg',
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
    this.heroes$ = of(this.heroes);
  }

  getHeroes(): IHero[] {
    return [...this.heroes];
  }

  getHero(id: number): IHero {
    return this.heroes.find(item => item.id === id);
  }

  sortHeroes(column: string, direction: string) {
    if (direction === '' || column === '') {
      this.heroes$ = of(this.getHeroes());
    } else {
      this.heroes$.pipe(
        map(item => {
          item.sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
          });
        })
      ).subscribe();
    }
  }

  search(searchText: string) {
    of([...this.heroes]).pipe(
      map((items: IHero[]) => {
        const newItems = items.filter((hero: IHero) => {
          const term = searchText.toLowerCase();
          return hero.fullName.toLowerCase().includes(term)
                || hero.powers.toLowerCase().includes(term)
        });
        return newItems;
      })
    ).subscribe(heros => {
      this.heroes$ = of(heros)});
  }
}

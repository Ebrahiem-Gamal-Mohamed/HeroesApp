import { Injectable } from '@angular/core';
import { IHero } from 'src/app/heroes/hero.model';

@Injectable({
  providedIn: 'root'
})
export class FastAccessService {

  constructor() { }

  openModal(hero: IHero, fastAccess) {
    if (fastAccess) {
      fastAccess.options = {
        source: hero.profileImage,
        title: hero.fullName
      }
      fastAccess.display = true;
    }
  }

}

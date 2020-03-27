import { Component, OnInit } from '@angular/core';
import { IHero } from './../hero.model';
import { HeroService } from './../hero.service';
import { ActivatedRoute } from '@angular/router';
import { FastAccessService } from './../../shared/_components/fast-access/fast-access.service';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent implements OnInit {

  hero: IHero;
  heroId: number;

  constructor(
    private heroService: HeroService, 
    private route: ActivatedRoute, 
    public fastAccessService: FastAccessService) {
    this.heroId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.hero = this.heroService.getHero(this.heroId);
  }

}

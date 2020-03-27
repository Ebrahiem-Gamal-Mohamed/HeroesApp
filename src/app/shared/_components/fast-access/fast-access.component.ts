import { Component, OnInit } from '@angular/core';

export interface FastAccessOptions {
  source: string;
  title?: string;
}

@Component({
  selector: 'app-fast-access',
  templateUrl: './fast-access.component.html',
  styleUrls: ['./fast-access.component.scss']
})
export class FastAccessComponent implements OnInit {
  options: FastAccessOptions;
  display: boolean = false;

  constructor() {
    this.options = {
      source: '',
      title: ''
    }
  }

  ngOnInit(): void {
  }

}

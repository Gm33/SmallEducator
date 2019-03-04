import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.less']
})
export class SecureComponent implements OnInit {

  @Input('breadcrumbs') breadcrumbs: string[];

  constructor() { }

  ngOnInit() {
  }

}

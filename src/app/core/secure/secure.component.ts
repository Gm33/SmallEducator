import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.less']
})
export class SecureComponent implements OnInit {

  @Input('breadcrumbs') breadcrumbs: string[];
  @Input('title') title: string;
  @Input('extra') extra: TemplateRef<void>;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  // Currently opened tab index (Student = 0 and Teacher is 1)
  openedTabIndex = 0;

  constructor() { }

  ngOnInit() {
  }

}

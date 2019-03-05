import { Component, OnInit } from '@angular/core';
import { StudentProvider } from "../../providers/student.provider";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  name: string;

  constructor(private studentProvider: StudentProvider,
              private router: Router) {
  }

  /**
   * Method gets called after the component gets initialized, to display the student's name in the scope.
   */
  ngOnInit() {
    this.name = this.studentProvider.student.firstName + this.studentProvider.student.lastName;
  }

  /**
   * Method to remove the entry number from local storage and navigates the user to the login page.
   */
  logout() {
    this.studentProvider.removeEntryNumber();
    this.router.navigate(['/login']);
  }

}

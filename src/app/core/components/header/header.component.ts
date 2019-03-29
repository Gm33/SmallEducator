import { Component, OnInit } from '@angular/core';
import { StudentProvider } from "../../providers/student.provider";
import { Router } from "@angular/router";
import { TeacherProvider } from "../../providers/teacher.provider";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  name: string;

  constructor(private studentProvider: StudentProvider,
              public teacherProvider: TeacherProvider,
              private router: Router) {
  }

  /**
   * Method gets called after the component gets initialized, to display the student's name in the scope.
   */
  ngOnInit() {
    if (this.teacherProvider.isTeacher()) {
      this.name = this.teacherProvider.teacher.firstName + ' ' + this.teacherProvider.teacher.lastName;
    } else {
      this.name = this.studentProvider.student.firstName + ' ' + this.studentProvider.student.lastName;
    }
  }

  /**
   * Method to remove the entry number from local storage and navigates the user to the login page.
   */
  logout() {
    if (this.teacherProvider.isTeacher()) {
      this.teacherProvider.removeTeacherInformation();
    } else {
      this.studentProvider.removeEntryNumber();
    }
    this.router.navigate(['/login']);
  }

}

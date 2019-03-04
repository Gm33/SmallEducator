import { Component, OnInit } from '@angular/core';
import { StudentProvider } from "../../core/providers/student.provider";
import { Student } from "../../core/interfaces/student";

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.less']
})
export class CourseViewComponent implements OnInit {

  student: Student;

  constructor(private studentProvider: StudentProvider) { }

  /**
   * Method gets called after the component gets initialized, then the student gets loaded in the scope to display.
   */
  ngOnInit() {
    this.student = this.studentProvider.student;
  }

}

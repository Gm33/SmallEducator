import { Component, OnInit } from '@angular/core';
import { StudentProvider } from "../../core/providers/student.provider";
import { Student } from "../../core/interfaces/student";
import { TeacherProvider } from "../../core/providers/teacher.provider";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../../core/interfaces/course";

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.less']
})
export class CourseViewComponent implements OnInit {

  course: Course;

  constructor(private studentProvider: StudentProvider,
              private teacherProvider: TeacherProvider,
              private activatedRoute: ActivatedRoute) { }

  /**
   * Method gets called after the component gets initialized, then the student gets loaded in the scope to display.
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (this.teacherProvider.isTeacher()) {
        this.course = this.teacherProvider.teacher.courseList.find(c => c.id === +params['id']);
      } else {
        this.course = this.studentProvider.student.courseList.find(c => c.id === +params['id']);
      }
    });
  }

}

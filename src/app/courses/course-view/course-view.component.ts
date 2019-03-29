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
  breadcrumbs: string[];

  availableStudents: Student[];
  selectedStudents: number[];

  constructor(private studentProvider: StudentProvider,
              private teacherProvider: TeacherProvider,
              private activatedRoute: ActivatedRoute) { }

  /**
   * Method gets called after the component gets initialized, then the student gets loaded in the scope to display.
   */
  ngOnInit() {
    if (this.teacherProvider.isTeacher()) {
      this.activatedRoute.params.subscribe(params => {
        this.course = this.teacherProvider.teacher.courseList.find(c => {
          return c.course.id === +params['id'];
        }).course;
        this.breadcrumbs = ['Courses', this.course.name];

        this.studentProvider.getStudents().subscribe(response => {
          this.availableStudents = response;
          console.log('AVAIL: ', response);
        });
      });
    } else {
      this.course = this.studentProvider.student;
      this.breadcrumbs = [this.course.name];
    }
    // this.activatedRoute.params.subscribe(params => {
    //   if (this.teacherProvider.isTeacher()) {
    //     this.course = this.teacherProvider.teacher.courseList.find(c => c.id === +params['id']);
    //   } else {
    //     this.course = this.studentProvider.student.courseList.find(c => c.id === +params['id']);
    //   }
    // });
  }

}

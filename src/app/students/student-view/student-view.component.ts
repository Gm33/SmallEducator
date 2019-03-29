import { Component, OnInit } from '@angular/core';
import { Student } from "../../core/interfaces/student";
import { StudentProvider } from "../../core/providers/student.provider";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../../core/interfaces/course";
import { CourseProvider } from "../../core/providers/course.provider";
import { TeacherProvider } from "../../core/providers/teacher.provider";

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.less']
})
export class StudentViewComponent implements OnInit {

  student: Student;
  availableCourses: Course[];
  selectedCourses: number[];

  constructor(private studentProvider: StudentProvider,
              private activeRoute: ActivatedRoute,
              private courseProvider: CourseProvider,
              private teacherProvider: TeacherProvider) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(param => {
      this.studentProvider.getStudentById(param['id']).subscribe(response => {
        this.student = response[0].student;
        this.selectedCourses = response[0].courses.map(course => course.id);
        console.log(this.student, this.selectedCourses);
      });
      this.courseProvider.getCourses(this.teacherProvider.teacher.id).subscribe(response => {
        this.availableCourses = response;
      });
    });

  }

  onCoursesChange(event) {
    console.log(event);
  }

}

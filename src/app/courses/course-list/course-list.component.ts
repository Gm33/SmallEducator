import { Component, OnInit } from '@angular/core';
import { StudentProvider } from "../../core/providers/student.provider";
import { TeacherProvider } from "../../core/providers/teacher.provider";
import { Course } from "../../core/interfaces/course";
import { CourseProvider } from "../../core/providers/course.provider";
import { NzMessageService } from "ng-zorro-antd";
import { Router } from "@angular/router";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.less']
})
export class CourseListComponent implements OnInit {

  courses: Course[];

  newCourse: {
    name: string,
    code: string,
    description: string,
  } = {
    name: '',
    code: '',
    description: ''
  };

  isLoading = false;
  inputError = false;

  createCourseModalVisible = false;

  constructor(private studentProvider: StudentProvider,
              public teacherProvider: TeacherProvider,
              private courseProvider: CourseProvider,
              private message: NzMessageService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.teacherProvider.isTeacher()) {
      this.courses = this.teacherProvider.teacher.courseList;
    } else {
      this.courses = this.studentProvider.student.courses;
    }
    console.log('Courses: ', this.courses);
  }

  submitCreateCourse(): void {
    this.isLoading = true;
    if (!this.newCourse.name.length || !this.newCourse.code.length || !this.newCourse.description.length) {
      this.inputError = true;
      this.isLoading = false;
      return;
    }

    // Call the REST API using the Course provider.
    this.courseProvider.createCourse(this.newCourse.name, this.newCourse.code, this.newCourse.description).subscribe(response => {
      // If valid student response then navigate to the secure screen.
      console.log('Response: ', response);
      // this.router.navigate(['/courses']);
      this.isLoading = false;
    }, error => {
      console.log(error);
      // Something went wrong, which can be an internet connection problem or error code from API.
      this.isLoading = false;
      this.message.create('error', 'Something went wrong while logging in, please try again later.');
    });
  }

  openCreateCourseModal(): void {
    this.createCourseModalVisible = true;
  }

  closeCreateCourseModal(): void {
    this.createCourseModalVisible = false;
  }

  /**
   * If the value changes if the number input then this method will be called.
   * The method will remove the error message when the user entered a 10 digit number.
   * @param entryNumber input from the input box.
   */
  onValueChange(entryNumber): void {
    if (this.inputError && this.newCourse.name.length && this.newCourse.code.length && this.newCourse.description.length) {
      this.inputError = false;
    }
  }

}

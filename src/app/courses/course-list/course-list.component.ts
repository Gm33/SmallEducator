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

  isLoading = true;
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
      this.loadTeacherCourses();
    } else {
      this.courses = this.studentProvider.student.courses;
      this.isLoading = false;
    }
  }

  loadTeacherCourses(): void {
    this.courseProvider.getCourses(this.teacherProvider.teacher.id).subscribe(response => {
      console.log(response['courses']);
      this.courses = response['courses'];
      this.teacherProvider.teacher.courses = response['courses'];
      this.isLoading = false;
    }, error => {
      this.message.create('error', 'Oops something went wrong while loading the courses, please try again later.');
    });
  }

  submitCreateCourse(): void {
    this.isLoading = true;
    // If any required value is not set then it returns and shows an error in the create new course form.
    if (!this.newCourse.name.length || !this.newCourse.code.length || !this.newCourse.description.length) {
      this.inputError = true;
      this.isLoading = false;
      return;
    }

    // Call the REST API using the Course provider.
    this.courseProvider.createCourse(this.newCourse.name, this.newCourse.code,
      this.newCourse.description, this.teacherProvider.teacher.id).subscribe(response => {
      // Reload the teachers courses.
      this.loadTeacherCourses();
      // Closes the create modal.
      this.closeCreateCourseModal();
      // Resets the scope variables to empty values.
      this.newCourse = {
        name: '',
        code: '',
        description: ''
      };
      // Sets the loading indicator to false.
      this.isLoading = false;
    }, error => {
      // Something went wrong, which can be an internet connection problem or error code from API.
      this.isLoading = false;
      this.message.create('error', 'Something went wrong while logging in, please try again later.');
    });
  }

  /**
   * Opens the modal to create a new course
   */
  openCreateCourseModal(): void {
    this.createCourseModalVisible = true;
  }

  /**
   * Closes the modal to create a new course
   */
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

  getShortCourseDescription(description: string): string {
    return description.substr(0, 135);
  }

}

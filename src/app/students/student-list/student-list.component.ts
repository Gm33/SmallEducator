import { Component, OnInit } from '@angular/core';
import { Student } from "../../core/interfaces/student";
import { StudentProvider } from "../../core/providers/student.provider";
import { TeacherProvider } from "../../core/providers/teacher.provider";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.less']
})
export class StudentListComponent implements OnInit {

  students: Student[];
  isLoading = true;

  newStudent: {
    name: string,
    mail: string
  } = {
    name: '',
    mail: ''
  };

  inputError = false;
  createStudentModalVisible = false;

  constructor(private studentProvider: StudentProvider,
              private teacherProvider: TeacherProvider,
              public message: NzMessageService) { }

  ngOnInit() {
    if (this.teacherProvider.isTeacher()) {
      this.studentProvider.getStudents().subscribe(response => {
        this.students = response;
        this.isLoading = false;
      }, err => {
        this.message.create('error', 'Something went wrong while logging in, please try again later.');
      });
    }
  }

  // Create student

  /**
   * Opens the modal to create a student.
   */
  openCreateStudentModal(): void {
    this.createStudentModalVisible = true;
  }

  /**
   * Closes the modal to create a student.
   */
  closeCreateStudentModal(): void {
    this.createStudentModalVisible = false;
  }

  /**
   * Method will be called when a teacher presses the submit button to create a student.
   * The method will validate if the entered fields are not empty.
   */
  submitCreateStudent(): void {
    this.isLoading = true;

    // If any required value is not set then it returns and shows an error in the create new student form.
    if (!this.newStudent.name.length || !this.newStudent.mail.length) {
      this.inputError = true;
      this.isLoading = false;
      return;
    }

    // Loop through students to see if any mail matches the newly given mail address. If so, show an error.
    this.students.forEach(student => {
      if (student.student.mailAddress == this.newStudent.mail) {
        this.inputError = true;
        this.isLoading = false;
        return this.message.error('The given mail address does already exists, please modify and try again.');
      }
    });
  }

  /**
   * If the value changes if the number input then this method will be called.
   * The method will remove the error message when the required fields are entered.
   */
  onValueChange(): void {
    if (this.inputError && this.newStudent.name.length && this.newStudent.mail.length) {
      this.inputError = false;
    }
  }

}

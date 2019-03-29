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

}

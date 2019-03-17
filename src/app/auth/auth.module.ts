import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { StudentLoginComponent } from "./login/student-login/student-login.component";
import { TeacherLoginComponent } from "./login/teacher-login/teacher-login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
  declarations: [
    LoginComponent,
    StudentLoginComponent,
    TeacherLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ]
})
export class AuthModule { }

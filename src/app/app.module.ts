import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { CourseViewComponent } from './courses/course-view/course-view.component';
import { StudentProvider } from "./core/providers/student.provider";
import { SecureComponent } from './core/secure/secure.component';
import { AuthGuard } from "./core/guards/auth-guard";
import { AuthModule } from "./auth/auth.module";
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseCreateComponent } from './courses/course-create/course-create.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StudentsComponent } from './students/students.component';
import { StudentListComponent } from './students/student-list/student-list.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CourseViewComponent,
    SecureComponent,
    CourseListComponent,
    CourseCreateComponent,
    StudentsComponent,
    StudentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    StudentProvider,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

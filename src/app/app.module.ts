import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { CourseViewComponent } from './courses/course-view/course-view.component';
import { StudentLoginComponent } from './auth/student-login/student-login.component';
import { StudentProvider } from "./core/providers/student.provider";
import { SecureComponent } from './core/secure/secure.component';
import { AuthGuard } from "./core/guards/auth-guard";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CourseViewComponent,
    StudentLoginComponent,
    SecureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
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

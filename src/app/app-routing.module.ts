import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./core/guards/auth-guard";
import { CourseViewComponent } from "./courses/course-view/course-view.component";
import { LoginComponent } from "./auth/login/login.component";
import { CourseListComponent } from "./courses/course-list/course-list.component";
import { StudentListComponent } from "./students/student-list/student-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'courses', component: CourseListComponent},
      {path: 'courses/:id', component: CourseViewComponent},
      {path: 'students', component: StudentListComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

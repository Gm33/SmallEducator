import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentLoginComponent } from "./auth/student-login/student-login.component";
import { AuthGuard } from "./core/guards/auth-guard";
import { CourseViewComponent } from "./courses/course-view/course-view.component";
import { SecureComponent } from "./core/secure/secure.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'course', component: CourseViewComponent }
    ]
  },
  { path: 'login', component: StudentLoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

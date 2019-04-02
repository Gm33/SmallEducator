import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StudentProvider } from "../providers/student.provider";
import { Observable, of } from "rxjs/index";
import { map } from "rxjs/internal/operators";
import { TeacherProvider } from "../providers/teacher.provider";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public studentProvider: StudentProvider,
              public teacherProvider: TeacherProvider,
              public router: Router) {
  }

  /**
   * This function checks if the client has a valid entry code stored. If so then the user can access the secure page(s)
   * @returns {boolean}
   */
  canActivate(): Observable<boolean> {
    // Check if authenticated, if not then redirect to login page.
    if (!this.studentProvider.isAuthenticated() && !this.teacherProvider.isAuthenticated()) {
      this.router.navigate(['login']);
      return of(false);
    }
    // Check if student variable is already in provider, if so then let through (happens after login).
    if (this.studentProvider.student || this.teacherProvider.teacher) {
      return of(true);
    }

    // If a teacher profile can be loaded, then allow to continue
    if (localStorage.getItem(this.teacherProvider.smTeacherInfo) !== null && this.teacherProvider.loadTeacherProfile()) {
      return of(true);
    } else {
      // Log student in by using the stored entry code.
      return this.studentProvider.loadStudentProfile().pipe(map(response => {
        return response['success']
      }));
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs/index";
import { delay, map } from "rxjs/internal/operators";
import { Teacher } from "../interfaces/teacher";
import { Student } from "../interfaces/student";

@Injectable({
  providedIn: 'root'
})
export class TeacherProvider {

  // Variable name for local storage
  private smTeacherInfo = 'smTeacherInfo';
  private apiUrl = 'tijmen.dev:1050/api/teacher/';
  public teacher: Teacher;

  constructor(private http: HttpClient) {
  }

  /**
   * HTTP Method to post username and password to the REST API which returns a teacher model (if valid credentials)
   * @param {number} entryNumber
   * @returns {Observable<Student>}
   */
  signIn(username: string, password: string): Observable<Teacher> {
    return of<Teacher>({
      id: 1,
      firstName: 'Gijs',
      lastName: 'Min',
      mailAddress: 'gijs.min@hva.nl',
      courseList: [{
        id: 123,
        courseName: 'Architecture & Design',
        courseCode: 'AAD123',
        courseDescription: "The course of Architecture and Design is about explaining the design choices that must be" +
        "made while designing a software system.\n\n" +
        "Students work in groups to solve a real-life problem. This problem is presented in a case" +
        "study.\nThe focus points of the solution are the wishes of the stakeholders, functional " +
        "requirements, software quality attributes, and design patterns.",
        teacher: {
          id: 1,
          firstName: 'Gijs',
          lastName: 'Min',
          mailAddress: 'gijs.min@hva.nl'
        },
        students: []
      }]
    }).pipe(delay(500))
      .pipe(map((e: Teacher) => {
        // If valid login, store teacher model to local storage.
        console.log('ehh?', e);
        if (e.id) {
          this.teacher = e;
          this.storeTeacherInformation(e);
        }
        return e;
      }));

    return this.http.post(this.apiUrl + '/login', {
      username: username,
      password: password
    }).pipe(map((e: Teacher) => {
      // If valid login, store teacher model to local storage.
      if (e.id) {
        this.teacher = e;
        this.storeTeacherInformation(e);
      }
      return e;
    }));
  }

  /**
   * Method to validate if an model is in scope or in local storage.
   * If the teacher's model has been found then it checks if the id is set.
   * only then it returns true (authenticated);
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    return this.teacher !== undefined || localStorage.getItem(this.smTeacherInfo) !== undefined &&
      (<Teacher>JSON.parse(localStorage.getItem(this.smTeacherInfo))).id !== undefined;
  }

  /**
   * Loads the teacher profile, this method is called when an teacher model is stored in the local storage and
   * if the page gets refreshed. This way the user can only access the secure page with a valid stored teacher model.
   * @returns {Observable<Student>}
   */
  loadTeacherProfile(): Teacher | false {
    const teacher = <Teacher>JSON.parse(localStorage.getItem(this.smTeacherInfo));
    if (teacher && teacher.id) {
      this.teacher = teacher;
      return teacher;
    }
    return false;
  }

  /**
   * Stored the teacher model in the local storage.
   * @param {number} entryNumber
   */
  storeTeacherInformation(teacher: Teacher): void {
    localStorage.setItem(this.smTeacherInfo, JSON.stringify(teacher));
  }

  isTeacher(): boolean {
    return this.teacher && this.teacher.id !== undefined;
  }

  /**
   * Removes the stored teacher information from the local storage.
   */
  removeTeacherInformation(): void {
    localStorage.removeItem(this.smTeacherInfo);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { map } from "rxjs/internal/operators";
import { Teacher } from "../interfaces/teacher";
import { Student } from "../interfaces/student";
import { SecurityProvider } from "./security.provider";

@Injectable({
  providedIn: 'root'
})
export class TeacherProvider {

  // Variable name for local storage
  private smTeacherInfo = 'smTeacherInfo';
  private apiUrl = 'https://api.bscripts.dev/smalleducator-api/teacher';
  public teacher: Teacher;

  constructor(private http: HttpClient, private securityProvider: SecurityProvider) {
  }

  /**
   * HTTP Method to post username and password to the REST API which returns a teacher model (if valid credentials)
   * @param {number} entryNumber
   * @returns {Observable<Student>}
   */
  signIn(username: string, password: string): Observable<Teacher> {
    return this.http.get(this.apiUrl + '/login/' + username + '/' + password).pipe(map((e: Teacher) => {
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
      this.loadTeacherInformation().id !== undefined;
  }

  /**
   * Loads the teacher profile, this method is called when an teacher model is stored in the local storage and
   * if the page gets refreshed. This way the user can only access the secure page with a valid stored teacher model.
   * @returns {Observable<Student>}
   */
  loadTeacherProfile(): Teacher | false {
    const teacher = this.loadTeacherInformation();
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
    localStorage.setItem(this.smTeacherInfo, this.securityProvider.encryptData(teacher));
  }

  /**
   * Loads the teacher model from the local storage and decrypts it.
   * @returns {Teacher}
   */
  loadTeacherInformation(): Teacher {
    return <Teacher>this.securityProvider.decryptData(localStorage.getItem(this.smTeacherInfo));
  }

  isTeacher(): boolean {
    return this.teacher && this.teacher.id !== undefined;
  }

  /**
   * Removes the stored teacher information from the local storage.
   */
  removeTeacherInformation(): void {
    localStorage.removeItem(this.smTeacherInfo);
    this.teacher = null;
  }
}

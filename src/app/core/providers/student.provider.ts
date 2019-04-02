import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs/index";
import { delay, map } from "rxjs/internal/operators";
import { Student } from "../interfaces/student";

@Injectable({
  providedIn: 'root'
})
export class StudentProvider {

  private smEntryNumber = 'smEntryNumber';
  private apiUrl = 'http://api.smalleducator.test/api/students';
  public student: Student;

  constructor(private http: HttpClient) {
  }

  /**
   * HTTP Method to post entry number to the REST API which returns a student (if valid entry number)
   * @param {number} entryNumber
   * @returns {Observable<Student>}
   */
  signInWithEntryNumber(entryNumber: string): Observable<Student> {
    return this.http.post(this.apiUrl + '/login', {
      entryNumber: entryNumber
    }).pipe(map((e: Student) => {
      // If valid login, store entry number and save returned student in scope.
      if (e['success']) {
        this.student = e['student'];
        this.storeEentryNumber(entryNumber);
      }
      return e;
    }));
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl + '/' + id);
  }

  /**
   * HTTP Method to post course information to the REST API which returns a course model (if course created)
   * @param {number} entryNumber
   * @returns {Observable<Student>}
   */
  createStudent(firstName: string, lastName: string,  mailAddress: string): Observable<Object> {
    return this.http.post(this.apiUrl, {
      firstName: firstName,
      lastName: lastName,
      mailAddress: mailAddress
    });
  }

  attachCourses(studentId: string, courses: number[]): Observable<Object> {
    return this.http.post(this.apiUrl + '/courses/' + studentId, {
      courses: courses
    });
  }


  /**
   * Method to validate if an entry number has been stored into the local storage of the browser.
   * If the entry number has been found then it checks if it's a 10 digit number,
   * only then it returns true (authenticated);
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    return localStorage.getItem(this.smEntryNumber) && localStorage.getItem(this.smEntryNumber).match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/) !== null;
    // localStorage.getItem(this.smEntryNumber).match(/^\d{10}$/) !== null;
  }

  /**
   * Loads the student profile, this method is called when an entry number is stored in the local storage and
   * if the page gets refreshed. This way the user can only access the secure page with a valid and active entry number.
   * @returns {Observable<Student>}
   */
  loadStudentProfile(): Observable<Student> {
    return this.signInWithEntryNumber(localStorage.getItem(this.smEntryNumber));
  }

  /**
   * Stored the entry number in the local storage.
   * @param {number} entryNumber
   */
  storeEentryNumber(entryNumber: string): void {
    localStorage.setItem(this.smEntryNumber, entryNumber);
  }

  /**
   * Removes the stored entry number from the local storage.
   */
  removeEntryNumber(): void {
    localStorage.removeItem(this.smEntryNumber);
    this.student = null;
  }
}

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
  private apiUrl = 'https://api.smalleducator.com/';
  public student: Student;

  constructor(private http: HttpClient) {
  }

  /**
   * HTTP Method to post entry number to the REST API which returns an student (if valid entry number)
   * @param {number} entryNumber
   * @returns {Observable<Student>}
   */
  signInWithEntryNumber(entryNumber: number): Observable<Student> {
    return of<Student>({
      id: 1,
      name: 'Gijs Min',
      course: {
        name: 'Architecture & Design',
        description: "The course of Architecture and Design is about explaining the design choices that must be" +
        "made while designing a software system.\n\n" +
        "Students work in groups to solve a real-life problem. This problem is presented in a case" +
        "study.\nThe focus points of the solution are the wishes of the stakeholders, functional " +
        "requirements, software quality attributes, and design patterns."
      }
    }).pipe(delay(500))
      .pipe(map((e: Student) => {
        // If valid login, store entry number and save returned student in scope.
        if (e.id) {
          this.student = e;
          this.storeEentryNumber(entryNumber);
        }
        return e;
      }));

    return this.http.post(this.apiUrl, {
      entryNumber: entryNumber
    }).pipe(map((e: Student) => {
      // If valid login, store entry number and save returned student in scope.
      if (e.id) {
        this.student = e;
        this.storeEentryNumber(entryNumber);
      }
      return e;
    }));
  }

  /**
   * Method to validate if an entry number has been stored into the local storage of the browser.
   * If the entry number has been found then it checks if it's a 10 digit number,
   * only then it returns true (authenticated);
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    return localStorage.getItem(this.smEntryNumber) && localStorage.getItem(this.smEntryNumber).match(/^\d{10}$/) !== null;
  }

  /**
   * Loads the student profile, this method is called when an entry number is stored in the local storage and
   * if the page gets refreshed. This way the user can only access the secure page with a valid and active entry number.
   * @returns {Observable<Student>}
   */
  loadStudentProfile(): Observable<Student> {
    return this.signInWithEntryNumber(+localStorage.getItem(this.smEntryNumber));
  }

  /**
   * Stored the entry number in the local storage.
   * @param {number} entryNumber
   */
  storeEentryNumber(entryNumber: number): void {
    localStorage.setItem(this.smEntryNumber, "" + entryNumber);
  }

  /**
   * Removes the stored entry number from the local storage.
   */
  removeEntryNumber(): void {
    localStorage.removeItem(this.smEntryNumber);
  }
}

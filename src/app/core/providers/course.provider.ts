import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs/index";
import { delay, map } from "rxjs/internal/operators";
import { Teacher } from "../interfaces/teacher";
import { Student } from "../interfaces/student";

@Injectable({
  providedIn: 'root'
})
export class CourseProvider {

  // Variable name for local storage
  private smTeacherInfo = 'smTeacherInfo';
  private apiUrl = 'tijmen.dev:1050/api/course/';
  public teacher: Teacher;

  constructor(private http: HttpClient) {
  }

  /**
   * HTTP Method to post course information to the REST API which returns a course model (if course created)
   * @param {number} entryNumber
   * @returns {Observable<Student>}
   */
  createCourse(name: string, code: string, description: string): Observable<Object> {
    return this.http.post(this.apiUrl, {
      name: name,
      code: code,
      description: description
    });
  }
}

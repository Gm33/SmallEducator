import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { Teacher } from "../interfaces/teacher";
import { Student } from "../interfaces/student";
import { Course } from "../interfaces/course";

@Injectable({
  providedIn: 'root'
})
export class CourseProvider {

  // Variable name for local storage
  private smTeacherInfo = 'smTeacherInfo';
  private apiUrl = 'http://145.28.145.221:8080/smalleducator_api_war/course';
  public teacher: Teacher;

  constructor(private http: HttpClient) {
  }

  getCourses(teacherId: number): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl + '/teacher/' + teacherId);
  }

  /**
   * HTTP Method to post course information to the REST API which returns a course model (if course created)
   * @param {number} entryNumber
   * @returns {Observable<Student>}
   */
  createCourse(name: string, code: string, description: string, teacherId: number): Observable<Object> {
    return this.http.post(this.apiUrl + '/create', {
      name: name,
      code: code,
      teacherId: teacherId,
      description: description
    });
  }
}

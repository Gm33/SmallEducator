import { Component, OnInit } from '@angular/core';
import { StudentProvider } from "../../core/providers/student.provider";
import { Student } from "../../core/interfaces/student";
import { TeacherProvider } from "../../core/providers/teacher.provider";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.less']
})
export class CourseViewComponent implements OnInit {

  course: any;
  breadcrumbs: string[];

  availableStudents: Student[];
  selectedStudents: number[];

  students: any[];
  lessons: {
    number: number,
    title: string,
    value: string
  }[] = [];

  constructor(private studentProvider: StudentProvider,
              private teacherProvider: TeacherProvider,
              private activatedRoute: ActivatedRoute) {
  }

  /**
   * Method gets called after the component gets initialized, then the student gets loaded in the scope to display.
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (this.teacherProvider.isTeacher()) {
        this.course = this.teacherProvider.teacher.courses.find(c => {
          return c.id == params['id'];
        });
        this.breadcrumbs = ['Courses', this.course.name];

        this.studentProvider.getStudents().subscribe(response => {
          this.availableStudents = response;
        });
      } else {
        this.course = this.studentProvider.student.courses.find(c => {
          return c.id == params['id'];
        });
      }
      this.breadcrumbs = [this.course.name];
    });

    // Dummy
    this.getCourseLessons();
  }

  // Dummy data
  getCourseLessons(): void {
    for (let i = 1; i < (Math.floor(Math.random() * 6) + 1); ++i) {
      this.lessons.push({
        number: i,
        title: this.course.name + ' week ' + i,
        value: i % 2 ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' :
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
      });
    }
  }

}

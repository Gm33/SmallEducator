/**
 * Interface for the student model.
 */
import { Course } from "./course";

export interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  mailAddress: string;
  student?: any;

  courses?: Course[];
  courseList?: Course[];
}

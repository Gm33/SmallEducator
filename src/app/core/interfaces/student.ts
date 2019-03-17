/**
 * Interface for the student model.
 */
import { Course } from "./course";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;

  courses?: Course[];
  courseList?: Course[];
}

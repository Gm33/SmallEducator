/**
 * Interface for the teacher model.
 */
import { Course } from "./course";

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  mailAddress: string;

  courses: Course[];
}

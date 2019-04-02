/**
 * Interface for the student model.
 */
import { Course } from "./course";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  mailAddress: string;

  courses?: Course[];
}

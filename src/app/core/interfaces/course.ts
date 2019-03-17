/**
 * Interface for the course model.
 */
import { Teacher } from "./teacher";
import { Student } from "./student";

export interface Course {
  id: number;
  courseName: string;
  courseCode: string;
  courseDescription: string;

  teacher?: Teacher;
  students?: Student[];
}

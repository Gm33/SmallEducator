/**
 * Interface for the course model.
 */
import { Teacher } from "./teacher";
import { Student } from "./student";

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;

  teacher?: Teacher;
  students?: Student[];
}

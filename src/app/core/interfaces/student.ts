/**
 * Interface for the student model.
 */
export interface Student {
  id: number;
  name: string;

  course?: {
    name: string;
    description: string;
  }
}

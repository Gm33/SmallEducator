/**
 * Interface for the teacher model.
 */
export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  mailAddress: string;

  courseList: any[];
}

import { FormControl, FormGroup } from '@angular/forms';

export interface IStudent {
  studentNumber: number;
  firstName: string;
  lastName: string;
  fullName: string;
  classNumber: number;
}

export interface ICreateStudent {
  firstName: string;
  lastName: string;
  classNumber: number;
}

export type CreateStudentForm = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  classNumber: FormControl<number>;
}>;

export interface IUpdateStudent extends ICreateStudent {
  studentNumber: number;
}

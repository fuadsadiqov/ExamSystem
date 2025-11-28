import { FormControl, FormGroup } from "@angular/forms";

export interface IExam {
  id: number;
  subjectCode: string;
  studentNumber: number;
  score: number;
  examDate: number;
}

export interface ICreateExam {
  subjectCode: string;
  studentNumber: number;
  score: number;
}

export type CreateExamForm = FormGroup<{
  subjectCode: FormControl<string>;
  studentNumber: FormControl<number>;
  score: FormControl<number>;
}>;

export interface IUpdateExam extends ICreateExam {
  id: number;
}
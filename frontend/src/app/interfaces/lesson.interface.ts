import { FormControl, FormGroup } from '@angular/forms';

export interface ILesson {
  subjectCode: string;
  subjectName: string;
  teacherFirstName: string;
  teacherLastName: string;
  teacherFullName: string;
  classNumber: number;
}

export interface ICreateLesson {
  subjectCode: string;
  subjectName: string;
  teacherFirstName: string;
  teacherLastName: string;
  classNumber: number;
}

export type CreateLessonForm = FormGroup<{
  subjectCode: FormControl<string>;
  subjectName: FormControl<string>;
  teacherFirstName: FormControl<string>;
  teacherLastName: FormControl<string>;
  classNumber: FormControl<number>;
}>;

export interface IUpdateLesson extends ICreateLesson {}

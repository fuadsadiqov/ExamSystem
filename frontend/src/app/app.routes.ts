import { Routes } from '@angular/router';
import { Student } from './views/student/student';
import { Lesson } from './views/lesson/lesson';
import { Exam } from './views/exam/exam';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full',
      },
      {
        path: 'students',
        component: Student,
      },
      {
        path: 'lesson',
        component: Lesson,
      },
      {
        path: 'exam',
        component: Exam,
      },
    ],
  },
];

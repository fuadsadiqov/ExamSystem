export const STUDENT_URLS = {
  GET_ALL: 'students',
  GET_ONE: (id: number) => `students/${id}`,
  ADD: 'students',
  EDIT: (id: number) => `students/${id}`,
  DELETE: (id: number) => `students/${id}`,
};

export const LESSON_URLS = {
  GET_ALL: 'subjects',
  ADD: 'subjects',
  EDIT: (id: string) => `subjects/${id}`,
  DELETE: (id: string) => `subjects/${id}`,
};

export const EXAM_URLS = {
  GET_ALL: 'exams',
  ADD: 'exams',
  EDIT: (id: number) => `exams/${id}`,
  DELETE: (id: number) => `exams/${id}`,
};

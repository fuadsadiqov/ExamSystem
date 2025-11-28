import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ExamService } from '../../../services/exam.service';
import { CreateExamForm, ICreateExam, IExam, IUpdateExam } from '../../../interfaces/exam.interface';
import { LessonService } from '../../../services/lesson.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'add-edit',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit.html',
  styleUrl: './add-edit.scss',
})
export class AddEdit {
  public exam = input<IExam | null>(null);
  public onCloseOutput = output<boolean | null>();
  private fb = inject(FormBuilder);
  public lessons: { title: string, value: string }[] = [];
  public students: { title: string, value: number }[] = [];

  private subscription$: Subscription | undefined;

  public formGroup: CreateExamForm = this.fb.group({
    subjectCode: this.fb.control('', { nonNullable: true }),
    studentNumber: this.fb.control(0, { nonNullable: true }),
    score: this.fb.control(0, { nonNullable: true }),
  });

  constructor(private examService: ExamService, private lessonService: LessonService, private studentService: StudentService) { }

  public onClose() {
    this.onCloseOutput.emit(null);
  }

  public onSubmit() {
    if (this.formGroup.invalid) return;

    const isEdit = this.exam() !== null;
    if (!isEdit) {
      const body: ICreateExam = this.formGroup.getRawValue();
      this.subscription$ = this.examService.create(body).subscribe({
        next: (res) => {
          this.onClose();
        },
      });
    } else {
      const id = this.exam()!.id;

      const body: IUpdateExam = { id, ...this.formGroup.getRawValue() };
      this.subscription$ = this.examService.update(body).subscribe({
        next: (res) => {
          this.onClose();
        },
      });
    }
  }

  getLessons() {
    this.lessonService.getAll().subscribe({
      next: (res) => this.lessons = res.map(lesson => ({ title: lesson.subjectName, value: lesson.subjectCode }))
    })
  }

  getStudents() {
    this.studentService.getAll().subscribe({
      next: (res) => this.students = res.map(student => ({ title: student.fullName, value: student.studentNumber }))
    })
  }

  ngOnInit() {
    this.getLessons();
    this.getStudents();

    if (this.exam()) {
      const exam = this.exam()!;

      this.formGroup.patchValue({
        subjectCode: exam.subjectCode,
        studentNumber: exam.studentNumber,
        score: exam.score,
      })

    }
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}

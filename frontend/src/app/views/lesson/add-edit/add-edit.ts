import { Component, inject, input, output } from '@angular/core';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CreateLessonForm, ICreateLesson, ILesson, IUpdateLesson } from '../../../interfaces/lesson.interface';
import { LessonService } from '../../../services/lesson.service';

@Component({
  selector: 'add-edit',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit.html',
  styleUrl: './add-edit.scss',
})
export class AddEdit {
  private lessonService = inject(LessonService);
  public lesson = input<ILesson | null>(null);
  public onCloseOutput = output<boolean | null>();
  private fb = inject(FormBuilder);

  private subscription$: Subscription | undefined;

  public formGroup: CreateLessonForm = this.fb.group({
    subjectCode: this.fb.control('', { nonNullable: true }),
    subjectName: this.fb.control('', { nonNullable: true }),
    teacherFirstName: this.fb.control('', { nonNullable: true }),
    teacherLastName: this.fb.control('', { nonNullable: true }),
    classNumber: this.fb.control(0, { nonNullable: true }),
  });

  public onClose() {
    this.onCloseOutput.emit(null);
  }

  public onSubmit() {
    if (this.formGroup.invalid) return;

    const isEdit = this.lesson() !== null;
    if (!isEdit) {
      const body: ICreateLesson = this.formGroup.getRawValue();
      this.subscription$ = this.lessonService.create(body).subscribe({
        next: (res) => {
          this.onClose();
        },
      });
    } else {
      const subjectCode = this.lesson()?.subjectCode!;

      const body: IUpdateLesson = { ...this.formGroup.getRawValue() };
      this.subscription$ = this.lessonService.update(subjectCode, body).subscribe({
        next: (res) => {
          this.onClose();
        },
      });
    }
  }

  ngOnInit() {
    if(this.lesson()){
      const lesson = this.lesson()!;

      this.formGroup.patchValue({
        subjectCode: lesson.subjectCode,
        subjectName: lesson.subjectName,
        teacherFirstName: lesson.teacherFirstName,
        teacherLastName: lesson.teacherLastName,
        classNumber: lesson.classNumber,
      })
    }
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}

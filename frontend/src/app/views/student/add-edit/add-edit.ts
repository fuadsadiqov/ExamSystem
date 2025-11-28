import { Component, inject, input, output } from '@angular/core';
import {
  CreateStudentForm,
  ICreateStudent,
  IStudent,
  IUpdateStudent,
} from '../../../interfaces/student.interface';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../services/student.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'add-edit',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit.html',
  styleUrl: './add-edit.scss',
})
export class AddEdit {
  private studentService = inject(StudentService);
  public student = input<IStudent | null>(null);
  public onCloseOutput = output<boolean | null>();
  private fb = inject(FormBuilder);

  private subscription$: Subscription | undefined;

  public formGroup: CreateStudentForm = this.fb.group({
    firstName: this.fb.control('', { nonNullable: true }),
    lastName: this.fb.control('', { nonNullable: true }),
    classNumber: this.fb.control(0, { nonNullable: true }),
  });

  public onClose() {
    this.onCloseOutput.emit(null);
  }

  public onSubmit() {
    if (this.formGroup.invalid) return;

    const isEdit = this.student() !== null;
    if (!isEdit) {
      const body: ICreateStudent = this.formGroup.getRawValue();
      this.subscription$ = this.studentService.create(body).subscribe({
        next: (res) => {
          this.onClose();
        },
      });
    } else {
      const studentNumber = this.student()!.studentNumber;

      const body: IUpdateStudent = { studentNumber, ...this.formGroup.getRawValue() };
      this.subscription$ = this.studentService.update(body).subscribe({
        next: (res) => {
          this.onClose();
        },
      });
    }
  }

  ngOnInit() {
    if(this.student()){
      this.formGroup.patchValue({
        firstName: this.student()?.firstName,
        lastName: this.student()?.lastName,
        classNumber: this.student()?.classNumber,
      })
    }
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}

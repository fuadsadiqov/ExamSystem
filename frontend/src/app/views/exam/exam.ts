import { Component } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { Modal } from '../../components/modal/modal';
import { Table } from '../../components/table/table';
import { AddEdit } from './add-edit/add-edit';
import { IExam } from '../../interfaces/exam.interface';

@Component({
  selector: 'exam',
  imports: [Modal, Table, AddEdit],
  templateUrl: './exam.html',
  styleUrl: './exam.scss',
})
export class Exam {
  isModalOpen: boolean = false;
  selectedExam: IExam | null = null;

  columns: { key: string; title: string }[] = [{ key: 'subjectName', title: 'Subject' }, { key: "studentName", title: "Student" }];
  rows: any[] = [];

  constructor(private examService: ExamService) { }
  onAddBtnClick() {
    this.isModalOpen = true;
  }

  onEditOutput(row: IExam) {
    this.selectedExam = row;
    this.isModalOpen = true;
  }

  onDeleteOutput(row: IExam) {
    this.examService.delete(row.id).subscribe({
      next: (res) => {
        this.getAllExams();
      }
    })
  }


  onModalClose() {
    this.isModalOpen = false;
  }

  onSaveClose() {
    this.onModalClose();
    this.getAllExams();
  }

  getAllExams() {
    this.examService.getAll().subscribe({
      next: (exams) => {
        if (exams.length) {
          this.rows = exams;
        }
      },
    });
  }

  ngOnInit() {
    this.getAllExams();
  }
}

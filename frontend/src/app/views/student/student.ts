import { Component } from '@angular/core';
import { Modal } from '../../components/modal/modal';
import { Table } from '../../components/table/table';
import { StudentService } from '../../services/student.service';
import { AddEdit } from './add-edit/add-edit';
import { IStudent } from '../../interfaces/student.interface';

@Component({
  selector: 'student',
  imports: [Modal, Table, AddEdit],
  templateUrl: './student.html',
  styleUrl: './student.scss',
})
export class Student {
  isModalOpen: boolean = false;
  selectedStudent: IStudent | null = null

  columns: { key: string; title: string }[] = [{ key: 'name', title: 'Name' }, {key: 'studentNumber', title: "Student number"}, { key: 'classNumber', title: 'Class Number'}];
  rows: { name: string }[] = [];

  constructor(private studentService: StudentService) {}
  onAddBtnClick() {
    this.isModalOpen = true;
  }

  onEditOutput(row: IStudent) {
    this.selectedStudent = row;
    this.isModalOpen = true;
  }

  onDeleteOutput(row: IStudent) {
    this.studentService.delete(row.studentNumber).subscribe({
      next: (res) => {
        this.getAllStudents();
      }
    })
  }

  onModalClose() {
    this.isModalOpen = false;
  }

  onSaveClose() {    
    this.onModalClose();
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getAll().subscribe({
      next: (students) => {
        if (students.length) {
          this.rows = students.map((student) => ({ 
            firstName: student.firstName,
            lastName: student.lastName,
            name: student.fullName,
            studentNumber: student.studentNumber,
            classNumber: student.classNumber
          }));
        }else{
          this.rows = [];
        }
      },
    });
  }

  ngOnInit() {
    this.getAllStudents();
  }
}

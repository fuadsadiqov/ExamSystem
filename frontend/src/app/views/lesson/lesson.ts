import { Component } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { Modal } from '../../components/modal/modal';
import { Table } from '../../components/table/table';
import { AddEdit } from './add-edit/add-edit';
import { ILesson } from '../../interfaces/lesson.interface';

@Component({
  selector: 'lesson',
  imports: [Modal, Table, AddEdit],
  templateUrl: './lesson.html',
  styleUrl: './lesson.scss',
})
export class Lesson {
  isModalOpen: boolean = false;
  selectedLesson: ILesson | null = null

  columns: { key: string; title: string }[] = [{ key: 'subjectName', title: 'Name' }, { key: 'subjectCode', title: "Subject code"}];
  rows: ILesson[] = [];

  constructor(private lessonService: LessonService) {}
  onAddBtnClick() {
    this.isModalOpen = true;
  }

  onEditOutput(row: ILesson) {
    this.selectedLesson = row;
    this.isModalOpen = true;
  }

  onDeleteOutput(row: ILesson) {
    this.lessonService.delete(row.subjectCode).subscribe({
      next: (res) => {
        this.getAllLessons();
      }
    })
  }

  onModalClose() {
    this.isModalOpen = false;
  }

  onSaveClose() {
    this.onModalClose();
    this.getAllLessons();
  }

  getAllLessons() {
    this.lessonService.getAll().subscribe({
      next: (lessons) => {
        this.rows = [...lessons]
      },
    });
  }

  ngOnInit() {
    this.getAllLessons();
  }
}

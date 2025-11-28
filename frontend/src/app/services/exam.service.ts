import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EXAM_URLS, STUDENT_URLS } from '../constants/url';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { IStudent } from '../interfaces/student.interface';
import { ICreateExam, IExam, IUpdateExam } from '../interfaces/exam.interface';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private url = EXAM_URLS;
  constructor(private http: HttpClient) {}

  getAll(): Observable<IExam[]> {
    return this.http.get<IExam[]>(environment.apiUrl + this.url.GET_ALL)
  }

  create(body: ICreateExam) {
    return this.http.post(environment.apiUrl + this.url.ADD, body);
  }

  update(body: IUpdateExam) {
    return this.http.put(environment.apiUrl + this.url.EDIT(body.id), body);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + this.url.DELETE(id));
  }
}

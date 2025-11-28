import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LESSON_URLS } from '../constants/url';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { ICreateLesson, ILesson, IUpdateLesson } from '../interfaces/lesson.interface';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private url = LESSON_URLS;
  constructor(private http: HttpClient) {}

  getAll(): Observable<ILesson[]> {
    return this.http
      .get<ILesson[]>(environment.apiUrl + this.url.GET_ALL)
  }

  create(body: ICreateLesson) {
    return this.http.post(environment.apiUrl + this.url.ADD, body);
  }

  update(subjectCode: string, body: IUpdateLesson) {
    return this.http.put(environment.apiUrl + this.url.EDIT(subjectCode), body);
  }

  delete(id: string) {
    return this.http.delete(environment.apiUrl + this.url.DELETE(id));
  }
}

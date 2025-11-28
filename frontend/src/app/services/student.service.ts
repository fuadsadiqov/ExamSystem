import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STUDENT_URLS } from '../constants/url';
import { map, Observable } from 'rxjs';
import { ICreateStudent, IStudent, IUpdateStudent } from '../interfaces/student.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url = STUDENT_URLS;
  constructor(private http: HttpClient) {}

  getAll(): Observable<IStudent[]> {
    return this.http
      .get<IStudent[]>(environment.apiUrl + this.url.GET_ALL)
      .pipe(map((res) => res.map((st) => ({ ...st, fullName: st.firstName + ' ' + st.lastName }))));
  }

  create(body: ICreateStudent) {
    return this.http.post(environment.apiUrl + this.url.ADD, body);
  }

  update(body: IUpdateStudent) {
    return this.http.put(environment.apiUrl + this.url.EDIT(body.studentNumber), body);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + this.url.DELETE(id));
  }
}

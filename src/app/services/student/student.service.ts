import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { studentModel } from '../../models/studentModel';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  createStudent(user: studentModel): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/registration/register`, user);
  }

  getAllStudent(): Observable<studentModel[]> {
    return this.http.get<{ data: studentModel[], status: string, message: string }>(`${this.baseUrl}/user/role/student`).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateStudent(email: string, updateData: studentModel): Observable<any> {
    return this.http.put<{ status: string, message: string }>(`${this.baseUrl}/user/role/student/email/${email}`, updateData).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.message;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  deleteStudent(email: string): Observable<any> {
    return this.http.delete<{ status: string, message: string }>(`${this.baseUrl}/user/role/student/email/${email}`).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.message;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
}

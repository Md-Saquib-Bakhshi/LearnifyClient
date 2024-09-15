import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { courseModel } from '../../models/courseModel';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseUrl = 'http://localhost:5001/api/courses';

  constructor(private http: HttpClient) { }

  createCourse(course: courseModel): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}`, course);
  }

  getAllCourses(): Observable<courseModel[]> {
    return this.http.get<{ data: courseModel[], status: string, message: string }>(`${this.baseUrl}`).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateCourse(id: number, updateData: courseModel): Observable<any> {
    return this.http.put<{ status: string, message: string }>(`${this.baseUrl}/${id}`, updateData).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.message;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete<{ status: string, message: string }>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.message;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  getCoursesByPlaylistId(id: number): Observable<courseModel[]> {
    return this.http.get<{ data: courseModel[], status: string, message: string }>(`${this.baseUrl}/playlist/${id}`).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
}

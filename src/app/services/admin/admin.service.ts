import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { adminModel } from '../../models/adminModel';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  createAdmin(user: adminModel): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/registration/register-admin`, user);
  }

  getAllAdmin(): Observable<adminModel[]> {
    return this.http.get<{ data: adminModel[], status: string, message: string }>(`${this.baseUrl}/user/role/admin`).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updateAdmin(email: string, updateData: adminModel): Observable<any> {
    return this.http.put<{ status: string, message: string }>(`${this.baseUrl}/user/role/admin/email/${email}`, updateData).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.message;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  deleteAdmin(email: string): Observable<any> {
    return this.http.delete<{ status: string, message: string }>(`${this.baseUrl}/user/role/admin/email/${email}`).pipe(
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

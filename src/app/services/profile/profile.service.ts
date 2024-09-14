import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { profileModel } from '../../models/profileModel';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = 'http://localhost:5000/api/user';

  email: string | null = null;
  role: string | null = null;

  constructor(private http: HttpClient) {
    this.email = this.getEmailFromToken();
    this.role = localStorage.getItem('userRole');
    console.log('Email from token:', this.email);
    console.log('Role from local storage:', this.role);
  }

  getEmailFromToken(): string | null {
    const token = localStorage.getItem('authenticationToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null;
    }
    return null;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    return throwError(() => new Error(error.error.message || 'Server error'));
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/role/${this.role}/email/${this.email}`).pipe(
      catchError(this.handleError)
    );
  }

  updateProfile(profile: profileModel): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/role/${this.role}/email/${this.email}`, profile).pipe(
      catchError(this.handleError)
    );
  }
}

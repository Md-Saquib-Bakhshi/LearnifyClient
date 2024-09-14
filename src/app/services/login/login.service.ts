import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginModel } from '../../models/loginModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://localhost:5000/api/login';
 
  constructor(private http: HttpClient) { }

  login(user: loginModel): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/login`, user);
  }
}

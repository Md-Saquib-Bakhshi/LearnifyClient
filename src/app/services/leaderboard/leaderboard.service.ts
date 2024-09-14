import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeaderboardModel } from '../../models/leaderboardModel';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  baseUrl = 'https://freetestapi.com/api/v1/students'; 

  constructor(private http: HttpClient) {}

  getLeaderboard(): Observable<LeaderboardModel[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(data => 
        data.map(student => ({
          id: student.id,
          name: student.name,
          email: student.email,
          country: student.address.country,
          gender: student.gender,
          gpa: student.gpa
        }))
      )
    );
  }
}

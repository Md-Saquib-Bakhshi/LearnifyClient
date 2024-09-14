import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { leaderboardModel } from '../../models/leaderboardModel';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  baseUrl = 'http://live-test-scores.herokuapp.com/scores'; 

  constructor(private http: HttpClient) {}

  getLeaderboard(): Observable<leaderboardModel[]> {
    return this.http.get<leaderboardModel[]>(this.baseUrl);
  }
}

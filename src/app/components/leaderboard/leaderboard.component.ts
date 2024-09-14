import { Component, OnInit } from '@angular/core';
import { LeaderboardModel } from '../../models/leaderboardModel';
import { LeaderboardService } from '../../services/leaderboard/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: LeaderboardModel[] = [];
  loading: boolean = false;

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    this.startLoading();
    this.leaderboardService.getLeaderboard().subscribe({
      next: (data: LeaderboardModel[]) => {
        this.leaderboard = data;
        this.stopLoading();
      },
      error: (err) => {
        console.error('Error fetching leaderboard:', err);
        this.stopLoading();
      }
    });
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }
}

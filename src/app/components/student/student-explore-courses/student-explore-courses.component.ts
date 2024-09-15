import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course/course.service';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { courseModel } from '../../../models/courseModel';
import { playlistModel } from '../../../models/playlistModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-explore-courses',
  templateUrl: './student-explore-courses.component.html',
  styleUrls: ['./student-explore-courses.component.css']
})
export class StudentExploreCoursesComponent implements OnInit {
  playlists: playlistModel[] = [];
  loading: boolean = false;

  constructor(
    private courseService: CourseService,
    private playlistService: PlaylistService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.startLoading();
    this.playlistService.getAllPlaylists().subscribe({
      next: (playlists) => {
        this.playlists = playlists;
        this.stopLoading();
      },
      error: (error) => {
        this.stopLoading();
        console.error('Error fetching playlists:', error);
        this.toastr.error('Failed to fetch playlists', 'Error');
      }
    });
  }

  viewCourseDetails(playlistId: number): void {
    this.router.navigate(['/student/course-details', playlistId]);
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }
}

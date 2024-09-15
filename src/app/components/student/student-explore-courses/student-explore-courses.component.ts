import { Component, OnInit } from '@angular/core';
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
  courses: courseModel[] = [];
  selectedPlaylistId: number | null = null;
  loading: boolean = false;
  loadingTemporary: boolean = false;

  constructor(
    private courseService: CourseService,
    private playlistService: PlaylistService,
    private toastr: ToastrService
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

  // loadCoursesForPlaylist(playlistId: number): void {
  //   this.selectedPlaylistId = playlistId;
  //   this.startLoading();
  //   this.courseService.getCoursesByPlaylist(playlistId).subscribe({
  //     next: (courses) => {
  //       this.courses = courses;
  //       this.stopLoading();
  //     },
  //     error: (error) => {
  //       this.stopLoading();
  //       console.error('Error fetching courses:', error);
  //       this.toastr.error('Failed to fetch courses', 'Error');
  //     }
  //   });
  // }

  startLoading(): void {
    this.loading = true;
    this.loadingTemporary = true;
    setTimeout(() => {
      this.loadingTemporary = false;
    }, 1000); // Ensure spinner is visible for at least 1 second
  }

  stopLoading(): void {
    setTimeout(() => {
      this.loading = false;
    }, this.loadingTemporary ? 1000 : 0); // Delay hiding spinner if loadingTemporary is true
  }
}

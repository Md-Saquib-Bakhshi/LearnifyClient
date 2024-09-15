import { Component, OnInit } from '@angular/core';
import { courseModel } from '../../../models/courseModel';
import { playlistModel } from '../../../models/playlistModel';
import { CourseService } from '../../../services/course/course.service';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-view-course',
  templateUrl: './admin-view-course.component.html',
  styleUrls: ['./admin-view-course.component.css']
})
export class AdminViewCourseComponent implements OnInit {
  allCourses: courseModel[] = [];
  selectedCourse: courseModel | null = null;
  updateData: courseModel = {} as courseModel;
  loading: boolean = false;
  loadingTemporary: boolean = false;
  playlists: playlistModel[] = [];

  constructor(
    private courseService: CourseService,
    private playlistService: PlaylistService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadPlaylists();
  }

  loadCourses(): void {
    this.startLoading();
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
        this.stopLoading();
        console.log(this.allCourses);
      },
      error: (error) => {
        this.stopLoading();
        console.error('Error fetching courses:', error);
        this.toastr.error('Failed to fetch courses', 'Error');
      }
    });
  }

  loadPlaylists(): void {
    this.playlistService.getAllPlaylists().subscribe({
      next: (playlists) => {
        this.playlists = playlists;
        console.log(this.playlists);
      },
      error: (error) => {
        console.error('Error fetching playlists:', error);
        this.toastr.error('Failed to fetch playlists', 'Error');
      }
    });
  }

  startLoading(): void {
    this.loading = true;
    this.loadingTemporary = true;
    setTimeout(() => {
      this.loadingTemporary = false;
    }, 1000);
  }

  stopLoading(): void {
    setTimeout(() => {
      this.loading = false;
    }, this.loadingTemporary ? 1000 : 0);
  }

  selectCourseForUpdate(course: courseModel): void {
    this.selectedCourse = course;
    this.updateData = { ...course };
  }

  updateCourse(): void {
    if (this.selectedCourse && this.selectedCourse.id && this.updateData) {
      this.startLoading();
      this.courseService.updateCourse(this.selectedCourse.id, this.updateData).subscribe({
        next: (response) => {
          this.stopLoading();
          console.log('Course updated successfully', response);
          this.toastr.success('Updated successfully', 'Success');
          this.loadCourses();
          this.selectedCourse = null;
        },
        error: (error) => {
          this.stopLoading();
          console.error('Error updating course:', error);
          this.toastr.error('Failed to update course', 'Error');
        }
      });
    }
  }

  deleteCourse(id: number | undefined): void {
    if (id === undefined) {
      this.toastr.error('Invalid course ID', 'Error');
      return;
    }
    
    const initialState = {
      onConfirm: () => {
        this.startLoading();
        this.courseService.deleteCourse(id).subscribe({
          next: (response) => {
            this.stopLoading();
            console.log('Course deleted successfully', response);
            this.allCourses = this.allCourses.filter(c => c.id !== id);
            this.toastr.success('Deleted successfully', 'Success');
          },
          error: (error) => {
            this.stopLoading();
            console.error('Error deleting course:', error);
            this.toastr.error('Failed to delete course', 'Error');
          }
        });
      },
      onDecline: () => {}
    };
  
    this.modalService.show(ConfirmDialogComponent, { initialState });
  }
  

  getPlaylistNameById(playlistId: number): string {
    const playlist = this.playlists.find(p => p.id === playlistId);
    return playlist ? playlist.name : 'N/A';
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../services/course/course.service';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { courseModel } from '../../../models/courseModel';
import { playlistModel } from '../../../models/playlistModel';

@Component({
  selector: 'app-admin-add-course',
  templateUrl: './admin-add-course.component.html',
  styleUrls: ['./admin-add-course.component.css']
})
export class AdminAddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  playlists: playlistModel[] = [];
  loading = true;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private playlistService: PlaylistService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      link: ['', [Validators.required, Validators.pattern('^(https?|ftp):\\/\\/.+\\..+')] ], // Basic URL pattern
      playlistId: [null, [Validators.required, Validators.min(1)]]
    });

    // Fetch playlists
    this.playlistService.getAllPlaylists().subscribe({
      next: (playlists: playlistModel[]) => {
        this.playlists = playlists;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to load playlists. Please try again.', 'Error');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const course: courseModel = {
        title: this.courseForm.value.title,
        link: this.courseForm.value.link,
        playlistId: this.courseForm.value.playlistId
      };

      console.log('Submitting course:', course);

      this.courseService.createCourse(course).subscribe({
        next: (response: any) => {
          this.courseForm.reset();
          this.toastr.success(response.message, 'Success');
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Failed to add course. Please try again.';
          this.toastr.error(errorMessage, 'Error');
        }
      });
    }
  }

  validateForm(input: string) {
    return (
      this.courseForm.get(input)?.invalid &&
      (this.courseForm.get(input)?.touched || this.courseForm.get(input)?.dirty)
    );
  }

  isFormValid(): boolean {
    return this.courseForm.valid;
  }
}

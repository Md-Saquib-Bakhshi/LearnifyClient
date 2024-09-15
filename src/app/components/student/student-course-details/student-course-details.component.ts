import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course/course.service';
import { courseModel } from '../../../models/courseModel';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-student-course-details',
  templateUrl: './student-course-details.component.html',
  styleUrls: ['./student-course-details.component.css']
})
export class StudentCourseDetailsComponent implements OnInit {
  courses: courseModel[] = [];
  selectedCourse: courseModel | undefined;
  safeUrl: SafeResourceUrl | undefined;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const playlistId = Number(params.get('id'));
      if (playlistId) {
        this.loadCourses(playlistId);
      }
    });
  }

  loadCourses(playlistId: number): void {
    this.loading = true;
    this.courseService.getCoursesByPlaylistId(playlistId).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.error = 'Failed to load courses.';
        this.loading = false;
      }
    });
  }

  playVideo(link: string): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
}

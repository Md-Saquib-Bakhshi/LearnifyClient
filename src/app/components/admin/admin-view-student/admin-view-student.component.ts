import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { studentModel } from '../../../models/studentModel';
import { StudentService } from '../../../services/student/student.service';

@Component({
  selector: 'app-admin-view-student',
  templateUrl: './admin-view-student.component.html',
  styleUrls: ['./admin-view-student.component.css']
})
export class AdminViewStudentComponent implements OnInit {
  allStudent: studentModel[] = [];
  selectedStudent: studentModel | null = null; 
  updateData: studentModel = {} as studentModel;
  loading: boolean = false; // Add a loading indicator
  loadingTemporary: boolean = false; // For minimum 1 second loading

  constructor(
    private viewStudentService: StudentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.startLoading(); // Start loading indicator
    this.viewStudentService.getAllStudent().subscribe({
      next: (students) => {
        this.allStudent = students;
        this.stopLoading(); // Stop loading indicator
        console.log(this.allStudent);
      },
      error: (error) => {
        this.stopLoading(); // Stop loading indicator
        console.error('Error fetching students:', error);
        this.toastr.error('Failed to fetch students', 'Error');
      }
    });
  }

  startLoading(): void {
    this.loading = true;
    this.loadingTemporary = true;
    setTimeout(() => {
      this.loadingTemporary = false; // Ensure loading indicator is visible for at least 1 second
    }, 1000);
  }

  stopLoading(): void {
    // Ensure we stop loading only after the 1 second has passed
    setTimeout(() => {
      this.loading = false;
    }, this.loadingTemporary ? 1000 : 0);
  }

  selectStudentForUpdate(student: studentModel): void {
    this.selectedStudent = student;
    this.updateData = { ...student };
  }

  updateStudent(): void {
    if (this.selectedStudent && this.updateData) {
      this.startLoading(); // Start loading indicator
      this.viewStudentService.updateStudent(this.selectedStudent.email, this.updateData).subscribe({
        next: (response) => {
          this.stopLoading(); // Stop loading indicator
          console.log('Student updated successfully', response);
          this.toastr.success('Updated successfully', 'Success');
          this.loadStudents();
          this.selectedStudent = null;
        },
        error: (error) => {
          this.stopLoading(); // Stop loading indicator
          console.error('Error updating student:', error);
          this.toastr.error('Failed to update student', 'Error');
        }
      });
    }
  }

  deleteStudent(email: string): void {
    if (window.confirm('Are you sure you want to delete this student?')) {
      this.startLoading(); // Start loading indicator
      this.viewStudentService.deleteStudent(email).subscribe({
        next: (response) => {
          this.stopLoading(); // Stop loading indicator
          console.log('Student deleted successfully', response);
          this.allStudent = this.allStudent.filter(s => s.email !== email);
          this.toastr.success('Deleted successfully', 'Success');
        },
        error: (error) => {
          this.stopLoading(); // Stop loading indicator
          console.error('Error deleting student:', error);
          this.toastr.error('Failed to delete student', 'Error');
        }
      });
    }
  }
}

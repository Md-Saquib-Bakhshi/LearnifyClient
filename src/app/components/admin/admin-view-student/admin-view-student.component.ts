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

  constructor(
    private viewStudentService: StudentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true; // Show loading indicator
    this.viewStudentService.getAllStudent().subscribe({
      next: (students) => {
        this.allStudent = students;
        this.loading = false; // Hide loading indicator
        console.log(this.allStudent);
      },
      error: (error) => {
        this.loading = false; // Hide loading indicator
        console.error('Error fetching students:', error);
        this.toastr.error('Failed to fetch students', 'Error');
      }
    });
  }

  selectStudentForUpdate(student: studentModel): void {
    this.selectedStudent = student;
    this.updateData = { ...student };
  }

  updateStudent(): void {
    if (this.selectedStudent && this.updateData) {
      this.loading = true; // Show loading indicator
      this.viewStudentService.updateStudent(this.selectedStudent.email, this.updateData).subscribe({
        next: (response) => {
          this.loading = false; // Hide loading indicator
          console.log('Student updated successfully', response);
          this.toastr.success('Updated successfully', 'Success');
          this.loadStudents();
          this.selectedStudent = null;
        },
        error: (error) => {
          this.loading = false; // Hide loading indicator
          console.error('Error updating student:', error);
          this.toastr.error('Failed to update student', 'Error');
        }
      });
    }
  }

  deleteStudent(email: string): void {
    this.loading = true; // Show loading indicator
    this.viewStudentService.deleteStudent(email).subscribe({
      next: (response) => {
        this.loading = false; // Hide loading indicator
        console.log('Student deleted successfully', response);
        this.allStudent = this.allStudent.filter(s => s.email !== email);
        this.toastr.success('Deleted successfully', 'Success');
      },
      error: (error) => {
        this.loading = false; // Hide loading indicator
        console.error('Error deleting student:', error);
        this.toastr.error('Failed to delete student', 'Error');
      }
    });
  }
}

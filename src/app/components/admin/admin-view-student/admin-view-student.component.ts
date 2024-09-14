import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { studentModel } from '../../../models/studentModel';
import { StudentService } from '../../../services/student/student.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-view-student',
  templateUrl: './admin-view-student.component.html',
  styleUrls: ['./admin-view-student.component.css']
})
export class AdminViewStudentComponent implements OnInit {
  allStudent: studentModel[] = [];
  selectedStudent: studentModel | null = null;
  updateData: studentModel = {} as studentModel;
  loading: boolean = false;
  loadingTemporary: boolean = false;

  constructor(
    private viewStudentService: StudentService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.startLoading();
    this.viewStudentService.getAllStudent().subscribe({
      next: (students) => {
        this.allStudent = students;
        this.stopLoading();
        console.log(this.allStudent);
      },
      error: (error) => {
        this.stopLoading();
        console.error('Error fetching students:', error);
        this.toastr.error('Failed to fetch students', 'Error');
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

  selectStudentForUpdate(student: studentModel): void {
    this.selectedStudent = student;
    this.updateData = { ...student };
  }

  updateStudent(): void {
    if (this.selectedStudent && this.updateData) {
      this.startLoading();
      this.viewStudentService.updateStudent(this.selectedStudent.email, this.updateData).subscribe({
        next: (response) => {
          this.stopLoading();
          console.log('Student updated successfully', response);
          this.toastr.success('Updated successfully', 'Success');
          this.loadStudents();
          this.selectedStudent = null;
        },
        error: (error) => {
          this.stopLoading();
          console.error('Error updating student:', error);
          this.toastr.error('Failed to update student', 'Error');
        }
      });
    }
  }

  deleteStudent(email: string): void {
    const initialState = {
      onConfirm: () => {
        this.startLoading();
        this.viewStudentService.deleteStudent(email).subscribe({
          next: (response) => {
            this.stopLoading();
            console.log('Student deleted successfully', response);
            this.allStudent = this.allStudent.filter(s => s.email !== email);
            this.toastr.success('Deleted successfully', 'Success');
          },
          error: (error) => {
            this.stopLoading();
            console.error('Error deleting student:', error);
            this.toastr.error('Failed to delete student', 'Error');
          }
        });
      },
      onDecline: () => {}
    };

    this.modalService.show(ConfirmDialogComponent, { initialState });
  }
}

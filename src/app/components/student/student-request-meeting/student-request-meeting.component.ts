import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { meetingModel } from '../../../models/meetingModel';
import { MeetingService } from '../../../services/meeting/meeting.service';

@Component({
  selector: 'app-student-request-meeting',
  templateUrl: './student-request-meeting.component.html',
  styleUrls: ['./student-request-meeting.component.css']
})
export class StudentRequestMeetingComponent implements OnInit {
  meetingRequestForm!: FormGroup;
  meetingRequests: meetingModel[] = [];
  meetingRequest: meetingModel | null = null;
  errorMessage: string = '';
  showRequestForm: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private meetingService: MeetingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.meetingRequestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      requestMessage: ['', [Validators.required]]
    });
    this.loadMeetingRequests();
  }

  onSubmit(): void {
    if (this.meetingRequestForm.valid) {
      const requestDto: meetingModel = {
        email: this.meetingRequestForm.value.email,
        requestMessage: this.meetingRequestForm.value.requestMessage
      };

      this.meetingService.createMeetingRequest(requestDto).subscribe({
        next: (response: any) => {
          this.meetingRequestForm.reset();
          this.toastr.success(response.message, 'Success');
          this.loadMeetingRequests(); // Reload requests after submission
          this.showRequestForm = false;
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Request failed. Please try again.';
          this.toastr.error(errorMessage, 'Error');
        }
      });
    }
  }

  loadMeetingRequests(): void {
    this.loading = true;
    this.meetingService.getAllRequests().subscribe({
      next: (response: any) => {
        this.meetingRequests = response.data || [];
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Failed to load meeting requests';
        this.loading = false;
      }
    });
  }

  selectRequestForUpdate(request: meetingModel): void {
    this.meetingRequest = request;
    this.showRequestForm = false;
  }

  // deleteRequest(id: number): void {
  //   if (confirm('Are you sure you want to delete this request?')) {
  //     this.meetingService.deleteMeetingRequest(id).subscribe({
  //       next: () => {
  //         this.toastr.success('Request deleted successfully', 'Success');
  //         this.loadMeetingRequests(); // Reload requests after deletion
  //       },
  //       error: (error) => {
  //         const errorMessage = error?.error?.message || 'Failed to delete request';
  //         this.toastr.error(errorMessage, 'Error');
  //       }
  //     });
  //   }
  // }

  validateForm(input: string) {
    return (
      this.meetingRequestForm.get(input)?.invalid &&
      (this.meetingRequestForm.get(input)?.touched || this.meetingRequestForm.get(input)?.dirty)
    );
  }

  isFormValid(): boolean {
    return this.meetingRequestForm.valid;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { meetingModel } from '../../../models/meetingModel';
import { MeetingService } from '../../../services/meeting/meeting.service';

@Component({
  selector: 'app-admin-response-meeting',
  templateUrl: './admin-response-meeting.component.html',
  styleUrls: ['./admin-response-meeting.component.css']
})
export class AdminResponseMeetingComponent implements OnInit {
  meetingRequests: meetingModel[] = [];
  selectedRequest: meetingModel | null = null;
  responseForm!: FormGroup;
  showResponseForm: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private meetingService: MeetingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.responseForm = this.fb.group({
      email: [{ value: '', disabled: true }, Validators.required],
      requestMessage: [{ value: '', disabled: true }, Validators.required],
      meetingLink: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.loadMeetingRequests();
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

  openResponseForm(request: meetingModel): void {
    this.selectedRequest = request;
    this.responseForm.patchValue({
      email: request.email,
      requestMessage: request.requestMessage
    });
    this.showResponseForm = true;
  }

  onSubmit(): void {
    if (this.responseForm.valid) {
      const responseDto = {
        email: this.selectedRequest?.email,
        meetingLink: this.responseForm.value.meetingLink,
        time: this.responseForm.value.time
      };
  
      console.log('Payload:', responseDto);  // Log payload before sending it to the backend
      
      this.meetingService.makeMeetingResponse(responseDto).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message, 'Success');
          this.loadMeetingRequests(); // Reload requests after submission
          this.showResponseForm = false;
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Response failed. Please try again.';
          this.toastr.error(errorMessage, 'Error');
        }
      });
    }
  }
  

  validateForm(input: string) {
    return (
      this.responseForm.get(input)?.invalid &&
      (this.responseForm.get(input)?.touched || this.responseForm.get(input)?.dirty)
    );
  }

  isFormValid(): boolean {
    return this.responseForm.valid;
  }
}

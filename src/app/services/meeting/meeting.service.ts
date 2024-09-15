import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { meetingModel } from '../../models/meetingModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'http://localhost:5001/api/meeting';

  constructor(private http: HttpClient) { }

  // Create a new meeting request
  createMeetingRequest(meetingRequest: meetingModel): Observable<meetingModel> {
    return this.http.post<meetingModel>(`${this.apiUrl}/request`, meetingRequest);
  }

  // Get all meeting requests
  getAllRequests(): Observable<meetingModel[]> {
    return this.http.get<meetingModel[]>(`${this.apiUrl}/requests`);
  }

  // Get meeting request by student email
  getByStudentEmail(email: string): Observable<meetingModel> {
    return this.http.get<meetingModel>(`${this.apiUrl}/request/${email}`);
  }

  // Admin makes a response to a meeting request
  makeMeetingResponse(meetingResponse: meetingModel): Observable<meetingModel> {
    return this.http.post<meetingModel>(`${this.apiUrl}/response`, meetingResponse);
  }
}

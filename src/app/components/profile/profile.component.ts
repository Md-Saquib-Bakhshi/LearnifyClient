import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../services/profile/profile.service';
import { profileModel } from '../../models/profileModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile!: profileModel;

  constructor(private profileService: ProfileService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (response) => {
        if (response.status === 'Success') {
          this.userProfile = response.data;
          console.log('Profile Data:', this.userProfile);
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
        this.toastr.error(error.message || 'Error fetching profile data', 'Error');
      }
    });
  }

  updateProfile(): void {
    if (this.userProfile) {
      this.profileService.updateProfile(this.userProfile).subscribe({
        next: (response) => {
          if (response.status === 'Success') {
            console.log('Profile updated successfully:', response);
            this.toastr.success('Profile updated successfully', 'Success');
            this.getProfile();
          } else {
            this.toastr.error(response.message, 'Error');
          }
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.toastr.error(error.message || 'Error updating profile', 'Error');
        }
      });
    }
  }
}

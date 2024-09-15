import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { playlistModel } from '../../../models/playlistModel';


@Component({
  selector: 'app-admin-add-playlist',
  templateUrl: './admin-add-playlist.component.html',
  styleUrls: ['./admin-add-playlist.component.css']
})
export class AdminAddPlaylistComponent {
  playlistForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService, 
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.playlistForm.valid) {
        const playlist: playlistModel = {
            name: this.playlistForm.value.name,
            description: this.playlistForm.value.description,
        };
        
        console.log('Submitting playlist:', playlist);

        this.playlistService.createPlaylist(playlist).subscribe({
            next: (response: any) => {
                this.playlistForm.reset();
                this.toastr.success(response.message, 'Success');
            },
            error: (error) => {
                const errorMessage = error?.error?.message || 'Failed to add playlist. Please try again.';
                this.toastr.error(errorMessage, 'Error');
            }
        });
    }
}


  validateForm(input: string) {
    return (
      this.playlistForm.get(input)?.invalid &&
      (this.playlistForm.get(input)?.touched ||
        this.playlistForm.get(input)?.dirty)
    );
  }

  isFormValid(): boolean {
    return this.playlistForm.valid;
  }
}

import { Component } from '@angular/core';
import { playlistModel } from '../../../models/playlistModel';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-view-playlist',
  templateUrl: './admin-view-playlist.component.html',
  styleUrls: ['./admin-view-playlist.component.css']
})
export class AdminViewPlaylistComponent {
  allPlaylist: playlistModel[] = [];
  selectedPlaylist: playlistModel | null = null;
  updateData: playlistModel = {} as playlistModel;
  loading: boolean = false;
  loadingTemporary: boolean = false;

  constructor(
    private viewPlaylistService: PlaylistService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadPlaylists(); 
  }

  loadPlaylists(): void { 
    this.startLoading();
    this.viewPlaylistService.getAllPlaylists().subscribe({
      next: (playlists) => {
        this.allPlaylist = playlists;
        this.stopLoading();
        console.log(this.allPlaylist);
      },
      error: (error) => {
        this.stopLoading();
        console.error('Error fetching playlists:', error); 
        this.toastr.error('Failed to fetch playlists', 'Error'); 
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

  selectPlaylistForUpdate(playlist: playlistModel): void {
    this.selectedPlaylist = playlist;
    this.updateData = { ...playlist };
  }

  updatePlaylist(): void {
    if (this.selectedPlaylist && this.selectedPlaylist.id && this.updateData) {
      this.startLoading();
      this.viewPlaylistService.updatePlaylist(this.selectedPlaylist.id, this.updateData).subscribe({
        next: (response) => {
          this.stopLoading();
          console.log('Playlist updated successfully', response);
          this.toastr.success('Updated successfully', 'Success');
          this.loadPlaylists();
          this.selectedPlaylist = null;
        },
        error: (error) => {
          this.stopLoading();
          console.error('Error updating playlist:', error);
          this.toastr.error('Failed to update playlist', 'Error');
        }
      });
    }
  }

  deletePlaylist(id: number): void {
    const initialState = {
      onConfirm: () => {
        this.startLoading();
        this.viewPlaylistService.deletePlaylist(id).subscribe({
          next: (response) => {
            this.stopLoading();
            console.log('Playlist deleted successfully', response);
            this.allPlaylist = this.allPlaylist.filter(p => p.id !== id);
            this.toastr.success('Deleted successfully', 'Success');
          },
          error: (error) => {
            this.stopLoading();
            console.error('Error deleting playlist:', error);
            this.toastr.error('Failed to delete playlist', 'Error');
          }
        });
      },
      onDecline: () => {}
    };

    this.modalService.show(ConfirmDialogComponent, { initialState });
  }
}

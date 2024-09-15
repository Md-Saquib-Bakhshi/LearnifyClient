import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { playlistModel } from '../../models/playlistModel';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  baseUrl = 'http://localhost:5001/api/Playlist';

  constructor(private http: HttpClient) { }

  createPlaylist(playlist: playlistModel): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}`, playlist);
  }

  getAllPlaylists(): Observable<playlistModel[]> {
    return this.http.get<{ data: playlistModel[], status: string, message: string }>(`${this.baseUrl}`).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  updatePlaylist(id: number, updateData: playlistModel): Observable<any> {
    return this.http.put<{ status: string, message: string }>(`${this.baseUrl}/${id}`, updateData).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.message;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }

  deletePlaylist(id: number): Observable<any> {
    return this.http.delete<{ status: string, message: string }>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        if (response.status === 'Success') {
          return response.message;
        } else {
          throw new Error(response.message);
        }
      })
    );
  }
}


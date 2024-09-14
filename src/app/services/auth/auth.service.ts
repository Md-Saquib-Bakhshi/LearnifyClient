import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(new Date().getTime() / 1000);

    return decodedToken.exp < currentTime;
  }
}

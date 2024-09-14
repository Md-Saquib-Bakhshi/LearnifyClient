import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authenticationToken');
    const roles = localStorage.getItem('userRole');

    if (token && !this.authService.isTokenExpired(token)) {
      if (roles) {
        this.router.navigate([roles.includes('Admin') ? '/admin' : '/student']);
        return false;
      }
    }
    return true;
  }
}

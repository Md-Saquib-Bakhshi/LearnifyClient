import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authenticationToken');
    const roles = localStorage.getItem('userRole');

    if (this.authService.isTokenExpired(token)) {
      this.router.navigate(['/login']);
      return false;
    }

    if (roles && roles.includes('Student')) {
      return true;
    } else {
      this.router.navigate(['/forbidden']);
      return false;
    }
  }
}

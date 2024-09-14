import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit, OnDestroy {
  showErrorPage = true;
  redirectTimeout: any;
  errorPageTimeout: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.errorPageTimeout = setTimeout(() => {
      this.showErrorPage = false; 
      this.redirectTimeout = setTimeout(() => {
        const role = localStorage.getItem('userRole');
        if (role?.includes('Admin')) {
          this.router.navigate(['/admin']);
        } else if (role?.includes('Student')) {
          this.router.navigate(['/student']);
        } else {
          this.router.navigate(['/login']); 
        }
      }, 2500);
    }, 3000); 
  }

  ngOnDestroy(): void {
    if (this.redirectTimeout) {
      clearTimeout(this.redirectTimeout);
    }
    if (this.errorPageTimeout) {
      clearTimeout(this.errorPageTimeout);
    }
  }
}

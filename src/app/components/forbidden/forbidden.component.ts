import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css'
})
export class ForbiddenComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      const role = localStorage.getItem('userRole');
      if (role?.includes('Admin')) {
        this.router.navigate(['/admin']);
      } else if (role?.includes('Student')) {
        this.router.navigate(['/student']);
      } else {
        this.router.navigate(['/login']); 
      }
    }, 3000);
  }
}

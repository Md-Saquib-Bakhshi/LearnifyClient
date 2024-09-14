import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.css'
})
export class StudentSidebarComponent {
  constructor(private route: Router, private toastr: ToastrService){}

  logout() {
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('userRole');
    this.route.navigate(['/login']);
    this.toastr.success('Successfully logged out', 'Success')
  }
}

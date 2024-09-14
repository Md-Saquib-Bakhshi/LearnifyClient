import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  constructor(private route: Router, private toastr: ToastrService){}

  logout() {
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('userRole');
    this.route.navigate(['/login']);
    this.toastr.success('Successfully logged out', 'Success')
  }

}

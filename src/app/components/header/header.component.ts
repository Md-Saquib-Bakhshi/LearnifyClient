import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private route: Router, private toastr: ToastrService){}

  logout() {
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('userRole');
    this.route.navigate(['/login']);
    this.toastr.success('Successfully logged out', 'Success')
  }
}

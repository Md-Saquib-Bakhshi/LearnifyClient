import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginModel } from '../../models/loginModel';
import { LoginService } from '../../services/login/login.service';
import { ToastrService } from 'ngx-toastr'; // Add ToastrService for notifications

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fixed styleUrls property
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private loginService: LoginService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  validateForm(input: string) {
    return (
      this.loginForm.get(input)?.invalid &&
      (this.loginForm.get(input)?.touched || this.loginForm.get(input)?.dirty)
    );
  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user: loginModel = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.loginService.login(user).subscribe({
        next: (responseData: any) => {
          const token = responseData.data?.token;
          const roles = responseData.data?.roles;

          this.toastr.success(responseData.message, 'Success');

          this.loginForm.reset();
          if (token) {
            localStorage.setItem('authenticationToken', token);
            localStorage.setItem('userRole', roles);

            // Route based on role
            if (roles.includes('Admin')) {
              this.route.navigate(['/admin']);
            } else if (roles.includes('Student')) {
              this.route.navigate(['/student']);
            }
          }
        },
        error: (errorResponse: any) => {
          this.toastr.error(errorResponse.error?.message || 'Login failed. Please try again.', 'Error');
        },
      });
    }
  }
}

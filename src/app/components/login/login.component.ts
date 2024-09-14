import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginModel } from '../../models/loginModel';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private loginService: LoginService
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

          // Success message
          alert(responseData.message);

          this.loginForm.reset();
          if (token) {
            localStorage.setItem('authenticationToken', token);
            localStorage.setItem('userRole', roles);

            // Route based on role
            if (roles.includes('Admin')) {
              this.route.navigate(['/admin-dashboard/dashboard']);
            } else if (roles.includes('Student')) {
              this.route.navigate(['/student-dashboard']);
            }
          }
        },
        error: (errorResponse: any) => {
          // Error message
          alert(errorResponse.error?.message || 'Login failed. Please try again.');
        },
      });
    }
  }
}

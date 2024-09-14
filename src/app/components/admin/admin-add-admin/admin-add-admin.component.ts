import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { adminModel } from '../../../models/adminModel';

@Component({
  selector: 'app-admin-add-admin',
  templateUrl: './admin-add-admin.component.html',
  styleUrl: './admin-add-admin.component.css'
})
export class AdminAddAdminComponent {
  adminRegistrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private createAdminService: AdminService,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.adminRegistrationForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        gender: ['', Validators.required],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validator: this.customPasswordValidate,
      }
    );
  }

  onSubmit() {
    if (this.adminRegistrationForm.valid) {
      console.log(this.adminRegistrationForm.value);
      const user: adminModel = {
        name: this.adminRegistrationForm.value.name,
        email: this.adminRegistrationForm.value.email,
        phone: this.adminRegistrationForm.value.phone,
        gender: this.adminRegistrationForm.value.gender,
        password: this.adminRegistrationForm.value.password,
      };

      this.createAdminService.createAdmin(user).subscribe({
        next: (response: any) => {
          this.adminRegistrationForm.reset();
          this.toastr.success(response.message, 'Success'); 
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Registration failed. Please try again.';
          this.toastr.error(errorMessage, 'Error'); 
        }
      });
    }
  }

  validateForm(input: string) {
    return (
      this.adminRegistrationForm.get(input)?.invalid &&
      (this.adminRegistrationForm.get(input)?.touched ||
        this.adminRegistrationForm.get(input)?.dirty)
    );
  }

  customPasswordValidate(control: AbstractControl) {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    if (password !== repeatPassword) {
      control.get('repeatPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  isFormValid(): boolean {
    return this.adminRegistrationForm.valid;
  }
}

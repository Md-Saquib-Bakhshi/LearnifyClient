import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { studentModel } from '../../../models/studentModel';
import { StudentService } from '../../../services/student/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-add-student',
  templateUrl: './admin-add-student.component.html',
  styleUrls: ['./admin-add-student.component.css']
})
export class AdminAddStudentComponent {
  studentRegistrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private createStudentService: StudentService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.studentRegistrationForm = this.fb.group(
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
        domain: ['', Validators.required],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validator: this.customPasswordValidate,
      }
    );
  }

  onSubmit() {
    if (this.studentRegistrationForm.valid) {
      console.log(this.studentRegistrationForm.value);
      const user: studentModel = {
        name: this.studentRegistrationForm.value.name,
        email: this.studentRegistrationForm.value.email,
        phone: this.studentRegistrationForm.value.phone,
        gender: this.studentRegistrationForm.value.gender,
        domain: this.studentRegistrationForm.value.domain,
        password: this.studentRegistrationForm.value.password,
      };

      this.createStudentService.createStudent(user).subscribe({
        next: (response: any) => {
          this.studentRegistrationForm.reset();
          this.toastr.success(response.message, 'Success'); // Using ToastrService
        },
        error: (error) => {
          const errorMessage = error?.error?.message || 'Registration failed. Please try again.';
          this.toastr.error(errorMessage, 'Error'); // Using ToastrService
        }
      });
    }
  }

  validateForm(input: string) {
    return (
      this.studentRegistrationForm.get(input)?.invalid &&
      (this.studentRegistrationForm.get(input)?.touched ||
        this.studentRegistrationForm.get(input)?.dirty)
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
    return this.studentRegistrationForm.valid;
  }
}

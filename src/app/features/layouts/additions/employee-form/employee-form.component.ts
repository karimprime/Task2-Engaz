import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Employee } from '../../../../core/interface/employee/employee.interface';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  @Output() employeeAdded = new EventEmitter<Employee>();

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      nameEn: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      nameAr: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]*$/)],
      ],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      gender: ['', Validators.required],
      birthdate: ['', [Validators.required, this.validateAge]],
      religion: ['', [Validators.required]],
      mobile: ['', [Validators.required, this.validateEgyptianMobile]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  private validateEgyptianMobile(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const valid = /^01[0125][0-9]{8}$/.test(value);
    return valid ? null : { invalidEgyptianMobile: true };
  }

  private validateAge(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const birthdate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdate.getDate())
    ) {
      return age - 1 < 18 ? { underAge: true } : null;
    }
    return age < 18 ? { underAge: true } : null;
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeAdded.emit(this.employeeForm.value as Employee);
      this.employeeForm.reset();
    } else {
      this.markFormGroupTouched(this.employeeForm);
    }
  }

  onClear() {
    this.employeeForm.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}

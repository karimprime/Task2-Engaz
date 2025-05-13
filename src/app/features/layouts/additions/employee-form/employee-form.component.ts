import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { EnglishOnlyDirective } from '../../../../core/directives/english-only.directive';
import { ArabicOnlyDirective } from '../../../../core/directives/arabic-only.directive';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
interface Employee {
  nameEn: string;
  nameAr: string;
  idNumber: string;
  gender: string;
  birthdate: string;
  religion: string;
  mobile: string;
  email: string;
}

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EnglishOnlyDirective,
    ArabicOnlyDirective,
    ButtonModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  @Output() employeeAdded = new EventEmitter<Employee>();

  employeeForm: FormGroup;

  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      nameEn: ['', [Validators.required, this.validateEnglishOnly]],
      nameAr: ['', [Validators.required, this.validateArabicOnly]],
      idNumber: ['', [Validators.required, this.validateIdNumber]],
      gender: ['', Validators.required],
      birthdate: ['', [Validators.required, this.validateAge]],
      religion: ['', Validators.required],
      mobile: ['', [Validators.required, this.validateEgyptianMobile]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  private validateEnglishOnly(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return /^[a-zA-Z\s]+$/.test(value) ? null : { englishOnly: true };
  }

  private validateArabicOnly(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return /^[\u0600-\u06FF\s]+$/.test(value) ? null : { arabicOnly: true };
  }

  private validateIdNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return /^\d{14}$/.test(value) ? null : { invalidId: true };
  }

  private validateEgyptianMobile(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return /^01[0125]\d{8}$/.test(value) ? null : { invalidMobile: true };
  }

  private validateAge(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const birthdate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    return age >= 18 ? null : { underAge: true };
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employee: Employee = {
        ...this.employeeForm.value,
      };
      this.employeeAdded.emit(employee);
    }
  }

  onClear() {
    this.employeeForm.reset();
  }

  logout(): void {
    localStorage.clear();

    this.router.navigate(['/auth-layout/login']);
  }
}

import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
    DividerModule,
    CheckboxModule,
    TooltipModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ],
    ],
    rememberMe: [false],
  });

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  passwordChecks = signal({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
    hasMinLength: false,
  });

  private loginSub: Subscription = new Subscription();

  updatePasswordStrength(): void {
    const password = this.password?.value || '';
    this.passwordChecks.set({
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[@$!%*?&]/.test(password),
      hasMinLength: password.length >= 8,
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getEmailError(): string {
    if (this.email?.invalid && (this.email?.dirty || this.email?.touched)) {
      if (this.email.errors?.['required']) return 'Email is required';
      if (this.email.errors?.['email']) return 'Please enter a valid email';
    }
    return '';
  }

  getPasswordError(): string {
    if (
      this.password?.invalid &&
      (this.password?.dirty || this.password?.touched)
    ) {
      if (this.password.errors?.['required']) return 'Password is required';
      if (this.password.errors?.['pattern'])
        return 'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character';
    }
    return '';
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const credentials = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    };

    this.loginSub = this.authService.signIn(credentials).subscribe({
      next: (res) => {
        if ('token' in res && res.message === 'success') {
          localStorage.setItem('userToken', res.token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Login failed',
        });
        this.isLoading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}

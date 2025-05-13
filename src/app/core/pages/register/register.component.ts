import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordCheckLabelPipe } from '../../../shared/pipes/checkpassword';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
    CheckboxModule,
    PasswordCheckLabelPipe,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent {
  private authService = inject(AuthService);

  private router = inject(Router);
  private messageService = inject(MessageService);

  private registerSub: Subscription = new Subscription();

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  passwordFocused = signal(false);

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(01)[0125][0-9]{8}$'),
      ]),
      agree: new FormControl(false, [Validators.requiredTrue]),
    },
    { validators: this.confirmPassword.bind(this) }
  );

  passwordChecks = signal({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasMinLength: false,
    hasSpecial: false,
  });

  ngOnInit(): void {
    this.passwordControl.valueChanges.subscribe(() => {
      this.updatePasswordStrength();
    });
  }

  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get agreeControl(): FormControl {
    return this.registerForm.get('agree') as FormControl;
  }

  updatePasswordStrength(): void {
    const password = this.passwordControl.value || '';
    this.passwordChecks.set({
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[@$!%*?&]/.test(password),
      hasMinLength: password.length >= 8,
    });
  }

  confirmPassword(control: AbstractControl) {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { misMatch: true };
  }

  registerSubmit() {
    this.isLoading.set(true);
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Register Success',
            });
            setTimeout(() => {
              this.router.navigate(['/auth-layout/login']);
            }, 1000);
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message || 'Register failed',
          });
          this.isLoading.set(false);
        },
      });
    } else {
      this.isLoading.set(false);
    }
  }

  ngOnDestroy(): void {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }
}

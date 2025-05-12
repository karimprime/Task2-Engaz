import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordCheckLabel',
})
export class PasswordCheckLabelPipe implements PipeTransform {
  constructor() { }

  transform(key: string): string {
    switch (key) {
      case 'hasUppercase':
        return 'At least one uppercase letter';
      case 'hasLowercase':
        return 'At least one lowercase letter';
      case 'hasNumber':
        return 'At least one number';
      case 'hasMinLength':
        return 'At least 8 characters';
      case 'hasSpecial':
        return 'At least one special character';
      default:
        return key;
    }
  }
}

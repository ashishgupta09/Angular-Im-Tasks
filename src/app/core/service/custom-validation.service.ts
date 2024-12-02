import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null; // Exit early if controls are not found
      }

      // Avoid overwriting other errors on confirmPassword
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }

      // Check if passwords match
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return null
    };
  }

  userNameValidator(useControl: AbstractControl) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.validateUserName(useControl.value)) {
          resolve({ userNameNotAvailable: true })
        } else {
          resolve(null);
        }
      }, 1000)
    })
  }

  validateUserName(userName: string) {
    const UserList = ['ankit', 'ashish', 'roy'];
    return UserList.includes(userName);
  }

}

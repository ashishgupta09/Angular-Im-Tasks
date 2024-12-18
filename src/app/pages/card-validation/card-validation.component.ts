import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-card-validation',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './card-validation.component.html',
  styleUrl: './card-validation.component.scss'
})
export class CardValidationComponent {
  userForm!: FormGroup;
  submitted: any;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      cardNo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{16}$/),
        ],
      ],
      expireDate: [
        '',
        [
          Validators.required,
          this.expireDateValidator
        ],
      ],
      cvv: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}$/),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
    }
    this.userForm.get('cvv')?.setValue(input.value, { emitEvent: false });
  }

  onCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.length > 16) {
      input.value = input.value.slice(0, 16);
    }
    this.userForm.get('cardNo')?.setValue(input.value, { emitEvent: false });
  }

  expireDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    if (!value.includes('/')) {
      return { missingSlash: true };
    }
    const [month, year] = value.split('/').map((part: any) => parseInt(part, 10));
    if (isNaN(month) || month < 1 || month > 12) {
      return { invalidMonth: true };
    }
    if (isNaN(year) || year < 2020 || year > 2100) {
      return { invalidYear: true };
    }

    return null;
  }
}

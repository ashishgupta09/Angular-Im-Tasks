import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidationService } from '../../service/custom-validation.service';

@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-validation.component.html',
  styleUrl: './form-validation.component.scss'
})
export class FormValidationComponent implements OnInit {
  resgistrationForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private customValidatorService: CustomValidationService
  ) { }

  ngOnInit(): void {
    this.resgistrationForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', [Validators.required], this.customValidatorService.userNameValidator.bind(this.customValidatorService)],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidatorService.patternValidator(),
        ]),
      ],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
    },
      {
        validator: this.customValidatorService.matchPassword('password', 'confirmPassword'),
      }
    )
  }

  get registerFormControl() {
    return this.resgistrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.resgistrationForm.valid) {
      console.log(this.resgistrationForm.value);
    } else {
      console.log(this.resgistrationForm.errors)
    }
    this.resgistrationForm.reset();
  }

}

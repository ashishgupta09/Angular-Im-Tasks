import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp-field.component.html',
  styleUrl: './otp-field.component.scss'
})
export class OtpFieldComponent {

  move(e: KeyboardEvent, p: HTMLInputElement | null, c: EventTarget | null, n: HTMLInputElement | null) {
    const currentInput = c as HTMLInputElement;
    if (!currentInput) return;

    const length = currentInput.value.length;
    const maxLength = Number(currentInput.getAttribute('maxlength'));
    if (length === maxLength && n) {
      n.focus();
    }
    if (e.key === 'Backspace' && p) {
      p.focus();
    }
  }




}

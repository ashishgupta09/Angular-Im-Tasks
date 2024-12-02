import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent implements OnInit {
  @Input() users: Array<{ id: number; name: string; email: string }> = [];

  @Output() userAdded = new EventEmitter<{ id: number; name: string; email: string }>();

  id: number | null = null;
  name: string = '';
  email: string = '';

  ngOnInit(): void { }

  addUser() {
    if (this.id && this.name.trim() && this.email.trim()) {
      const user = { id: this.id, name: this.name, email: this.email };
      this.userAdded.emit(user);
      this.clearForm()
    }
  }

  clearForm() {
    this.id = null;
    this.name = '';
    this.email = '';
  }

}

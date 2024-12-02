import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { UserService } from '../../core/service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, ChildComponent, FormsModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  providers: [UserService]
})
export class ParentComponent implements OnInit {
  users: Array<{ id: number; name: string; email: string }> = [];
  usersList: Array<{ id: number; name: string; email: string }> = [];
  filteredUsers: Array<{ id: number; name: string; email: string }> = [];
  searchTerm: string = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.filteredUsers = [...this.users];
  }

  filterUsers() {
    this.filteredUsers = this.users.filter((user) => {
      return user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    })
  }

  addUser(
    user: {
      id: number;
      name: string;
      email: string
    }) {
    this.usersList.push(user);
  }

}

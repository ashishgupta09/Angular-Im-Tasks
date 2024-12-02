import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = [
    { id: 1, name: 'John Cena', email: 'john@gmail.com' },
    { id: 2, name: 'Ashish Gupta', email: 'ashish@gmail.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com' },
  ]

  getUsers() {
    return this.users;
  }

}

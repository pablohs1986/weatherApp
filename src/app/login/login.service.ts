import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users: User[] = [
    new User('user1', '12345678'),
    new User('user2', '12345678'),
    new User('user3', '12345678'),
    new User('user4', '12345678'),
    new User('user4', '12345678'),
  ];

  isUserAuthenticated = false;

  constructor() {}

  /**
   * It checks if the entered user exists and checks if the entered password
   * is correct. If the entered user does not exist or the password is not correct,
   * the login is not accepted.
   * @param user
   */
  login(user: User) {
    this.isUserAuthenticated = false;

    let userToFind = this.users.find((u) => {
      return u.name === user.name;
    });

    if (userToFind !== undefined) {
      this.isUserAuthenticated =
        user.password === userToFind.password ? true : false;
    }
  }

  logout() {
    this.isUserAuthenticated = false;
  }
}

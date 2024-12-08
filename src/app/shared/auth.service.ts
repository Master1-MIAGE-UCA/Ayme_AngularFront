import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  admin = false;

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
    this.admin = false;
  }

  setAdmin() {
    this.admin = true;
  }

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        resolve(this.admin);
      }
    );
    return isUserAdmin;
  }
}

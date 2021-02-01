import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.module';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private route: Router) { }

  updatingUserInterface(email, fname, lname, gender, address, password, fileObj) {
    let user: User;
    user = {
      email: email,
      fname: fname,
      lname: lname,
      gender: gender,
      address: address,
      password: password,
      todoList: [],
      profilePic: fileObj
    }

    return user;
  }

  savingNewUserInLocalStorage(user, email) {
    //checking if user is already registered then 
    if (localStorage.getItem(email) == null) {
      localStorage.setItem(user.email, JSON.stringify(user));
      this.route.navigate(['/login-user'])
    }
  }

  registerNewUser<User>(email, fname, lname, gender, address, password, fileObj): boolean {
    let user;
    let fileReader = new FileReader();
    if (fileObj === undefined) {
      fileObj = '';
      user = this.updatingUserInterface(email, fname, lname, gender, address, password, fileObj)
      this.savingNewUserInLocalStorage(user, email);

    } else {
      fileReader.readAsDataURL(fileObj[0])
      fileReader.onload = () => {
        user = this.updatingUserInterface(email, fname, lname, gender, address, password, fileReader.result)

        this.savingNewUserInLocalStorage(user, email);

      }
    }
    //if user exists in registered
    if (localStorage.getItem(email) != null) {
      return false;
    }

  }

  clearUserSession() {
    sessionStorage.clear();
    this.getLoggedInName.emit(false);
    this.route.navigate(['/login-user'])
  }
  
  loginUser(emailId, password): boolean {
    if (localStorage.getItem(emailId) !== null) {
      const userStorage = JSON.parse(localStorage.getItem(emailId));
      if (userStorage.password == password) {
        sessionStorage.setItem("email", emailId);
        this.getLoggedInName.emit(true);
        this.route.navigate(['/todolist'])
      } else {
        return false; //password is incorrect
      }
    } else {
      return true; //user does not exists
    }
  }
}

import { Injectable } from '@angular/core';
import { Customer } from '../common/Customer';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  user!:Customer;
  data!:any;

  constructor() { }

  saveLogin(user:Customer) {
    window.localStorage.removeItem("login");
    window.localStorage.setItem("login", JSON.stringify(user));
  }

  getUser() {
    this.data = localStorage.getItem("login");
    return JSON.parse(this.data);
  }

  logout() {
    window.localStorage.removeItem("login");
  }
}

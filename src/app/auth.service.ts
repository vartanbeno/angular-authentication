import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';

  private _validate = 'http://localhost:3000/api/validate';

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: User) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!(localStorage.getItem('token') && localStorage.getItem('username'));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/events']);
  }

  validateUser(user: User) {
    return this.http.post<any>(this._validate, user);
  }

}

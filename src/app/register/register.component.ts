import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData: Object = {};
  @ViewChild('usernameInput') usernameInput: ElementRef;
  usernameInvalid: boolean = false;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usernameInput.nativeElement.focus();
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['special']);
      },
      err => {
        console.log(err);
      }
    )
  }

  validating() {
    this._auth.validateUser(this.registerUserData).subscribe(
      res => {
        this.usernameInvalid = false;
      },
      err => {
        if (err.status === 409) {
          this.usernameInvalid = true;
        }
      }
    )
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  isError = false;
  errorMessage = 'Wrong credentials, please try again';

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  /**
   * Try to login the user. If the credentials are correct, they are redirected
   * to /home. Otherwise, an error is displayed.
   * @param loginForm
   */
  onSubmit(loginForm: NgForm) {
    let user: User = new User(loginForm.value.name, loginForm.value.password);

    this.loginService.login(user);

    if (this.loginService.isUserAuthenticated) {
      this.isError = false;
      this.router.navigate(['/home']);
    } else {
      this.isError = true;
    }

    loginForm.reset();
  }
}

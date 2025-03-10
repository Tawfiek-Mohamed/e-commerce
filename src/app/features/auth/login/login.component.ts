import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errMsg: string = '';
  isLoading: boolean = false;
  constructor(private Auth: AuthService, private router: Router) {}

  //formGroup
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  submitForm() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.Auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.message == 'success') {
            this.router.navigate(['/home']);
            localStorage.setItem('userToken', res.token);
            this.Auth.decodeUserData();
          }
        },

        error: (err) => {
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }
}

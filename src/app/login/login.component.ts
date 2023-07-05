import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  submitForm() {
    if (this.loginForm.valid) {
      this.userService
        .loginUser(this.loginForm.value)
        .subscribe((data: any) => {
          if (!data.user.verified) {
            this.router.navigate(['/info']);
          } else if (
            data.user.verified &&
            data.message === 'Login successfully'
          ) {
            this.toast.success(data.message);
            localStorage.setItem('authToken', data.user.token);
            this.router.navigate(['/']);
          } else {
            this.toast.error(data.message);
          }
        });
    } else {
      this.toast.error('Please filled all the details.');
    }
  }
}

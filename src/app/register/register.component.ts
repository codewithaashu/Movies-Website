import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  modalOpen: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.minLength(10)],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  submitForm() {
    if (this.registerForm.valid) {
      this.userService
        .registerUser(this.registerForm.value)
        .subscribe((data: any) => {
          this.toast.success(data.message);
          if (data.message == 'User already exist.') {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/info']);
          }
          this.registerForm.reset();
        });
    } else {
      this.toast.error('Please filled all the details.');
    }
  }
}

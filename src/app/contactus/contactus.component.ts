import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
} from '@angular/forms';
import { ContactService } from '../Service/contact.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent {
  contactForm: FormGroup;
  isLogin = localStorage.getItem('authToken') ? true : false;
  constructor(
    private fb: FormBuilder,
    private contact: ContactService,
    private toastr: ToastrService
  ) {
    window.scrollTo(0, 0);
    this.contactForm = fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', Validators.email),
      phone: new FormControl('', Validators.minLength(10)),
      purpose: new FormControl('', Validators.required),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
    });
  }

  formSubmit() {
    if (this.contactForm.valid) {
      this.contact
        .sendMessage(this.contactForm.value)
        .subscribe((data: any) => {
          this.toastr.success(data?.msge);
          this.contactForm.reset();
        });
    } else {
      this.toastr.error('Please filled all mandatory field.');
    }
  }
  collapse = false;
  collapseFunc() {
    this.collapse = !this.collapse;
  }
}

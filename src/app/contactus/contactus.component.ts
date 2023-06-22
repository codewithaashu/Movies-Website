import { Component } from '@angular/core';
import { MovieService } from '../Service/movie.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
} from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent {
  contactForm: FormGroup;
  constructor(private fb: FormBuilder) {
    window.scrollTo(0, 0);
    this.contactForm = fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', Validators.email),
      phone: new FormControl('', Validators.minLength(10)),
      purpose: new FormControl('', Validators.required),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
  formSubmit() {
    if (this.contactForm.valid) {
      alert('Message Successfully sent.');
      this.contactForm.reset();
    } else {
      alert('Please fill all the field.');
    }
    console.log(this.contactForm.value);
  }
}

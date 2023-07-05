import { Component } from '@angular/core';
import { CommentService } from '../Service/comment.service';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: any = null;
  user: any;
  apiData: any;
  pages: Array<Number> = [];
  activePage: any = 1;
  userDetailsForm: FormGroup;
  updateId: String = '';
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    userService.getAllUsers().subscribe((data: any) => {
      this.apiData = data.users.reverse();
      //create pages array
      for (let i = 0; i < this.apiData?.length / 10; i++) {
        this.pages.push(i + 1);
      }
      ///create first page response
      this.users = data.users.slice(0, 10);
    });
    this.userDetailsForm = fb.group({
      name: [''],
      userType: [''],
      verified: [''],
    });
  }
  getUserList() {
    this.pages = [];
    this.userService.getAllUsers().subscribe((data: any) => {
      this.apiData = data.users.reverse();
      //create pages array
      for (let i = 0; i < this.apiData?.length / 10; i++) {
        this.pages.push(i + 1);
      }
      ///create first page response
      this.users = data.users.slice(0, 10);
    });
  }
  setUsersList(pageNo: any) {
    this.activePage = pageNo;
    this.users = this.apiData.slice((pageNo - 1) * 10, (pageNo - 1) * 10 + 10);
  }
  formSubmit() {
    this.userService
      .updateUserDetails(this.updateId, this.userDetailsForm.value)
      .subscribe((data: any) => {
        this.toast.success('User updated successfully.');
        this.getUserList();
      });
  }
  updateDetails(id: any) {
    this.updateId = id;
    this.userService.getUserDetails(id).subscribe((data: any) => {
      const { name, userType, verified } = data.user;
      this.userDetailsForm.controls['name'].setValue(name);
      this.userDetailsForm.controls['userType'].setValue(userType);
      this.userDetailsForm.controls['verified'].setValue(verified.toString());
    });
  }
  deleteDetails(id: any) {
    this.userService.deleteUser(id).subscribe((data: any) => {
      this.toast.success(data.message);
      this.getUserList();
    });
  }
}

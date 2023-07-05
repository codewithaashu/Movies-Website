import { Component } from '@angular/core';
import { UserService } from '../Service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  user: any;
  constructor(private userService: UserService, private toast: ToastrService) {
    userService.getUser().subscribe((data: any) => {
      this.user = data.user;
    });
  }
  sideBar = false;
  openSideBar() {
    this.sideBar = true;
  }
  closeSideBar() {
    this.sideBar = false;
  }
  signOut() {
    localStorage.removeItem('authToken');
    this.toast.success('Logout successfully.');
  }
}

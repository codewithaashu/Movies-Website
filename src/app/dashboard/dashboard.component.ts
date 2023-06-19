import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  toggle = true;
  toggleSideBar() {
    this.toggle = !this.toggle;
    console.log('toogle');
  }
  openSideBar() {
    this.toggle = false;
  }
  closeSideBar() {
    this.toggle = true;
  }
}

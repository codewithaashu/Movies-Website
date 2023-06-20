import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  sideBar = false;
  openSideBar() {
    this.sideBar = true;
  }
  closeSideBar() {
    this.sideBar = false;
  }
}

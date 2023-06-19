import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css'],
})
export class DashboardHeaderComponent {
  informationArray: Array<any> = [
    { title: 'Comments', icon: 'fa-regular fa-comment', quantity: 323 },
    { title: 'Movies', icon: 'fa-solid fa-film', quantity: 60 },
    { title: 'Messages', icon: 'fa-regular fa-message', quantity: 45 },
    { title: 'Users', icon: 'fa fa-user', quantity: 38 },
  ];
}

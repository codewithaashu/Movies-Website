import { Component } from '@angular/core';
import { ContactService } from '../Service/contact.service';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  messageList: any = null;
  message: String = '';
  pages: Array<Number> = [];
  activePage: any = 1;
  apiData: any;
  constructor(
    private contact: ContactService,
    private dataService: DataService
  ) {
    contact.getMessages().subscribe((data: any) => {
      this.apiData = data.messages.sort((a: any, b: any) =>
        b.messageDate.localeCompare(a.messageDate)
      );
      //create pages array
      for (let i = 0; i < this.apiData?.length / 10; i++) {
        this.pages.push(i + 1);
      }
      ///create first page response
      this.messageList = data.messages
        .slice(0, 10)
        .sort((a: any, b: any) => b.messageDate.localeCompare(a.messageDate));
    });
  }
  convertDateTimeFormat(date: any) {
    return this.dataService.convertDateTimeFormat(date);
  }
  viewMessage(_id: String) {
    this.contact.getMessage(_id).subscribe((data: any) => {
      this.message = data.message;
    });
  }
  setMessageList(pageNo: any) {
    this.activePage = pageNo;
    this.messageList = this.apiData.slice(
      (pageNo - 1) * 10,
      (pageNo - 1) * 10 + 10
    );
  }
}

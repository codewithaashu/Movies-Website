import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommentService } from '../Service/comment.service';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  comments: any = null;
  comment: String = '';
  apiData: any;
  pages: Array<Number> = [];
  activePage: any = 1;
  constructor(
    private commentService: CommentService,
    private dataService: DataService
  ) {
    commentService.getAllComments().subscribe((data: any) => {
      this.apiData = data.comments.sort((a: any, b: any) =>
        b.uploadedDate.localeCompare(a.uploadedDate)
      );
      //create pages array
      for (let i = 0; i < this.apiData?.length / 10; i++) {
        this.pages.push(i + 1);
      }
      ///create first page response
      this.comments = data.comments
        .slice(0, 10)
        .sort((a: any, b: any) => b.uploadedDate.localeCompare(a.uploadedDate));
    });
  }
  viewComments(com: any) {
    this.comment = com;
  }
  setCommentList(pageNo: any) {
    this.activePage = pageNo;
    this.comments = this.apiData.slice(
      (pageNo - 1) * 10,
      (pageNo - 1) * 10 + 10
    );
  }
  convertDateTimeFormat(date: any) {
    return this.dataService.convertDateTimeFormat(date);
  }
}

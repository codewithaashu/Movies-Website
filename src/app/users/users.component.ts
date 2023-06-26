import { Component } from '@angular/core';
import { CommentService } from '../Service/comment.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  comments: any = null;
  comment: String = '';
  apiData: any;
  pages: Array<Number> = [];
  activePage: any = 1;
  constructor(private commentService: CommentService) {
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
}

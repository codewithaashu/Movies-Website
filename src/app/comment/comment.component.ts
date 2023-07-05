import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from '../Service/comment.service';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  commentForm: FormGroup;
  //create an input decorator and take data from decorator
  id: any;
  @Input() _id: any;
  comments: any = null;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private commentService: CommentService,
    private dataService: DataService
  ) {
    this.commentForm = fb.group({
      comment: ['', Validators.required],
      name: ['', Validators.required],
      email: [''],
      phone: [''],
    });
  }
  ngOnInit() {
    this.commentService.getComments(this._id).subscribe((data: any) => {
      this.comments = data.comments
        .sort((a: any, b: any) => b.commentTime.localeCompare(a.commentTime))
        .splice(0, 10);
    });
  }
  convertDateTimeFormat(date: any) {
    return this.dataService.convertDateTimeFormat(date);
  }
  formSubmit(_id: any) {
    if (this.commentForm.valid) {
      this.commentService
        .addComment(this.commentForm.value, _id)
        .subscribe((data: any) => {
          this.toast.success(data?.message);
          this.commentService.getComments(this._id).subscribe((data: any) => {
            this.comments = data.comments
              .sort((a: any, b: any) =>
                b.commentTime.localeCompare(a.commentTime)
              )
              .splice(0, 10);
          });
          this.commentForm.reset();
        });
    } else {
      this.toast.error('Please filled all the fields.');
    }
  }
}

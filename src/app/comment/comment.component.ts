import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from '../Service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  commentForm: FormGroup;
  //create an input decorator and take data from decorator
  id: any;
  month = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  @Input() _id: any;
  comments: any;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private commentService: CommentService
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
      this.comments = data.comments;
      console.log(data);
    });
  }
  convertDateTimeFormat(data: any) {
    const dateTimeArr = data.split(',');
    const time = dateTimeArr[1];
    const dateArr = dateTimeArr[0].split('/');
    const month = this.month[Number(dateArr[0])];
    const date = Number(dateArr[1]);
    const year = Number(dateArr[2]);
    return date + ' ' + month + ' ' + year + '  -  ' + time;
  }
  formSubmit(_id: any) {
    if (this.commentForm.valid) {
      console.log(this.commentForm.value);
      this.commentService
        .addComment(this.commentForm.value, _id)
        .subscribe((data: any) => {
          console.log(data);
          this.toast.success(data?.message);
          this.commentService.getComments(this._id).subscribe((data: any) => {
            this.comments = data.comments;
            console.log(data);
          });
          this.commentForm.reset();
        });
    } else {
      this.toast.error('Please filled all the fields.');
    }
  }
}

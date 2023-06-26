import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  URI = `${this.data.baseURI}/comment`;
  constructor(private http: HttpClient, private data: DataService) {}
  addComment(postData: any, id: String) {
    return this.http.post(`${this.URI}/${id}`, postData);
  }
  getComments(id: String) {
    return this.http.get(`${this.URI}/${id}`);
  }
  getAllComments() {
    return this.http.get(this.URI);
  }
}

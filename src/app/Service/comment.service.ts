import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  URI = 'http://localhost:9000/comment';
  constructor(private http: HttpClient) {}
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

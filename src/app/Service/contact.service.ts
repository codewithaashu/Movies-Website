import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  URI = 'http://localhost:9000/message';
  constructor(private http: HttpClient) {}

  sendMessage(postData: any) {
    console.log(postData);
    return this.http.post(this.URI, postData);
  }
  getMessages() {
    return this.http.get(this.URI);
  }
  getMessage(id: String) {
    return this.http.get(`${this.URI}/${id}`);
  }
}

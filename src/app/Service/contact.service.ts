import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  URI = `${this.data.baseURI}/message`;
  constructor(private http: HttpClient, private data: DataService) {}

  sendMessage(postData: any) {
    return this.http.post(this.URI, postData);
  }
  getMessages() {
    return this.http.get(this.URI);
  }
  getMessage(id: String) {
    return this.http.get(`${this.URI}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URI = `${this.data.baseURI}/user`;
  constructor(private http: HttpClient, private data: DataService) {}
  registerUser(postData: Array<Object> | undefined) {
    return this.http.post(this.URI, postData);
  }
  loginUser(postData: Array<Object> | undefined) {
    return this.http.post(`${this.URI}/login`, postData);
  }
  getUser() {
    return this.http.post(`${this.URI}/verify`, {
      authToken: localStorage.getItem('authToken'),
    });
  }
  getAllUsers() {
    return this.http.get(this.URI);
  }
  getUserDetails(id: String) {
    return this.http.get(`${this.URI}/${id}`);
  }
  updateUserDetails(id: String, postData: Object | null) {
    return this.http.put(`${this.URI}/${id}`, postData);
  }
  deleteUser(id: String) {
    return this.http.delete(`${this.URI}/${id}`);
  }
}

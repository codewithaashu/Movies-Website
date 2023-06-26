import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  URI = `${this.data.baseURI}/movies`;
  constructor(private http: HttpClient, private data: DataService) {}
  getMovies() {
    return this.http.get(this.URI);
  }
  addMovies(postData: any) {
    return this.http.post(this.URI, postData);
  }
  getMovieDetail(_id: any) {
    return this.http.get(`${this.URI}/${_id}`);
  }
  deleteMovie(_id: any) {
    return this.http.delete(`${this.URI}/${_id}`);
  }
  updateMovie(_id: any, postData: any) {
    return this.http.put(`${this.URI}/${_id}`, postData);
  }
}

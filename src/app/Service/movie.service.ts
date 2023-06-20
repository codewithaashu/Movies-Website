import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  URI = 'http://localhost:9000/movies';
  constructor(private http: HttpClient) {}
  getMovies() {
    return this.http.get(this.URI);
  }
  getMovieDetail(_id: any) {
    return this.http.get(`${this.URI}/${_id}`);
  }
  addMovies(postData: any) {
    console.log(postData);

    return this.http.post(this.URI, postData);
  }
}

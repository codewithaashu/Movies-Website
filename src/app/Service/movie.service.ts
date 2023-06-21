import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  URI = 'http://localhost:9000/movies';
  filterCriteria: any;
  genre = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Drama',
    'Family',
    'History',
    'Horror',
    'Romantic',
  ];
  webSeries = [
    'Netflix',
    'Amazon Prime',
    'Jio Cinema',
    'Disney+ Hotstar',
    'MX Player',
    'Apple TV +',
  ];
  filters: Array<any> = [
    'Latest',
    'Trending',
    'Bollywood',
    'South Dubbed',
    'Netflix',
    'Hollywood',
    'Action',
    'Amazon Prime',
    'Crime',
    'MX Player',
    'Horror',
    'Jio Cinema',
    'Disney+ Hotstar',
    'Romantic',
    'Apple TV +',
  ];
  movies = ['Bollywood', 'Hollywood', 'South Dubbed'];
  constructor(private http: HttpClient) {}
  getMovies() {
    return this.http.get(this.URI);
  }
  addMovies(postData: any) {
    console.log(postData);

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

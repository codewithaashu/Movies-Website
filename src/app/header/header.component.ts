import { Component, Output, EventEmitter } from '@angular/core';
import { MovieService } from '../Service/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() getSearch = new EventEmitter();
  @Output() getMovie = new EventEmitter();
  searchMovie: string | undefined;
  genre: any;
  movies: any;
  webSeries: any;
  years: Array<any> = [];
  filters: any;
  constructor(private movie: MovieService) {
    this.genre = movie.genre;
    this.movies = movie.movies;
    this.webSeries = movie.webSeries;
    this.filters = movie.filters;
  }

  searchData(event: any) {
    console.log(event, 'header');
    this.getSearch.emit(event.target.value);
  }
  filterMovie(filter: string) {
    console.log('header', filter);
    this.getMovie.emit(filter);
  }
}

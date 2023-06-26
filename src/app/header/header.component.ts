import { Component, Output, EventEmitter } from '@angular/core';
import { MovieService } from '../Service/movie.service';
import { DataService } from '../Service/data.service';

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
  constructor(private movie: MovieService, private data: DataService) {
    this.genre = data.genre;
    this.movies = data.movies;
    this.webSeries = data.webSeries;
    this.filters = data.filters;
  }

  searchData(event: any) {
    this.getSearch.emit(event.target.value);
  }
  filterMovie(filter: string) {
    this.getMovie.emit(filter);
  }
}

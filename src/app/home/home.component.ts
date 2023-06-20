import { Component } from '@angular/core';
import { MovieService } from '../Service/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  hover: boolean = false;
  hoverIndex: any = null;
  moviesList: any = null;

  onHover(i: any) {
    this.hoverIndex = i;
    this.hover = true;
  }
  offHover() {
    this.hover = false;
  }
  constructor(private movie: MovieService) {
    movie.getMovies().subscribe((data: any) => {
      console.log(data);
      this.moviesList = data.movies;
    });
    console.log('movielist', this.moviesList);
  }
}

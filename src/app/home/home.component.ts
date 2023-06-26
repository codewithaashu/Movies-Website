import { Component } from '@angular/core';
import { MovieService } from '../Service/movie.service';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  hover: boolean = false;
  hoverIndex: any = null;
  moviesList: any = null;
  isFilter: boolean = false;
  search: any;
  filter: any;

  onHover(i: any) {
    this.hoverIndex = i;
    this.hover = true;
  }
  offHover() {
    this.hover = false;
  }
  getSearchVal($event: any) {
    this.search = $event;
  }
  getMovieVal(filter: any) {
    this.isFilter = true;
    this.filter = filter;
  }
  constructor(private movie: MovieService, private dataService: DataService) {
    this.isFilter = dataService.filterCriteria ? true : false;
    this.filter = dataService.filterCriteria;
    movie.getMovies().subscribe((data: any) => {
      this.moviesList = data.movies.sort((a: any, b: any) =>
        b.uploadedDate.localeCompare(a.uploadedDate)
      );
    });
  }
}

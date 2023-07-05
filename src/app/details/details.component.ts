import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../Service/movie.service';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  location = window.location.href;
  params: any = 0;
  movie: any = null;
  recentMoviesList: any = null;
  getMovieVal(filter: any) {
    this.dataService.filterCriteria = filter;
  }
  navigateMovie(id: any) {
    this.movie = null;
    this.movieService.getMovieDetail(id).subscribe((data: any) => {
      this.movie = data.movie;
      window.scrollTo(0, 0);
    });
  }
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private dataService: DataService
  ) {
    window.scrollTo(0, 0);
    this.params = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetail(this.params).subscribe((data: any) => {
      this.movie = data.movie;
    });
    movieService.getMovies().subscribe((data: any) => {
      this.recentMoviesList = data.movies
        .sort((a: any, b: any) => b.uploadedDate.localeCompare(a.uploadedDate))
        .splice(0, 10)
        .filter((curr: any) => {
          return curr._id !== this.params;
        });
    });
  }
}

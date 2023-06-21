import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../Service/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  params: any = 0;
  movie: any = null;
  getMovieVal(filter: any) {
    console.log('passing data from header', filter);
    console.log('filter home', filter);
    this.movieService.filterCriteria = filter;
  }
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    window.scrollTo(0, 0);
    this.params = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetail(this.params).subscribe((data: any) => {
      console.log(data.movie);
      this.movie = data.movie;
    });
  }
}

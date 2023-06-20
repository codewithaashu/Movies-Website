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
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.params = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetail(this.params).subscribe((data: any) => {
      console.log(data.movie);
      this.movie = data.movie;
    });
  }
}

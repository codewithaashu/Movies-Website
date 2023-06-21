import { Component } from '@angular/core';
import { MovieService } from '../Service/movie.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css'],
})
export class DashboardHeaderComponent {
  informationArray: Array<any> = [
    { title: 'Comments', icon: 'fa-regular fa-comment', quantity: 323 },
    { title: 'Movies', icon: 'fa-solid fa-film', quantity: 60 },
    { title: 'Messages', icon: 'fa-regular fa-message', quantity: 45 },
    { title: 'Users', icon: 'fa fa-user', quantity: 38 },
  ];
  moviesList: any = null;
  constructor(private movieService: MovieService) {
    movieService.getMovies().subscribe((data: any) => {
      this.moviesList = data.movies.sort((a: any, b: any) =>
        b.uploadedDate.localeCompare(a.uploadedDate)
      );
    });
  }
}

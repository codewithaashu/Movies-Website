import { Component } from '@angular/core';
import { MovieService } from '../Service/movie.service';
import { ContactService } from '../Service/contact.service';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css'],
})
export class DashboardHeaderComponent {
  moviesList: Array<any> | null = null;
  messageList: Array<any> | null = null;
  informationArray: Array<any> | undefined;
  constructor(
    private movieService: MovieService,
    private message: ContactService,
    private data: DataService
  ) {
    this.informationArray = data.informationArray;
    movieService.getMovies().subscribe((data: any) => {
      this.moviesList = data.movies.sort((a: any, b: any) =>
        b.uploadedDate.localeCompare(a.uploadedDate)
      );
    });
    message.getMessages().subscribe((data: any) => {
      this.messageList = data.messages;
    });
    data.getData().subscribe((resp: any) => {
      data.informationArray[0].quantity = resp.totalComments;
      data.informationArray[1].quantity = resp.totalMovies;
      data.informationArray[2].quantity = resp.totalMessage;
      data.informationArray[3].quantity = resp.totalUsers;
    });
  }
}

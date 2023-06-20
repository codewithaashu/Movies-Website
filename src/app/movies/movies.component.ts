import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MovieService } from '../Service/movie.service';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  modal: boolean = false;
  //create a form
  movieDetailsForm: FormGroup;
  moviesList: any;
  postData: any;
  constructor(private fb: FormBuilder, private movie: MovieService) {
    this.movieDetailsForm = this.fb.group({
      name: new FormControl(),
      posterImg: new FormControl(),
      category: new FormControl(),
      subCategory: new FormControl(),
      releasedDate: new FormControl(),
      rating: new FormControl(),
      language: new FormControl(),
      duration: new FormControl(),
      director: new FormControl(),
      starCast: new FormControl(),
      storyLine: new FormControl(),
      screenshot: new FormControl(),
      downloadingLink: new FormControl(),
      quality: new FormControl(),
      size: new FormControl(),
      genre: this.fb.array(this.genres.map((x) => false)),
      subtitle: new FormControl(),
    });
    movie.getMovies().subscribe((data) => {
      console.log(data);
      this.moviesList = data;
    });
  }
  genres = [
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
  movies = ['Bollywood', 'Hollywood', 'South Dubbed'];
  webSeries = [
    'Netflix',
    'Amazon Prime',
    'Jio Cinema',
    'Disney +',
    'MX Player',
    'Apple TV +',
  ];
  openModal() {
    this.modal = true;
  }
  selectGenre(arr: Array<any>) {
    return this.genres.filter((curr, index) => {
      return arr[index];
    });
  }
  createArray(arg: any) {
    return arg.split(',');
  }
  //on submit
  formSubmit() {
    this.postData = {
      ...this.movieDetailsForm.value,
      genre: this.selectGenre(this.movieDetailsForm.value.genre),
      quality: this.createArray(this.movieDetailsForm.value.quality),
      size: this.createArray(this.movieDetailsForm.value.size),
      downloadingLink: this.createArray(
        this.movieDetailsForm.value.downloadingLink
      ),
    };
    this.movie.addMovies(this.postData).subscribe((data) => {
      console.log(data);
    });
    // console.log({
    //   ...this.movieDetailsForm.value,
    //   genre: this.selectGenre(this.movieDetailsForm.value.genre),
    //   quality: this.createArray(this.movieDetailsForm.value.quality),
    //   size: this.createArray(this.movieDetailsForm.value.size),
    //   downloadingLink: this.createArray(
    //     this.movieDetailsForm.value.downloadingLink
    //   ),
    // });
  }
}

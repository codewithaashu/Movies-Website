import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  modal: boolean = false;
  //create a form
  movieDetailsForm: FormGroup;
  constructor(private fb: FormBuilder) {
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
  //on submit
  formSubmit() {
    console.log({
      ...this.movieDetailsForm.value,
      genre: this.selectGenre(this.movieDetailsForm.value.genre),
    });
  }
}

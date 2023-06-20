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
  isUpdate: boolean = false;
  idUpdate: any = null;
  //create a form
  movieDetailsForm: FormGroup;
  moviesList: any = null;
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
    movie.getMovies().subscribe((data: any) => {
      console.log(data.movies);
      this.moviesList = data.movies;
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

  convertGenreName(arr: Array<any>) {
    return this.genres.filter((curr, index) => {
      return arr[index];
    });
  }
  convertGenreBoolean(arr: Array<any>) {
    console.log(arr);
    const resArr = this.genres.map((curr: any) => {
      if (arr.includes(curr)) {
        return true;
      } else {
        return false;
      }
    });
    return resArr;
  }
  createStringToArray(arg: any) {
    return arg.split(',');
  }

  //on submit
  formSubmit() {
    this.postData = {
      ...this.movieDetailsForm.value,
      genre: this.convertGenreName(this.movieDetailsForm.value.genre),
      quality: this.createStringToArray(this.movieDetailsForm.value.quality),
      size: this.createStringToArray(this.movieDetailsForm.value.size),
      downloadingLink: this.createStringToArray(
        this.movieDetailsForm.value.downloadingLink
      ),
    };
    if (this.isUpdate) {
      this.movie.updateMovie(this.idUpdate, this.postData).subscribe((data) => {
        this.movie.getMovies().subscribe((data: any) => {
          console.log(data.movies);
          this.moviesList = data.movies;
        });
        console.log(data);
      });
    } else {
      this.movie.addMovies(this.postData).subscribe((data) => {
        this.movie.getMovies().subscribe((data: any) => {
          console.log(data.movies);
          this.moviesList = data.movies;
        });
        console.log(data);
      });
    }
    this.movieDetailsForm.reset();
  }

  deleteMovie(id: any) {
    this.movie.deleteMovie(id).subscribe((data) => {
      this.movie.getMovies().subscribe((data: any) => {
        console.log(data.movies);
        this.moviesList = data.movies;
      });
      console.log(data);
    });
  }
  updateMovie(id: any) {
    this.isUpdate = true;
    this.idUpdate = id;
    this.movie.getMovieDetail(id).subscribe((data: any) => {
      console.log(data.movie);
      const {
        name,
        posterImg,
        category,
        subCategory,
        releasedDate,
        rating,
        language,
        duration,
        director,
        starCast,
        storyLine,
        screenshot,
        quality,
        size,
        downloadingLink,
        genre,
        subtitle,
      } = data.movie;
      this.convertGenreBoolean(genre);
      this.movieDetailsForm.controls['name'].setValue(name);
      this.movieDetailsForm.controls['posterImg'].setValue(posterImg);
      this.movieDetailsForm.controls['category'].setValue(category);
      this.movieDetailsForm.controls['subCategory'].setValue(subCategory);
      this.movieDetailsForm.controls['releasedDate'].setValue(releasedDate);
      this.movieDetailsForm.controls['rating'].setValue(rating);
      this.movieDetailsForm.controls['language'].setValue(language);
      this.movieDetailsForm.controls['duration'].setValue(duration);
      this.movieDetailsForm.controls['director'].setValue(director);
      this.movieDetailsForm.controls['starCast'].setValue(starCast);
      this.movieDetailsForm.controls['storyLine'].setValue(storyLine);
      this.movieDetailsForm.controls['screenshot'].setValue(screenshot);
      this.movieDetailsForm.controls['quality'].setValue(quality.toString());
      this.movieDetailsForm.controls['size'].setValue(size.toString());
      this.movieDetailsForm.controls['downloadingLink'].setValue(
        downloadingLink.toString()
      );
      this.movieDetailsForm.controls['genre'].setValue(
        this.convertGenreBoolean(genre)
      );
      this.movieDetailsForm.controls['subtitle'].setValue(subtitle);
    });
  }
}

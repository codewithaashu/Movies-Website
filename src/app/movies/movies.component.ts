import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MovieService } from '../Service/movie.service';
import { DataService } from '../Service/data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  modal: boolean = false;
  isUpdate: boolean = false;
  idUpdate: any = null;
  genres: Array<any>;
  movies: any;
  webSeries: any;
  apiData: any;
  pages: Array<Number> = [];
  activePage: any = 1;
  //create a form
  movieDetailsForm: FormGroup;
  moviesList: any = null;
  postData: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private movie: MovieService,
    private toast: ToastrService
  ) {
    this.genres = dataService.genre;
    this.movies = dataService.movies;
    this.webSeries = dataService.webSeries;
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

    this.getMoviesList();
  }

  convertGenreName(arr: Array<any>) {
    return this.genres.filter((curr, index) => {
      return arr[index];
    });
  }
  convertGenreBoolean(arr: Array<any>) {
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

  getMoviesList() {
    this.pages = [];
    this.movie.getMovies().subscribe((data: any) => {
      this.apiData = data.movies.sort((a: any, b: any) =>
        b.uploadedDate.localeCompare(a.uploadedDate)
      );
      //create pages array
      for (let i = 0; i < this.apiData?.length / 10; i++) {
        this.pages.push(i + 1);
      }
      ///create first page response
      this.moviesList = data.movies
        .slice(0, 10)
        .sort((a: any, b: any) => b.uploadedDate.localeCompare(a.uploadedDate));
    });
  }

  //on submit
  formSubmit() {
    try {
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
        this.movie
          .updateMovie(this.idUpdate, this.postData)
          .subscribe((data) => {
            this.toast.success('Movies updated successfully.');
            this.getMoviesList();
          });
      } else {
        this.movie.addMovies(this.postData).subscribe((data) => {
          console.log('data', data);
          this.toast.success('Movies added successfully.');
          this.getMoviesList();
        });
      }
      this.clearState();
    } catch (err) {
      this.toast.error('Failed', 'Invalid Details');
    }
  }
  clearState() {
    this.isUpdate = false;
    this.movieDetailsForm.reset();
  }
  setMoviesList(pageNo: any) {
    this.activePage = pageNo;
    this.moviesList = this.apiData.slice(
      (pageNo - 1) * 10,
      (pageNo - 1) * 10 + 10
    );
  }
  deleteMovie(id: any) {
    this.movie.deleteMovie(id).subscribe((data) => {
      this.toast.success('Movies deleted successfully');
      this.getMoviesList();
    });
  }
  updateMovie(id: any) {
    this.isUpdate = true;
    this.idUpdate = id;
    this.movie.getMovieDetail(id).subscribe((data: any) => {
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

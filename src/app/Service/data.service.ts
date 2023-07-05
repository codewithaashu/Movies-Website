import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // baseURI = 'http://localhost:9000';
  baseURI = 'https://movie-mania-gzhy.onrender.com';
  filterCriteria: any;
  trendingCriteria: Number = 7.2;
  latestCriteria: Number = 12;
  genre = [
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
  webSeries = [
    'Netflix',
    'Amazon Prime',
    'Jio Cinema',
    'Disney+ Hotstar',
    'MX Player',
    'Apple TV +',
  ];
  filters: Array<any> = [
    'Latest',
    'Trending',
    'Bollywood',
    'South Dubbed',
    'Netflix',
    'Hollywood',
    'Action',
    'Amazon Prime',
    'Crime',
    'MX Player',
    'Horror',
    'Jio Cinema',
    'Disney+ Hotstar',
    'Romantic',
    'Apple TV +',
  ];
  movies = ['Bollywood', 'Hollywood', 'South Dubbed'];
  informationArray: Array<any> = [
    { title: 'Comments', icon: 'fa-regular fa-comment', quantity: null },
    {
      title: 'Movies',
      icon: 'fa-solid fa-film',
      quantity: null,
    },
    {
      title: 'Messages',
      icon: 'fa-regular fa-message',
      quantity: null,
    },
    { title: 'Users', icon: 'fa fa-user', quantity: null },
  ];
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get(`${this.baseURI}/data`);
  }
  month = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  convertDateTimeFormat(arg: any) {
    var d = new Date(arg);
    var currentOffset = d.getTimezoneOffset();
    var ISTOffset = 330;
    var ISTTime = new Date(d.getTime() + (ISTOffset + currentOffset) * 60000);

    var data = ISTTime.toLocaleString();
    const dateTimeArr = data.split(',');
    const time = dateTimeArr[1];
    const dateArr = dateTimeArr[0].split('/');
    const month = this.month[Number(dateArr[0])];
    const date = Number(dateArr[1]);
    const year = Number(dateArr[2]);

    return date + ' ' + month + ' ' + year + '  -  ' + time;
  }
}

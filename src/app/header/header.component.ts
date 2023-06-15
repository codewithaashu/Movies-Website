import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  genre = ["Action","Adventure","Animation","Biography","Comedy","Crime","Drama","Family","History","Horror","Romantic"];
  movies=["Bollywood","Hollywood","South Dubbed"];
  webSeries = ["Netflix","Amazon Prime","Jio Cinema","Disney +","MX Player","Apple TV +"]
  years:Array<any> = [];
  filters:Array<any>=["Latest","Trending","Bollywood","South Dubbed","Netflix","Hollywood","Action","Amazon Prime","Crime","MX Player","Horror","Jio Cinema","Disney+ Hotstar","Romantic","Apple TV +"]
  constructor(){
    for(let i=0;i<15;i++){
      this.years.push(new Date().getFullYear()-i);
    }
    console.log(this.years);
    
  }
}

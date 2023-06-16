import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  hover:boolean = false;
  hoverIndex:any = null;
  moviesList = [{imgSrc:"https://m.media-amazon.com/images/M/MV5BMWQ0MDM4MjQtZTExNy00NDFhLWFlNzUtZDc5NTU1YWRkYTE4XkEyXkFqcGdeQXVyODY1Nzc4NzA@._V1_FMjpg_UX1000_.jpg",title:"Dilwale Dulhaniya Le Jayenge 1998 Hindi ORG 1080p 720p 420p 360p"},
  {imgSrc:"https://www.bollywoodhungama.com/wp-content/uploads/2022/11/Pathaan-4.jpg",title:"Pathan 2023 Hindi ORG 1080p 720p 420p 360p"},
  {imgSrc:"https://m.media-amazon.com/images/M/MV5BNTA5YzE1ODItYmU3MS00OTE3LTk0M2UtYjkxYjgxZDUxZjlmXkEyXkFqcGdeQXVyMTUzNTAxOTg1._V1_.jpg",title:"Jawan 2023 Hindi ORG 1080p 720p 420p 360p"},
]
  onHover(i:any){
    this.hoverIndex = i;
    this.hover= true;
  }
  offHover(){
    this.hover= false;
  }
}

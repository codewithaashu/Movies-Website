import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  params:any=0;
  constructor(private route:ActivatedRoute){
    this.params = route.snapshot.paramMap.get("id");
    console.log(this.params);
  }
}

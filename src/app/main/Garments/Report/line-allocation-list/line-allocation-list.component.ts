import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-line-allocation-list',
  templateUrl: './line-allocation-list.component.html',
  styleUrls: ['./line-allocation-list.component.css']
})
export class LineAllocationListComponent {
  valueExceeded : boolean = false;

constructor(private router : Router , private api: ApiService){}

new(){
  this.router.navigate(['main/lineAllocationReport'])
}
}

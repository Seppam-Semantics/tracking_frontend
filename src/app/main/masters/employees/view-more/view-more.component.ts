import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { LocalService } from 'src/app/main/main/local.service';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {
  details:any;
  constructor(private api:ApiService, private local:LocalService){}

  ngOnInit(): void {
    this.getsingle();
  }

  getsingle(){
    const id = sessionStorage.getItem('moreid');
    const proftoken = 'Bearer '+ sessionStorage.getItem('token');
    this.local.getsingleemployee(id, proftoken).subscribe((res)=>{
      this.details = res.employee
    })
  }

}

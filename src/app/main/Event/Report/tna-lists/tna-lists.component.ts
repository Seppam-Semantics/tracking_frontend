import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { EventsapiService } from '../../eventsapi.service';

@Component({
  selector: 'app-tna-lists',
  templateUrl: './tna-lists.component.html',
  styleUrls: ['./tna-lists.component.css']
})
export class TnaListsComponent implements OnInit{
  tnalists: any;


  constructor(private router : Router, private api : ApiService, private api1 : EventsapiService){

  }
  ngOnInit(): void {
    this.api1.getAllTNA().subscribe((res)=>{
      this.tnalists = res.data
    })
  }

  newwindow(){
    this.router.navigate(['/main/EventTranscation'])
  }

  updatewindow(){
    this.router.navigate(['/main/EventUpdate'])
  }
}

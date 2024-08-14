import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tna-event-update',
  templateUrl: './tna-event-update.component.html',
  styleUrls: ['./tna-event-update.component.css']
})
export class TnaEventUpdateComponent implements OnInit {

  constructor(private router : Router){

  }

  ngOnInit(): void {
   
  }

  back(){
    this.router.navigate(['main/EventList'])
  }

}

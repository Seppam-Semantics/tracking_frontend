import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventsapiService } from '../../eventsapi.service';

@Component({
  selector: 'app-event-master',
  templateUrl: './event-master.component.html',
  styleUrls: ['./event-master.component.css']
})
export class EventMasterComponent implements OnInit{
  eventmasternew : boolean = false;
  eventmasteredit : boolean = false
  EventMasterNewFrom : FormGroup
  EventMasterEditFrom : FormGroup
  eventsData: any;
  eventfilter : any


  constructor(private api : EventsapiService){
    this.EventMasterNewFrom = new FormGroup({
      id :  new FormControl(),
      apiLink:  new FormControl(),
      eventData :  new FormControl()
    })

    this.EventMasterEditFrom = new FormGroup({
      id :  new FormControl(),
      apiLink:  new FormControl(),
      eventData :  new FormControl()
    })
  }
ngOnInit(): void {
  this.eventsfilter();
}


eventsfilter(){
  this.api.eventmaster(this.eventfilter).subscribe((res)=>{
    this.eventsData = res.data
  })
}

new(){
  this.eventmasternew = true;
}

edit(id:any){
  this.eventmasteredit = true;
  this.api.singleEvent(id).subscribe((res)=>{
    this.EventMasterEditFrom.patchValue({
      id :  res.data[0].id,
      apiLink:  res.data[0].links,
      eventData :  res.data[0].events
    })
  })
}

save(){
  console.log(this.EventMasterNewFrom.value)
  this.api.posteventmaster(this.EventMasterNewFrom.value).subscribe((res)=>{
    alert(res.message)
    this.EventMasterNewFrom.reset()
    this.eventsfilter();
    this.eventmasternew = false;
  })
}

update(){
  console.log(this.EventMasterEditFrom.value)
  this.api.posteventmaster(this.EventMasterEditFrom.value).subscribe((res)=>{
    alert(res.message)
    this.eventsfilter();
  })
}
}

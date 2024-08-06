import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  constructor(){
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

}
new(){
  this.eventmasternew = true;
}
edit(){
  this.eventmasteredit = true;
}
save(){
  console.log(this.EventMasterNewFrom.value)
  this.EventMasterNewFrom.reset()
}
update(){
  console.log(this.EventMasterEditFrom.value)
  this.EventMasterEditFrom.reset()
}
}

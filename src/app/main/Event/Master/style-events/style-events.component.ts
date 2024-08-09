import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { EventsapiService } from '../../eventsapi.service';

@Component({
  selector: 'app-style-events',
  templateUrl: './style-events.component.html',
  styleUrls: ['./style-events.component.css']
})
export class StyleEventsComponent implements OnInit{
  styleeventmasternew : boolean = false;
  styleeventmasteredit : boolean = false
  Stylenamevalue: any;
  styleid: any;
  StyleEventsNewForm:FormGroup
  StyleEventsEditForm:FormGroup
  styleDropdata: any;
  DummyData:any;
  selectedEvent: any;
  styleEventData: any;
  gotEvents: any;


  constructor(private api : ApiService , private fb : FormBuilder, private api1 : EventsapiService){
    this.StyleEventsNewForm = new FormGroup({
      id :  new FormControl(),
      style :  new FormControl(),
      styleId : new FormControl(),
      serialNo :  new FormControl(),
      eventname : new FormControl(),
      data : new FormControl()
    })

    this.StyleEventsEditForm = new FormGroup({
      id :  new FormControl(),
      style :  new FormControl(),
      styleId : new FormControl(),
      serialNo :  new FormControl(),
      eventname : new FormControl(),
      data : new FormControl()
    })
  }

ngOnInit(): void {
  this.filterset()
  this.api.Drop_Style_master().subscribe((res)=>{
    this.styleDropdata = res.style
  })
  this.api1.eventmaster().subscribe((res)=>{
    this.DummyData = res.data
  })

}

getstyleId() {
  this.api.StyleId(this.Stylenamevalue).subscribe((res)=>{
    this.styleid = res.style[0].id

    this.StyleEventsNewForm.patchValue({
      styleId : this.styleid 
    })
  })
}
new(){
  this.styleeventmasternew = true;
}
filterset(){
  this.api1.style_event_master().subscribe((res)=>{
    // console.log(res)
    this.styleEventData = res.data
  })
}

edit(id: any) {
  this.styleeventmasteredit = true;
  this.api1.single_style_event_master(id).subscribe((res) => {
    this.gotEvents = JSON.parse(res.data[0].events)
    this.selectedEvent = JSON.parse(res.data[0].events).map((event: any) => ({
      id: event.id,
      events: event.events,
      eventId: event.eventId
    }));

    const eventArray = this.selectedEvent.map((event: any) => event.eventId);

    this.StyleEventsEditForm.patchValue({
      id: res.data[0].id,
      style: res.data[0].style,
      styleId: res.data[0].styleId,
      serialNo: res.data[0].serialNo,
      eventname: eventArray
    });

    this.getSelectedEventDetails();
  });
}


getSelectedEventDetails() {
  const selectedEventIds = this.StyleEventsEditForm.get('eventname')?.value || [];

  const filteredEvents = this.DummyData.filter((event: any) => selectedEventIds.includes(event.id));

  this.selectedEvent = filteredEvents.map((event: any) => ({
    id: this.gotEvents.find((e: any) => e.eventId === event.id)?.id || 0, 
    events: event.events,
    eventId: event.id
  }));
    this.StyleEventsEditForm.patchValue({
    data: this.selectedEvent
  });
}


getSelectedEvents() {
  const selectedEventIds = this.StyleEventsNewForm.get('eventname')?.value || [];

  const filteredEvents = this.DummyData
    .filter((event: { id: number }) => selectedEventIds.includes(event.id));

  this.selectedEvent = filteredEvents.map((event: any) => ({
    id: 0,
    events: event.events,
    eventId: event.id
  }));
  console.log('DummyData:', this.DummyData);

  this.StyleEventsNewForm.patchValue({
    data: this.selectedEvent
  });
}


dataJson(data:any){
  return JSON.parse(data);
}

save(){
  console.log(this.StyleEventsNewForm.value)
  this.api1.postStyleEventMaster(this.StyleEventsNewForm.value).subscribe((res)=>{
    alert(res.message);
    if(res.success == true){
      this.StyleEventsNewForm.reset()
      this.filterset()
      this.styleeventmasternew = false
    }
  })
}
update(){
  console.log(this.StyleEventsEditForm.value)
  this.api1.postStyleEventMaster(this.StyleEventsEditForm.value).subscribe((res)=>{
    alert(res.message);
    if(res.success == true){
      this.filterset()
      this.StyleEventsEditForm.reset()
      this.styleeventmasteredit = false
    }
  })
}

}

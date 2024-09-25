import { ChangeDetectorRef, Component, NgZone, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { EventsapiService } from '../../eventsapi.service';
import { Dropdown } from 'primeng/dropdown';

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
  selectedEvent: any[] = [];
  styleEventData: any;
  gotEvents: any;
  valueExceeded : boolean = false
  changes : boolean[] = [];


  constructor(private api : ApiService , private fb : FormBuilder, private api1 : EventsapiService, private cdr: ChangeDetectorRef, private ngZone: NgZone){
    this.StyleEventsNewForm = new FormGroup({
      id :  new FormControl(),
      style :  new FormControl(),
      styleId : new FormControl(),
      data : this.fb.array([])
    })

    this.StyleEventsEditForm = new FormGroup({
      id :  new FormControl(),
      style :  new FormControl(),
      styleId : new FormControl(),
      data : this.fb.array([])
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

get rows(): FormArray {
  return this.StyleEventsNewForm.get('data') as FormArray;
}

get rowsupdate(): FormArray {
  return this.StyleEventsEditForm.get('data') as FormArray;
}

addRow(){
  const details = this.fb.group({
    id: [0],
    serialNo: [],
    eventname: [],
    eventId : []
  });
  this.rows.push(details);
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
      // serialNo : event.serialNo,
      // eventname: event.events,
      // eventId: event.eventId
    }));

    const eventArray = this.selectedEvent.map((event: any) => event.eventId);

    this.StyleEventsEditForm.patchValue({
      id: res.data[0].id,
      style: res.data[0].style,
      styleId: res.data[0].styleId
    });

    this.getSelectedEventDetails();
  });
}


getSelectedEventDetails() {
  const selectedEventIds = this.StyleEventsEditForm.get('eventname')?.value || [];

  const filteredEvents = this.DummyData.filter((event: any) => selectedEventIds.includes(event.id));

  this.selectedEvent = filteredEvents.map((event: any) => ({
    id: this.gotEvents.find((e: any) => e.eventId === event.id)?.id || 0, 
    serialNo : event.serialNo,
    eventname: event.events,
    eventId: event.id
  }));
    this.StyleEventsEditForm.patchValue({
    data: this.selectedEvent
  });
}


getSelectedEvents(index : any) {
  const formArray = this.StyleEventsNewForm.get('data') as FormArray;
  const row = formArray.at(index);
  const selectedEventIds = row.get('eventname')?.value;
  const filteredEvents = this.DummyData
    .filter((event: { id: number }) => selectedEventIds == event.id);

    
const patch = filteredEvents.map((event: any) => ({
  id: 0,
  eventname: event.events,
  eventId: event.id
}));
  this.selectedEvent.push(patch[0])

  this.StyleEventsNewForm.patchValue({
    data: this.selectedEvent
  });
}


dataJson(data:any){
  return JSON.parse(data);
}



@ViewChildren('events') events!: QueryList<Dropdown>;
eventslist(i: number): void {
  try{
  if (this.events) {
    setTimeout(() => {
      this.ngZone.run(() => {
        const events = this.events.toArray();
        if (events[i]) {
          events[i].show();
        }
        this.cdr.detectChanges();
      });
    }, 0);
  }
} catch{

}
}



save(){
  // console.log(this.StyleEventsNewForm.value)
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
  // console.log(this.StyleEventsEditForm.value)
  // this.api1.postStyleEventMaster(this.StyleEventsEditForm.value).subscribe((res)=>{
  //   alert(res.message);
  //   if(res.success == true){
  //     this.filterset()
  //     this.StyleEventsEditForm.reset()
  //     this.styleeventmasteredit = false
  //   }
  // })
}

}

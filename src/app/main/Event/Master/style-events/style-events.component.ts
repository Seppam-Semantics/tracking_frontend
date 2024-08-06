import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

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
  DummyData:any =[{ id : 1 , Entry : "entry-1"},{ id : 2 , Entry : "entry-2"},{ id : 3 , Entry : "entry-3"},
    { id : 4 , Entry : "entry-4"},{ id : 5 , Entry : "entry-5"}
  ]
  selectedEvent: any;
  constructor(private api : ApiService , private fb : FormBuilder){
    this.StyleEventsNewForm = new FormGroup({
      id :  new FormControl(),
      style :  new FormControl(),
      styleId : new FormControl(),
      seriesNo :  new FormControl(),
      eventname : new FormControl(),
      data : new FormControl()
    })

    this.StyleEventsEditForm = new FormGroup({
      id :  new FormControl(),
      style :  new FormControl(),
      styleId : new FormControl(),
      seriesNo :  new FormControl(),
      eventname : new FormControl(),
      data : new FormControl()
    })
  }

ngOnInit(): void {
  this.api.Drop_Style_master().subscribe((res)=>{
    this.styleDropdata = res.style
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
edit(){
  this.styleeventmasteredit = true;
}

getSelectedEvent() {
  const selectedEventIds = this.StyleEventsNewForm.get('eventname')?.value || [];

  this.selectedEvent = this.DummyData
    .filter((Event: { id: number; Event: string }) => selectedEventIds.includes(Event.id));

  this.selectedEvent = this.selectedEvent.map((Event: any) => {
    return { ...Event, lineid: 0 };
  });

  this.StyleEventsNewForm.patchValue({
    data: this.selectedEvent
  });
}


save(){
  console.log(this.StyleEventsNewForm.value)
}
update(){
  console.log(this.StyleEventsEditForm.value)
}

}

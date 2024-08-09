import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { EventsapiService } from '../../eventsapi.service';

@Component({
  selector: 'app-style-budget-days',
  templateUrl: './style-budget-days.component.html',
  styleUrls: ['./style-budget-days.component.css']
})
export class StyleBudgetDaysComponent implements OnInit{
  stylebudgetmasternew : boolean = false;
  stylebudgetmasteredit : boolean = false
  Stylenamevalue: any;
  styleid: any;
  StyleBudgetNewForm:FormGroup
  StyleBudgetEditForm:FormGroup
  styleDropdata: any;
  selectedEvent: any;
  styleEvents: any;
  constructor(private api : ApiService , private fb : FormBuilder, private api1 : EventsapiService){
    this.StyleBudgetNewForm = new FormGroup({
      id :  new FormControl(),
      style :  new FormControl(),
      styleId : new FormControl(),
      fromEvent :  new FormControl(),
      toEvent : new FormControl(),
      budgetDays : new FormControl()
    })

    this.StyleBudgetEditForm = new FormGroup({
      id :  new FormControl(),
      style :  new FormControl(),
      styleId : new FormControl(),
      fromEvent :  new FormControl(),
      toEvent : new FormControl(),
      budgetDays : new FormControl()
    })
  }

ngOnInit(): void {
  this.api1.stylesforbudget().subscribe((res)=>{
    this.styleDropdata = res.data
  })
}

getstyleId() {
  this.api.StyleId(this.Stylenamevalue).subscribe((res)=>{
    this.styleid = res.style[0].id

    this.StyleBudgetNewForm.patchValue({
      styleId : this.styleid 
    })
  })
  this.api1.eventsbystyle(this.Stylenamevalue).subscribe((res)=>{
    this.styleEvents = res.data
    console.log(res)
  })
}


new(){
  this.stylebudgetmasternew = true;
}
edit(){
  this.stylebudgetmasteredit = true;
}

save(){
  console.log(this.StyleBudgetNewForm.value)
}
update(){
  console.log(this.StyleBudgetEditForm.value)
}

}

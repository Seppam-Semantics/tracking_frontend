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
  budgetDaysForEvents: any;
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
  this.styleFilter()
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
  })
}

styleFilter(style:string = ''){
  this.api1.getAllStyleBudgetDays(style).subscribe((res)=>{
    this.budgetDaysForEvents = res.data
  })
}


new(){
  this.stylebudgetmasternew = true;
}

edit(id:any){
  this.stylebudgetmasteredit = true;
  this.api1.singleStyleBudgetDays(id).subscribe((res)=>{
    console.log(res)
    this.StyleBudgetEditForm.patchValue({
      id :  res.data[0].id,
      style :  res.data[0].style,
      styleId : res.data[0].styleId,
      fromEvent :  res.data[0].fromEvent,
      toEvent : res.data[0].toEvent,
      budgetDays : res.data[0].budgetDays
    })
      this.Stylenamevalue = this.StyleBudgetEditForm.get('style')?.value
  this.api1.eventsbystyle(this.Stylenamevalue).subscribe((res)=>{
    this.styleEvents = res.data
  })
  })
}

save(){
  console.log(this.StyleBudgetNewForm.value)
  this.api1.postbudgetDays(this.StyleBudgetNewForm.value).subscribe((res)=>{
    alert(res.message);
    this.styleFilter()
    this.StyleBudgetNewForm.reset()
    this.stylebudgetmasternew = false;
  })
}
update(){
  console.log(this.StyleBudgetEditForm.value)
  this.api1.postbudgetDays(this.StyleBudgetEditForm.value).subscribe((res)=>{
    alert(res.message);
    this.styleFilter()
    this.StyleBudgetEditForm.reset()
  this.stylebudgetmasteredit = false;
  })
}

}

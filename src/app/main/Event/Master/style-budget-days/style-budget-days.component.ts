import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

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
  constructor(private api : ApiService , private fb : FormBuilder){
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
  this.api.Drop_Style_master().subscribe((res)=>{
    this.styleDropdata = res.style
  })

}

getstyleId() {
  this.api.StyleId(this.Stylenamevalue).subscribe((res)=>{
    this.styleid = res.style[0].id

    this.StyleBudgetNewForm.patchValue({
      styleId : this.styleid 
    })
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

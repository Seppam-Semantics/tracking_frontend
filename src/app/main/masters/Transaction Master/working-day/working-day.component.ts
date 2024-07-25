import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-working-day',
  templateUrl: './working-day.component.html',
  styleUrls: ['./working-day.component.css']
})
export class WorkingDayComponent implements OnInit{
  WorkingDaycreationpopup : boolean = false
  WorkingDayupdatepopup : boolean = false
  WorkingDaycreate : FormGroup
  WorkingDayupdate : FormGroup
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){

    this.WorkingDaycreate = this.fb.group({
      id : new FormControl('') , 
      date : new FormControl('') ,
      workhrs : new FormControl('') 
    })


    this.WorkingDayupdate = this.fb.group({
      id : new FormControl('') , 
      date : new FormControl('') ,
      workhrs : new FormControl('') 
    })
  }


  WorkingDaycreateOpen1(){
    this.WorkingDaycreationpopup = true
  }

  WorkingDaycreateOpen2(){
    this.WorkingDayupdatepopup = true
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

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
  allData: any;
  workingdayAlldata: any;
  ngOnInit(): void {
    this.api.workingdaylist().subscribe((res)=>{
      this.allData = res.workingday
     })
  }
  constructor(private fb : FormBuilder , private api : ApiService){

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

  save(){
    this.api.workingdaylistPost(this.WorkingDaycreate.value).subscribe((res)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.api.workingdaylist().subscribe((res)=>{
        this.allData = res.workingday
       })
       this.WorkingDaycreationpopup = false
    })
  }

  edit(id:any){
    this.WorkingDayupdatepopup = true
    this.api.workingdaylistid(id).subscribe((res)=>{
    this.workingdayAlldata = res.workingday[0]
      this.WorkingDayupdate.patchValue({
        id : this.workingdayAlldata.id , 
        date : this.workingdayAlldata.date ,
        workhrs : this.workingdayAlldata.workhrs
      })
  })
  }

  update(){
    this.api.workingdaylistPost(this.WorkingDayupdate.value).subscribe((res)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.api.workingdaylist().subscribe((res)=>{
        this.allData = res.workingday
       })
       this.WorkingDayupdatepopup = false
    })
  }
}

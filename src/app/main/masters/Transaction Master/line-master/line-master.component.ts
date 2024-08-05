import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-line-master',
  templateUrl: './line-master.component.html',
  styleUrls: ['./line-master.component.css']
})
export class LineMasterComponent implements OnInit{
  linecreationpopup : boolean = false
  lineupdatepopup : boolean = false
  linecreate : FormGroup
  lineupdate : FormGroup
  AllData: any;
  lineData: any;
  ngOnInit(): void {
    this.api.line().subscribe((res)=>{
      this.AllData = res.line
    })
  }

  constructor(private fb : FormBuilder , private api : ApiService){

    this.linecreate = this.fb.group({
      id : new FormControl('') , 
      line : new FormControl('') ,
      lineno : new FormControl('') ,
    })


    this.lineupdate = this.fb.group({
      id : new FormControl('') , 
      line : new FormControl('') ,
      lineno : new FormControl('') ,
    })
  }

  Save(){
    this.api.linePost(this.linecreate.value).subscribe((res)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });

      this.api.line().subscribe((res)=>{
        this.AllData = res.line
      })

      this.linecreationpopup = false;      
      this.linecreate.reset()
    })

  }


  update(){
    this.api.linePost(this.lineupdate.value).subscribe((res)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.lineupdatepopup = false;
      this.api.line().subscribe((res)=>{
        this.AllData = res.line
      })
  
    })
  }

  linecreateOpen1(){
    this.linecreationpopup = true
  }

  linecreateOpen2(id:any){
    this.lineupdatepopup = true
    this.api.lineid(id).subscribe((res)=>{
    this.lineData =  res.line[0]
     this.lineupdate.patchValue({
      id : this.lineData.id , 
      line : this.lineData.line ,
      lineno : this.lineData.lineno
     })
    })
  }

}

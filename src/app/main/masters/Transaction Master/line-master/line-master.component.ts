import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  ngOnInit(): void {
    
  }

  constructor(private fb : FormBuilder){

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


  linecreateOpen1(){
    this.linecreationpopup = true
  }

  linecreateOpen2(){
    this.lineupdatepopup = true
  }
}

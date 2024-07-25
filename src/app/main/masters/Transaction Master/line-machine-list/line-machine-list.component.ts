import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-line-machine-list',
  templateUrl: './line-machine-list.component.html',
  styleUrls: ['./line-machine-list.component.css']
})
export class LineMachineListComponent implements OnInit{
  LineMachinelistcreationpopup : boolean = false
  LineMachinelistupdatepopup : boolean = false
  LineMachinelistcreate : FormGroup
  LineMachinelistupdate : FormGroup
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){

    this.LineMachinelistcreate = this.fb.group({
      id : new FormControl('') , 
      style : new FormControl('') ,
      prodHr : new FormControl('') ,
      line : new FormControl('') 
    })


    this.LineMachinelistupdate = this.fb.group({
      id : new FormControl('') , 
      style : new FormControl('') ,
      prodHr : new FormControl('') ,
      line : new FormControl('') 
    })
  }


  LineMachinecreateOpen1(){
    this.LineMachinelistcreationpopup = true
  }

  LineMachinecreateOpen2(){
    this.LineMachinelistupdatepopup = true
  }

}

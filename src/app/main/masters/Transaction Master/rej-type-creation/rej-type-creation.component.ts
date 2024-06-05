import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rej-type-creation',
  templateUrl: './rej-type-creation.component.html',
  styleUrls: ['./rej-type-creation.component.css']
})
export class RejTypeCreationComponent {
  rejTypecreation : boolean = false;

  rejTypeediting : boolean = false;
  
  rejTypecreate! : FormGroup
  
  rejTypeedit! : FormGroup
  
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){
  
    this.rejTypecreate = this.fb.group({
      id : new FormControl('') , 
      rejType : new FormControl('') ,  
      rejectName : new FormControl('') ,  
      colors : new FormControl('') ,   
      loss : new FormControl('') 
    })
  
  
    this.rejTypeedit = this.fb.group({
      id : new FormControl('') , 
      rejType : new FormControl('') ,  
      rejectName : new FormControl('') ,  
      colors : new FormControl('') ,   
      loss : new FormControl('') 
    })
  }
  
  saveButton(){
    console.log(this.rejTypecreate.value)
  }
}
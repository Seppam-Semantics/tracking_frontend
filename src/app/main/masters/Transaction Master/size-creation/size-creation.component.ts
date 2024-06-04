import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-size-creation',
  templateUrl: './size-creation.component.html',
  styleUrls: ['./size-creation.component.css']
})
export class SizeCreationComponent {
  Sizecreation : boolean = false;

  Sizeediting : boolean = false;
  
  Sizecreate! : FormGroup
  
  Sizeedit! : FormGroup
  
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){
  
    this.Sizecreate = this.fb.group({
      id : new FormControl('') , 
      size : new FormControl('') 
    })
  
  
    this.Sizeedit = this.fb.group({
      id : new FormControl('') , 
      size : new FormControl('') 
    })
  }
  
  saveButton(){
    console.log(this.Sizecreate.value)
  }
}
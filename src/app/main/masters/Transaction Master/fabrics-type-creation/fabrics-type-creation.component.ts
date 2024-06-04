import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fabrics-type-creation',
  templateUrl: './fabrics-type-creation.component.html',
  styleUrls: ['./fabrics-type-creation.component.css']
})
export class FabricsTypeCreationComponent {
  fabricsTypecreation : boolean = false;

  fabricsTypeediting : boolean = false;
  
  fabricsTypecreate! : FormGroup
  
  fabricsTypeedit! : FormGroup
  
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){
  
    this.fabricsTypecreate = this.fb.group({
      id : new FormControl('') , 
      fabricsType : new FormControl('') ,  
      fabricsTypeDescription : new FormControl('') ,   
      dyeProcessLoss : new FormControl('') ,   
    })
  
  
    this.fabricsTypeedit = this.fb.group({
      id : new FormControl('') , 
      fabricsType : new FormControl('') ,  
      fabricsTypeDescription : new FormControl('') ,  
      dyeProcessLoss : new FormControl('') 
    })
  }
  
  saveButton(){
    console.log(this.fabricsTypecreate.value)
  }
}
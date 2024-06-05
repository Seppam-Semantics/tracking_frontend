import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dye-type-creation',
  templateUrl: './dye-type-creation.component.html',
  styleUrls: ['./dye-type-creation.component.css']
})
export class DyeTypeCreationComponent {
  dyeTypecreation : boolean = false;

  dyeTypeediting : boolean = false;
  
  dyeTypecreate! : FormGroup
  
  dyeTypeedit! : FormGroup
  
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){
  
    this.dyeTypecreate = this.fb.group({
      id : new FormControl('') , 
      dyeType : new FormControl('') ,  
      dyeingProcess : new FormControl('') ,  
      fabricsTypeDescription : new FormControl('') ,   
      dyeProcessLoss : new FormControl('')
    })
  
  
    this.dyeTypeedit = this.fb.group({
      id : new FormControl('') , 
      dyeType : new FormControl('') ,  
      dyeingProcess : new FormControl('') ,  
      fabricsTypeDescription : new FormControl('') ,   
      dyeProcessLoss : new FormControl('') 
    })
  }
  
  saveButton(){
    console.log(this.dyeTypecreate.value)
  }
}
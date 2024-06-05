import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dye-fty-creation',
  templateUrl: './dye-fty-creation.component.html',
  styleUrls: ['./dye-fty-creation.component.css']
})
export class DyeFtyCreationComponent {
  dyeFtycreation : boolean = false;

  dyeFtyediting : boolean = false;
  
  dyeFtycreate! : FormGroup
  
  dyeFtyedit! : FormGroup
  
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){
  
    this.dyeFtycreate = this.fb.group({
      id : new FormControl('') , 
      dyeingFactoryName : new FormControl('') ,  
      dyeingLocation : new FormControl('') ,  
      contactDetails : new FormControl('') ,   
      legalFactoryName : new FormControl('') 
    })
  
  
    this.dyeFtyedit = this.fb.group({
      id : new FormControl('') , 
      dyeingFactoryName : new FormControl('') ,  
      dyeingLocation : new FormControl('') ,  
      contactDetails : new FormControl('') ,   
      legalFactoryName : new FormControl('') 
    })
  }
  
  saveButton(){
    console.log(this.dyeFtycreate.value)
  }
}
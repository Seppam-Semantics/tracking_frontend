import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-yarn-type-creation',
  templateUrl: './yarn-type-creation.component.html',
  styleUrls: ['./yarn-type-creation.component.css']
})
export class YarnTypeCreationComponent {
  yarnTypecreation : boolean = false;

  yarnTypeediting : boolean = false;
  
  yarnTypecreate! : FormGroup
  
  yarnTypeedit! : FormGroup
  
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){
  
    this.yarnTypecreate = this.fb.group({
      id : new FormControl('') , 
      yarnType : new FormControl('') ,  
      yarnTypeDescription : new FormControl('')  
    })
  
  
    this.yarnTypeedit = this.fb.group({
      id : new FormControl('') , 
      yarnType : new FormControl('') ,  
      yarnTypeDescription : new FormControl('') 
    })
  }
  
  saveButton(){
    console.log(this.yarnTypecreate.value)
  }
}
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-color-creation',
  templateUrl: './color-creation.component.html',
  styleUrls: ['./color-creation.component.css']
})
export class ColorCreationComponent {

  Colorcreation : boolean = false;

  Colorediting : boolean = false;
  
  Colorcreate! : FormGroup
  
  Coloredit! : FormGroup
  
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){
  
    this.Colorcreate = this.fb.group({
      id : new FormControl('') , 
      colorName : new FormControl('') ,
      colorCode : new FormControl(''),
      buyerName : new FormControl('') , 
      diaCorrection : new FormControl('') , 
      dyeProcessLoss : new FormControl('')
    })
  
  
    this.Coloredit = this.fb.group({
      id : new FormControl('') , 
      colorName : new FormControl('') ,
      colorCode : new FormControl(''),
      buyerName : new FormControl('') , 
      diaCorrection : new FormControl('') , 
      dyeProcessLoss : new FormControl('')
    })
  }
  
  saveButton(){
    console.log(this.Colorcreate.value)
  }
}
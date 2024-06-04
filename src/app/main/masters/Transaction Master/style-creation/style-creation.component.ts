import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-style-creation',
  templateUrl: './style-creation.component.html',
  styleUrls: ['./style-creation.component.css']
})
export class StyleCreationComponent implements OnInit{
  Stylecreation : boolean = false;

  Styleediting : boolean = false;
  
  Stylecreate! : FormGroup
  
  Styleedit! : FormGroup
  
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){
  
    this.Stylecreate = this.fb.group({
      id : new FormControl('') , 
      styleName : new FormControl('') ,
      styleCode : new FormControl(''),
      styleType : new FormControl('') , 
      utility : new FormControl('') , 
      buyerName : new FormControl('') , 
      brand : new FormControl('') 
    })
  
  
    this.Styleedit = this.fb.group({
      id : new FormControl('') , 
      styleName : new FormControl('') ,
      styleCode : new FormControl(''),
      styleType : new FormControl('') , 
      utility : new FormControl('') , 
      buyerName : new FormControl('') , 
      brand : new FormControl('') 
    })
  }
  
  saveButton(){
    console.log(this.Stylecreate.value)
  }
  
  }
  
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-spin-fty-creation',
  templateUrl: './spin-fty-creation.component.html',
  styleUrls: ['./spin-fty-creation.component.css']
})
export class SpinFtyCreationComponent {
  spinFtycreation : boolean = false;

  spinFtyediting : boolean = false;
  
  spinFtycreate! : FormGroup
  
  spinFtyedit! : FormGroup
  
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){
  
    this.spinFtycreate = this.fb.group({
      id : new FormControl('') , 
      spinningFactoryName : new FormControl('') ,  
      spinningLocation : new FormControl('') ,  
      contactDetails : new FormControl('') ,   
      legalFactoryName : new FormControl('') 
    })
  
  
    this.spinFtyedit = this.fb.group({
      id : new FormControl('') , 
      spinningFactoryName : new FormControl('') ,  
      spinningLocation : new FormControl('') ,  
      contactDetails : new FormControl('') ,   
      legalFactoryName : new FormControl('') 
    })
  }
  
  saveButton(){
    console.log(this.spinFtycreate.value)
  }
}
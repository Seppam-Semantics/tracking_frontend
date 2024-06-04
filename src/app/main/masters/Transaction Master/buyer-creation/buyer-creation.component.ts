import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buyer-creation',
  templateUrl: './buyer-creation.component.html',
  styleUrls: ['./buyer-creation.component.css']
})
export class BuyerCreationComponent implements OnInit{

Buyercreation : boolean = false;

Buyerediting : boolean = false;

Buyercreate! : FormGroup

Buyeredit! : FormGroup

ngOnInit(): void {
  
}
constructor(private fb : FormBuilder){

  this.Buyercreate = this.fb.group({
    id : new FormControl('') , 
    buyer : new FormControl('') ,
    country : new FormControl(''),
    contactdetails : new FormControl('')
  })


  this.Buyeredit = this.fb.group({
    id : new FormControl('') , 
    buyer : new FormControl('') ,
    country : new FormControl(''),
    contactdetails : new FormControl('')
  })
}

saveButton(){
  console.log(this.Buyercreate.value)
}

}

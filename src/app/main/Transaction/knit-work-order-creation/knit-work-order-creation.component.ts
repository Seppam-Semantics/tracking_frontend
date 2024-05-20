import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-knit-work-order-creation',
  templateUrl: './knit-work-order-creation.component.html',
  styleUrls: ['./knit-work-order-creation.component.css']
})
export class KnitWorkOrderCreationComponent implements OnInit{
  BuyerDate : any;
  OrderDate : any;
  KnitWorkOrderFrom!:FormGroup
  ngOnInit(): void { }
constructor(private fb : FormBuilder){
  this.KnitWorkOrderFrom = new FormGroup({
    "buyer" : new FormControl(''),
    "order" : new FormControl(''),
    "1" : new FormControl(''),
    "2" : new FormControl(''),
    "3" : new FormControl(''),
    "4" : new FormControl(''),
    "5" : new FormControl(''),
    "6" : new FormControl(''),
    "123" : new FormControl(''),
    data: this.fb.array([]),
  })
}

get items(){
  return this.KnitWorkOrderFrom.get("data") as FormArray
}

KnitWorkOrderAddButton(){
  
  const row = this.fb.group({
    "id": new FormControl(),
    "13" : new FormControl(),
    "14": new FormControl(),
    "15": new FormControl(),
    "16": new FormControl(),
    "17": new FormControl(),
    "18": new FormControl(),
    "19": new FormControl(),
    "110": new FormControl(),
    "111": new FormControl(),
    "112": new FormControl(),
    "113": new FormControl(),
    "114": new FormControl()


  });  
  this.items.push(row); 
}

}

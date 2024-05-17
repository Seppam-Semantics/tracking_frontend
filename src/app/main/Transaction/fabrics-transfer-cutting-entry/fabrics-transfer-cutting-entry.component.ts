import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fabrics-transfer-cutting-entry',
  templateUrl: './fabrics-transfer-cutting-entry.component.html',
  styleUrls: ['./fabrics-transfer-cutting-entry.component.css']
})
export class FabricsTransferCuttingEntryComponent {
FabricsTransferForm!:FormGroup
Date: any;
Transferno: any;
constructor(private fb : FormBuilder ){

  this.FabricsTransferForm = new FormGroup({
    "1" : new FormControl(''),
    "2" : new FormControl(''),
    data: this.fb.array([]),
  })
}
get items() {
  return this.FabricsTransferForm.get("data") as FormArray;
}

FabricsTransferAddButton(){
  
  const row = this.fb.group({
    "id": new FormControl(),
    "3" : new FormControl(),
    "4": new FormControl(),
    "5": new FormControl(),
    "6": new FormControl(),
    "7": new FormControl(),
    "8": new FormControl(),
    "9": new FormControl(),
    "10": new FormControl()

  });  
  this.items.push(row); 
}

ngOnInit(): void { 

}

date(){   }

new(){ }
exportexcel(){}
}
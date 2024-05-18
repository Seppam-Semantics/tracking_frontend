import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fabrics-transfer-cut-list-report',
  templateUrl: './fabrics-transfer-cut-list-report.component.html',
  styleUrls: ['./fabrics-transfer-cut-list-report.component.css']
})
export class FabricsTransferCutListReportComponent implements OnInit{

filterDate1:string = '';
filterDate2:string = '';
Date: any;
Transferno: any;
Buyer: any;
Buyerlist: any;
Order: any;
Orderlist: any;
editscreen : boolean = false;
FabricsTransferForm!:FormGroup
constructor(private fb : FormBuilder , private router : Router){

  this.FabricsTransferForm = new FormGroup({
    "1" : new FormControl(''),
    "2" : new FormControl(''),
    data: this.fb.array([]),
  })

}


ngOnInit(): void { 
  this.Buyer = [ { name: 'New York', code: 'NY' }, ];
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


edit(){
this.editscreen = true
}

date(){}

new(){ 
  this.router.navigate(['/main/FabricsTransferCuttingEntry'])
}
exportexcel(){}
}

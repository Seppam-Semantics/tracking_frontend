import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-fabrics-transfer-cutting-entry',
  templateUrl: './fabrics-transfer-cutting-entry.component.html',
  styleUrls: ['./fabrics-transfer-cutting-entry.component.css']
})
export class FabricsTransferCuttingEntryComponent implements OnInit{
FabricsTransferForm!:FormGroup
Date: any;
Transferno: any;
buyer: any;
  order: any;
  stylelist: any;
  colorlist: any;
  sizelist: any;
  buyerName: any;
  orderNo: any;
  style: any;
  color: any;
  size: any;
  factoryname: any;
  ngOnInit(): void { 
   this.buyername()
  }
  
constructor(private fb : FormBuilder , private api : ApiService){

  this.FabricsTransferForm = new FormGroup({
    fabentry: this.fb.array([]),
  })
}
get items() {
  return this.FabricsTransferForm.get("fabentry") as FormArray;
}

FabricsTransferAddButton(){
  
  const row = this.fb.group({
    "woId": new FormControl(),
    "transferDate" : new FormControl(),
    "finishFabKg": new FormControl(),
    "fabRolls": new FormControl(),
    "transferNo": new FormControl(),
    "size": new FormControl(),
    "color": new FormControl(),
    "style": new FormControl(),
    "orderNo": new FormControl(),
    "buyer": new FormControl()

  });  
  this.items.push(row); 
}

buyername(){
  this.api.getbuyers().subscribe((res)=>{
    this.buyer = res.buyers
    console.log(this.buyer)
  })
}
getBuyerValue(event: any) {
  this.buyerName = event.target.value;
}

getorders() {
  this.api.getorders(this.buyerName).subscribe((res) => {
    this.order = res.orders
  })
}

getOrderValue(event:any){
  this.orderNo = event.target.value
}

getstyle() {
  this.api.getstyle(this.buyerName, this.orderNo).subscribe((res) => {
    this.stylelist = res.styles;
  })
}

getstylevalue(event:any){
  this.style = event.target.value
}

getcolor() {
  this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

getcolorvalue(event:any){
  this.color = event.target.value
}

getsize() {
  this.api.getsize(this.buyerName, this.orderNo, this.style, this.color).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

getWoId(size: any, index: number) {
  this.api.getwodetails(this.buyerName, this.orderNo, this.style, this.color, size ).subscribe((res) => {
    const woId = res.workorders[0].id;
    console.log(woId)
    const formArray = this.FabricsTransferForm.get('fabentry') as FormArray;
    const row = formArray.at(index);
    row.get('woId')?.setValue(woId);
  });
}

save(){
  console.log(this.FabricsTransferForm.value)

  this.api.FabricsTransferData(this.FabricsTransferForm.value).subscribe((res)=>{
    alert(res.message)
  })
}

date(){   }

new(){ }
exportexcel(){}
}
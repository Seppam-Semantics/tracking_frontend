import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdown } from 'primeng/dropdown';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-dye-del-entry',
  templateUrl: './dye-del-entry.component.html',
  styleUrls: ['./dye-del-entry.component.css']
})
export class DyeDelEntryComponent {
  DateData:any
  KnitFactoryData:any
  ToDyeFtyData:any
  BuyerData:any
  OrderData:any
  StyleData:any
  ColorData:any
  SizeData:any
  KnitRateData:any
  DyeDeliveryNewPop:boolean=false
  DyeDelivery!:FormGroup

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
  DyeAllData: any;


ngOnInit(): void {

  this.buyername()

  this.api.dye_factory_name().subscribe((res)=>{
    this.factoryname=res.factorys
  })

}
constructor(private fb : FormBuilder , private api : ApiService , private router : Router){

  this.DyeDelivery = new FormGroup({
    "date" : new FormControl(''),
    "factory" : new FormControl(''),
    "id" : new FormControl(''),
    data: this.fb.array([]),
    "RollsGriegeTotal" : new FormControl(),
    "RollsFinishTotal" : new FormControl(),
    "DeliveryGriegeTotal" : new FormControl(),
    "DeliveryFinishTotal" : new FormControl(),
    "DyeTotal" : new FormControl(),
  })
}

get items() {
  return this.DyeDelivery.get("data") as FormArray;
}

DyeDeliveryAddButton(){
  
  const row = this.fb.group({
    "id": new FormControl(),
    "woId": new FormControl(),
    "dyeChallan": new FormControl(),
    "batchNo": new FormControl(),
    "buyer": new FormControl(),
    "orderNo": new FormControl(),
    "style": new FormControl(),
    "color": new FormControl(),
    "size": new FormControl(),
    "griegeRolls": new FormControl(''),
    "finishRolls": new FormControl(''),
    "griegeDeliveryKgs": new FormControl(''),
    "finishDeliveryKgs": new FormControl(''),
    "dyeRate": new FormControl(''),
    "dyeValue": new FormControl(''),

  });
  
  row.get('dyeRate')?.valueChanges.subscribe(() => {
    this.calculate();
  });
  
  this.items.push(row); 
}

DyeDeliveryRemoveButton(index:any){
  this.items.removeAt(index);
}

calculate(){
  let noRollsGriegeSum = 0; 
  let noRollsFinishSum = 0;
  let DelGreigeFabSum = 0;
  let DelFinishFabSum = 0;
  let DyeValueSum = 0;

  this.items.controls.forEach((control: AbstractControl) => {
    const row = control as FormGroup;
    if (row instanceof FormGroup) {
      const noRollsGriege = parseFloat(row.get('griegeRolls')?.value) || 0;
      const noRollsFinish = parseFloat(row.get('finishRolls')?.value) || 0;
      const DelGreigeFab = parseFloat(row.get('griegeDeliveryKgs')?.value) || 0;
      const DelFinishFab = parseFloat(row.get('finishDeliveryKgs')?.value) || 0;
      const DyeRate = parseFloat(row.get('dyeRate')?.value) || 0;

      noRollsGriegeSum += noRollsGriege;
      noRollsFinishSum += noRollsFinish;
      DelGreigeFabSum += DelGreigeFab;
      DelFinishFabSum += DelFinishFab;

      const dyeValue = DelGreigeFab * DyeRate;

      row.patchValue({ dyeValue });
      DyeValueSum += dyeValue;
    }
  });

  this.DyeDelivery.get('RollsGriegeTotal')?.setValue(noRollsGriegeSum); 
  this.DyeDelivery.get('RollsFinishTotal')?.setValue(DelGreigeFabSum); 
  this.DyeDelivery.get('DeliveryGriegeTotal')?.setValue(noRollsFinishSum); 
  this.DyeDelivery.get('DeliveryFinishTotal')?.setValue(DelFinishFabSum); 
  this.DyeDelivery.get('DyeTotal')?.setValue(DyeValueSum); 

  }

// <!------------------------------------------------------------>
buyername(){
  this.api.getbuyers().subscribe((res)=>{
    this.buyer = res.buyers
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
    const formArray = this.DyeDelivery.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('woId')?.setValue(woId);
  });
}
// <!------------------------------------------------------------>

saveButton(){
  // console.log(this.DyeDelivery.value)
  this.api.addUpdateDyeDelivery(this.DyeDelivery.value).subscribe((res)=>{
    alert(res.message)
    this.router.navigate(['/main/dye-delivery'])
  })
}

}

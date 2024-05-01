import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-dye-delivery',
  templateUrl: './dye-delivery.component.html',
  styleUrls: ['./dye-delivery.component.css']
})
export class DyeDeliveryComponent implements OnInit{
  DateData:any
  KnitFactoryData:any
  ToDyeFtyData:any
  BuyerData:any
  OrderData:any
  StyleData:any
  ColorData:any
  SizeData:any
  KnitRateData:any
  DelDyeEdit:boolean=false
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


fileName = "DyeDeliveryReport.xlsx"
exportexcel() {
  let data = document.getElementById("table-data");
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, this.fileName);
}


DyeDeliveryAddButton(){
  
  const row = this.fb.group({
    "id": new FormControl(),
    "dyeChallan": new FormControl(),
    "batchNo": new FormControl(),
    "buyer": new FormControl(),
    "orderNo": new FormControl(),
    "style": new FormControl(),
    "color": new FormControl(),
    "size": new FormControl(),
    "noRollsGriege": new FormControl(''),
    "noRollsFinish": new FormControl(''),
    "deliveryGreigeFab": new FormControl(''),
    "deliveryFinishFab": new FormControl(''),
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
      const noRollsGriege = parseFloat(row.get('noRollsGriege')?.value) || 0;
      const noRollsFinish = parseFloat(row.get('noRollsFinish')?.value) || 0;
      const DelGreigeFab = parseFloat(row.get('deliveryGreigeFab')?.value) || 0;
      const DelFinishFab = parseFloat(row.get('deliveryFinishFab')?.value) || 0;
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

  //-------------------------------------------------------------------------//
buyername() {
  this.api.getbuyers().subscribe((res) => {
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

getOrderValue(event: any) {
  this.orderNo = event.target.value
}

getstyle() {
  this.api.getstyle(this.buyerName, this.orderNo).subscribe((res) => {
    this.stylelist = res.styles;
  })
}

getstylevalue(event: any) {
  this.style = event.target.value
}

getcolor() {
  this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

getcolorvalue(event: any) {
  this.color = event.target.value
}

getsize() {
  this.api.getsize(this.buyerName, this.orderNo, this.style, this.color).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

getWoId(size: any, index: number) {
  this.api.getwodetails(this.buyerName, this.orderNo, this.style, this.color, size ).subscribe((res) => {
    const woId = res.workorders[index].id;
    console.log(woId);
    const formArray = this.DyeDelivery.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('woId')?.setValue(woId);
  });
}
//-------------------------------------------------------------------------//



saveButton(){
  console.log(this.DyeDelivery.value)
}

edit(){
  this.DelDyeEdit=true;
}

new(){
  this.router.navigate(['/main/Dye-DelEntry'])
}


}
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
  DyeAllData: any;
  SingleLineId: any;
  DyeSingleData: any;


ngOnInit(): void {

  this.buyername()

  this.api.dye_factory_name().subscribe((res)=>{
    this.factoryname=res.factorys
  })

  this.api.getDyeDelivery().subscribe((res)=>{
    this.DyeAllData = res.dyeDelivery
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
  this.api.addUpdateDyeDelivery(this.DyeDelivery.value).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

edit(id:any){
  this.SingleLineId = id
  console.log(this.SingleLineId)
  this.DelDyeEdit = true;
  this.api.getSingleDyeDel(id).subscribe((res) => {
    this.DyeSingleData = res;
    console.log(this.DyeSingleData)
    this.DyeDelivery.patchValue({
      "id": this.SingleLineId,
      "date": this.DyeSingleData.headerData[0].date,
      "factory": this.DyeSingleData.headerData[0].factory,
      "RollsGriegeTotal": this.DyeSingleData.headerData[0].rollgriegeTotal,
      "RollsFinishTotal": this.DyeSingleData.headerData[0].totalfinishrolls,
      "DeliveryGriegeTotal": this.DyeSingleData.headerData[0].deliveryGriegeTotal,
      "DeliveryFinishTotal": this.DyeSingleData.headerData[0].totalfinishKg,
      "DyeTotal": this.DyeSingleData.headerData[0].dyeValueTotal,

    });

    const DyeEntryData = this.DyeDelivery.get('data') as FormArray;
    DyeEntryData.clear();

    const formControls: FormGroup[] = [];
    this.DyeSingleData.lineData.forEach((dataItem: any) => {
      formControls.push(
        this.fb.group({
          "id": dataItem.id,
          "woId": dataItem.woId,
          "dyeChallan": dataItem.dyeChallan,
          "batchNo": dataItem.batchNo,
          "buyer": dataItem.buyer,
          "orderNo": dataItem.orderNo,
          "style": dataItem.style,
          "color": dataItem.color,
          "size": dataItem.size,
          "griegeRolls": dataItem.griegeRolls,
          "finishRolls": dataItem.finishRolls,
          "griegeDeliveryKgs": dataItem.griegeDeliveryKgs,
          "finishDeliveryKgs":dataItem.finishDeliveryKgs ,
          "dyeRate": dataItem.dyeRate,
          "dyeValue": dataItem.dyeValue,
        })
      );
    });

    this.DyeDelivery.setControl('data', this.fb.array(formControls));
  });
}
DeleteButton(id:any){
  // console.log(id)
this.api.deleteDyeDelivery(id).subscribe((res)=>{
  alert(res.message)
  window.location.reload()
})
}

new(){
  this.router.navigate(['/main/Dye-DelEntry'])
}


}
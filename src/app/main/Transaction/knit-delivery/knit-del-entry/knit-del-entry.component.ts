import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-knit-del-entry',
  templateUrl: './knit-del-entry.component.html',
  styleUrls: ['./knit-del-entry.component.css']
})
export class KnitDelEntryComponent {
  DateData:any
  KnitFactoryData:any
  ToDyeFtyData:any
  BuyerData:any
  OrderData:any
  StyleData:any
  ColorData:any
  SizeData:any
  KnitRateData:any
  KnitDeliveryNewPop:boolean=false
  KnitDelivery!:FormGroup
  fty_name: any;
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

ngOnInit(): void {

  this.buyername();

  this.api.knitfty_name().subscribe((res) => {
    this.fty_name = res.factorys
  })
}
constructor(private fb : FormBuilder , private api : ApiService){

  this.KnitDelivery = new FormGroup({
    "date" : new FormControl(''),
    "factory" : new FormControl(''),
    DyeDeliveryData: this.fb.array([]),
    "RollsTotal" : new FormControl(),
    "DeliveryTotal" : new FormControl(),
    "KnitTotal" : new FormControl(),
  })
}


get items() {
  return this.KnitDelivery.get("DyeDeliveryData") as FormArray;
}

KnitDeliveryAddButton(){
  
  const row = this.fb.group({
    "Sno": new FormControl(),
    "ToDyeFty": new FormControl(),
    "KnitChallan": new FormControl(),
    "ScandexChallan": new FormControl(),
    "buyer": new FormControl(),
    "orderNo": new FormControl(),
    "style": new FormControl(),
    "color": new FormControl(),
    "size": new FormControl(),
    "noRolls": new FormControl(''),
    "DeliveryGreigeFab": new FormControl(''),
    "KnitRate": new FormControl(''),
    "KnitValue": new FormControl(''),

  });
  
  row.get('KnitRate')?.valueChanges.subscribe(() => {
    this.calculate();
  });
  
  this.items.push(row); 
}

KnitDeliveryRemoveButton(index:any){
  this.items.removeAt(index);
}

calculate(){
  let DeliveryGreigeFabTotal = 0; 
  let noRollsTotal = 0;
  let KnitValueTotal2 = 0;
  this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const noRolls = parseFloat(row.get('noRolls')?.value)|| 0;
        const KnitRate = parseFloat(row.get('KnitRate')?.value)|| 0;
        const DeliveryGreigeFab = parseFloat(row.get('DeliveryGreigeFab')?.value)|| 0;
        const knitdata = parseFloat(row.get('KnitValue')?.value)|| 0;
        
        const KnitTotal = KnitRate * DeliveryGreigeFab
      
        DeliveryGreigeFabTotal += DeliveryGreigeFab;
        
        noRollsTotal += noRolls
        
        KnitValueTotal2 += knitdata

        const KnitValue = parseFloat(KnitTotal.toFixed(2));
        
        row.patchValue({ KnitValue});
      }
      this.KnitDelivery.get('DeliveryTotal')?.setValue(DeliveryGreigeFabTotal); 
      this.KnitDelivery.get('RollsTotal')?.setValue(noRollsTotal); 
      this.KnitDelivery.get('KnitTotal')?.setValue(KnitValueTotal2); 
    });
}
//-------------------------------------------------------------------------//
buyername() {
  this.api.getbuyers().subscribe((res) => {
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
//-------------------------------------------------------------------------//

saveButton(){
  console.log(this.KnitDelivery.value)
}
}

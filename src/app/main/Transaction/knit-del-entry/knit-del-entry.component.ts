import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdown } from 'primeng/dropdown';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-knit-del-entry',
  templateUrl: './knit-del-entry.component.html',
  styleUrls: ['./knit-del-entry.component.css']
})
export class KnitDelEntryComponent  implements OnInit{
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
  factoryname: any;
  factory: any;
  factoryv: any;

ngOnInit(): void {

  this.buyername();

  this.api.getknit_Ety_wofty().subscribe((res)=>{
    this.factory=res.knitfty
  })

}
preventManualInput(event: KeyboardEvent): void {
  event.preventDefault();
}
constructor(private fb : FormBuilder , private api : ApiService , private router : Router){

  this.KnitDelivery = new FormGroup({
    "date" : new FormControl(''),
    "factory" : new FormControl(''),
    data: this.fb.array([]),
    "RollsTotal" : new FormControl(),
    "DeliveryTotal" : new FormControl(),
    "KnitTotal" : new FormControl(),
  })
}


get items() {
  return this.KnitDelivery.get("data") as FormArray;
}

KnitDeliveryAddButton(){
  
  const row = this.fb.group({
    "id": new FormControl(),
    "knitId" : new FormControl(),
    "woId": new FormControl(),
    "dyeFactory": new FormControl(),
    "knitChallan": new FormControl(),
    "scandexChallan": new FormControl(),
    "buyer": new FormControl(),
    "orderNo": new FormControl(),
    "style": new FormControl(),
    "color": new FormControl(),
    "size": new FormControl(),
    "noOfRolls": new FormControl('',Validators.required),
    "deliveryKgs": new FormControl(''),
    "knitRate": new FormControl('',Validators.required),
    "knitValue": new FormControl(''),

  });
  
  row.get('knitRate')?.valueChanges.subscribe(() => {
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
        const noRolls = parseFloat(row.get('noOfRolls')?.value)|| 0;
        const KnitRate = parseFloat(row.get('knitRate')?.value)|| 0;
        const DeliveryGreigeFab = parseFloat(row.get('deliveryKgs')?.value)|| 0;
        const knitdata = parseFloat(row.get('knitValue')?.value)|| 0;
        
        const KnitTotal = KnitRate * DeliveryGreigeFab
      
        DeliveryGreigeFabTotal += DeliveryGreigeFab;
        
        noRollsTotal += noRolls
        
        KnitValueTotal2 += knitdata

        const knitValue = parseFloat(KnitTotal.toFixed(2));
        
        row.patchValue({ knitValue});
      }
      this.KnitDelivery.get('DeliveryTotal')?.setValue(DeliveryGreigeFabTotal); 
      this.KnitDelivery.get('RollsTotal')?.setValue(noRollsTotal); 
      this.KnitDelivery.get('KnitTotal')?.setValue(KnitValueTotal2); 
    });
}
// <!------------------------------------------------------------>

buyername(){
  this.api.getknit_Ety_wobuyers(this.factoryv).subscribe((res)=>{
    this.buyer = res.buyers
  })
}
getBuyerValue(index: any) {
  // this.buyerName = event.target.value;
  const formArray = this.KnitDelivery.get('data') as FormArray;
  const row = formArray.at(index);
  this.buyerName = row.get('buyer')?.value;
  this.getorders()
}

getorders() {
  this.api.getknit_Ety_woorders(this.factoryv ,this.buyerName).subscribe((res) => {
    this.order = res.orders

  })
}

getOrderValue(index:any){
  // this.orderNo = event.target.value
  const formArray = this.KnitDelivery.get('data') as FormArray;
  const row = formArray.at(index);
  this.buyerName = row.get('buyer')?.value;
  this.orderNo = row.get('orderNo')?.value;
  this.getstyle()
}

getstyle() {
  this.api.getknit_Ety_wostyle(this.factoryv ,this.buyerName, this.orderNo).subscribe((res) => {
    this.stylelist = res.styles;
  })
}

getstylevalue(index:any){
  // this.style = event.target.value
  const formArray = this.KnitDelivery.get('data') as FormArray;
  const row = formArray.at(index);
  this.buyerName = row.get('buyer')?.value;
  this.orderNo = row.get('orderNo')?.value;
  this.style = row.get('style')?.value;
  this.getcolor()
}

getcolor() {
  this.api.getknit_Ety_wocolor(this.factoryv , this.buyerName, this.orderNo, this.style).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

getcolorvalue(index:any){
  // this.color = event.target.value
  const formArray = this.KnitDelivery.get('data') as FormArray;
  const row = formArray.at(index);
  this.buyerName = row.get('buyer')?.value;
  this.orderNo = row.get('orderNo')?.value;
  this.style = row.get('style')?.value;
  this.color = row.get('color')?.value;
  this.getsize()
  
}

getsize() {
  this.api.getknit_Ety_wosize(this.factoryv , this.buyerName, this.orderNo, this.style, this.color).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

getWoId(size: any, index: number) {

  this.api.getKnitrateIddetails(this.buyerName, this.orderNo, this.style, this.color, size ).subscribe((res) => {
    const Id = res.knitRate[0].knitRate;
    const formArray = this.KnitDelivery.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('knitRate')?.setValue(Id);
  });



  this.api.getknitproductiondetails(this.buyerName, this.orderNo, this.style, this.color, size ).subscribe((res) => {
    console.log()
    const formArray = this.KnitDelivery.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('noOfRolls')?.setValue(res.knitProduction[0].noOfRolls);
  });
}
// <!------------------------------------------------------------>


saveButton(){
  if (this.KnitDelivery.valid) {
    this.api.addUpdateKnitDelivery(this.KnitDelivery.value).subscribe((res)=>{
      alert(res.message)
      this.router.navigate(['/main/knit-delivery'])
    })
  } else {
    alert('Please fill NoRolls , DyeRate fields // Entry should more then 0.');
  }

}

}

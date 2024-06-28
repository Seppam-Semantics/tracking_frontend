import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-knit-work-order-creation',
  templateUrl: './knit-work-order-creation.component.html',
  styleUrls: ['./knit-work-order-creation.component.css']
})
export class KnitWorkOrderCreationComponent implements OnInit {
  BuyerDate: any;
  OrderDate: any;
  KnitWorkOrderFrom!: FormGroup
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
  ftyName: any;
  ftyname: any
  sizevalue: any;
  fabDiaData: any;
  fabtype: any;
  FabTypeData: any;
  FabGSM: any;
  fabGsmData: any;
  fabTypeData: any;
  knitSLData: any;
  knitValue: any;
  yarnKg: any;
  valueExceeded : boolean = false;
  ngOnInit(): void { this.buyername(), this.factoryName() }
  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) {

    this.KnitWorkOrderFrom = new FormGroup({
     
      "buyer": new FormControl(''),
      "orderNo": new FormControl(''),
      "knitfty": new FormControl(''),
      "knitfty_details": new FormControl(''),
      "woNo": new FormControl(''),
      "woRefNo": new FormControl(''),
      "woDate": new FormControl(''),
      "completedDate": new FormControl(''),
      "notes": new FormControl(''),
      data: this.fb.array([]),
    })

  }

  buyername() {
    this.api.getbuyers().subscribe((res) => {
      this.buyer = res.buyers
    })
  }

  factoryName() {
    this.api.knitfty_name().subscribe((res) => {
      this.ftyName = res.factorys
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

  getstylevalue(index:any) {
    const formArray = this.KnitWorkOrderFrom.get('data') as FormArray;
    const row = formArray.at(index);
    this.style = row.get('style')?.value;
 
    this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
      this.colorlist = res.colors;
    })

  }

  getcolor() {
    this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  getcolorvalue(event: any) {
    this.color = event.target.value
  }

  getsize(index:any) {

    const formArray = this.KnitWorkOrderFrom.get('data') as FormArray;
    const row = formArray.at(index);
    this. style = row.get('style')?.value;
    this. color = row.get('color')?.value;

    this.api.getsize(this.buyerName, this.orderNo, this.style, this.color).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }

  getWoId(size: any, index: number) {

    this.sizevalue = size

    this.api.getwodetails(this.buyerName, this.orderNo, this.style, this.color, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      const knitRate = res.workorders[0].knitRate ? res.workorders[0].knitRate : "0" ;
      this. yarnKg = res.workorders[0].yarnKg ? res.workorders[0].yarnKg : "0" ;
      const fabDiaData = res.workorders[0].fabDia ? res.workorders[0].fabDia : "0" ;
      const fabGsmData = res.workorders[0].fabGsm ? res.workorders[0].fabGsm : "0" ;
      const fabTypeData = res.workorders[0].fabType ? res.workorders[0].fabType : "0" ;
      const knitSLData = res.workorders[0].knitSL ? res.workorders[0].knitSL : "0" ;

      const formArray = this.KnitWorkOrderFrom.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('knitWoId')?.setValue(woId);
      row.get('knitRate')?.setValue(knitRate);
      row.get('knitKg')?.setValue(this. yarnKg);
      row.get('fabDia')?.setValue(fabDiaData);
      row.get('fabGSM')?.setValue(fabGsmData);
      row.get('fabType')?.setValue(fabTypeData);
      row.get('KnitSl')?.setValue(knitSLData);
    });
  }

  valid(value:any){
    const inputValue = value;
    if(inputValue > this. yarnKg){
      this.valueExceeded = true;
      alert("Value exceeded");
    }
    else{
      this.valueExceeded = false;
    }
  }

  get items() {
    return this.KnitWorkOrderFrom.get("data") as FormArray
  }

  KnitWorkOrderAddButton() {

    const row = this.fb.group({
      "id": new FormControl(''),
      "knitWoId": new FormControl(''),
      "machDia": new FormControl(''),
      "fabDia": new FormControl(''),
      "fabType": new FormControl(''),
      "style": new FormControl(''),
      "color": new FormControl(''),
      "fabGSM": new FormControl(''),
      "KnitSl": new FormControl(''),
      "knitKg": new FormControl(''),
      "knitRate": new FormControl(''),
      "knitValue": new FormControl(''),
      "remarks": new FormControl('')
    });
    this.items.push(row);

    row.get('knitKg')?.valueChanges.subscribe(() => {
      this.calculateDiff5()
    });
    row.get('knitRate')?.valueChanges.subscribe(() => {
      this.calculateDiff5()
    });
  }

  calculateDiff5() {
    this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const knitRate = parseFloat(row.get('knitRate')?.value);
        const knitKg = parseFloat(row.get('knitKg')?.value);
  
        const a = knitRate * knitKg
        const knitValue = parseFloat(a.toFixed(2));
  
        row.patchValue({ knitValue});
      }
    });
  }
  



  save() {
    this.api.KnitWorkOrderData(this.KnitWorkOrderFrom.value).subscribe((res) => {
      alert(res.message)
      this.router.navigate(['/main/KnitWorkOrderListing'])
    })
  }
}

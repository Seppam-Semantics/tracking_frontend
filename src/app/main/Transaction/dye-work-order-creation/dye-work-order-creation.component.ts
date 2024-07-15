import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dye-work-order-creation',
  templateUrl: './dye-work-order-creation.component.html',
  styleUrls: ['./dye-work-order-creation.component.css']
})
export class DyeWorkOrderCreationComponent {
  BuyerDate: any;
  OrderDate: any;
  DyeWorkOrderFrom!: FormGroup
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
  DyeWorkOrderAllData: any;
  ngOnInit(): void { 
    this.buyername(), 
    this.factoryName() 
    this.AllData()
  }
  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) {

    this.DyeWorkOrderFrom = new FormGroup({
     
      "buyer": new FormControl(''),
      "orderNo": new FormControl(''),
      "dyefty": new FormControl(''),
      "dyefty_details": new FormControl(''),
      "woNo": new FormControl(''),
      "woRefNo": new FormControl(''),
      "woDate": new FormControl(''),
      "completedDate": new FormControl(''),
      "notes": new FormControl(''),
      "GriegeKgsTotal" :new FormControl(''),
      "DyeValueTotal" :new FormControl(''),
      data: this.fb.array([]),
    })

  }

  buyername() {
    this.api.getbuyers().subscribe((res) => {
      this.buyer = res.buyers
    })
  }

  factoryName() {
    this.api.dye_factory_name().subscribe((res)=>{
      this.factoryname=res.factorys
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
    this.api.knitworkorderdyeworkorderdetails(this.buyerName, this.orderNo, this.style, this.color, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      const fabDia = res.workorders[0].fabDia;
      const fabGsm = res.workorders[0].fabGsm;
      const fabType = res.workorders[0].fabType;
      const greigeKg = res.workorders[0].greigeKg;
      const formArray = this.DyeWorkOrderFrom.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('dyeWoId')?.setValue(woId);
      row.get('fabGSM')?.setValue(fabGsm);
      row.get('fabDia')?.setValue(fabDia);
      row.get('fabType')?.setValue(fabType);
      row.get('dyeKg')?.setValue(greigeKg);
    });
  }


  AllData(){
    this.api.DyeWorkOrderAllData().subscribe((res)=>{
      this.DyeWorkOrderAllData = res.workorders
    })
  }


  get items() {
    return this.DyeWorkOrderFrom.get("data") as FormArray
  }



  DyeWorkOrderAddButton() {

    const row = this.fb.group({
      "id": new FormControl(''),
      "dyeWoId": new FormControl(''),
      "machDia": new FormControl(''),
      "fabDia": new FormControl(''),
      "fabType": new FormControl(''),
      "style": new FormControl(''),
      "color": new FormControl(''),
      "fabGSM": new FormControl(''),
      "pl": new FormControl(''),
      "dyeKg": new FormControl(''),
      "dyeRate": new FormControl(''),
      "dyeValue": new FormControl(''),
      "remarks": new FormControl('')
    });
    this.items.push(row);

    row.get('dyeKg')?.valueChanges.subscribe(() => {
      this.calculateDiff();
      this.calculateGriegeTotal();

    });
  
    row.get('dyeRate')?.valueChanges.subscribe(() => {
      this.calculateDiff();
      this.calculateGriegeTotal();
    });

  }
  calculateDiff() {
    this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const dyeKgValue = parseFloat(row.get('dyeKg')?.value) || 0;
        const dyeRateValue = parseFloat(row.get('dyeRate')?.value) || 0;
        const dyeValue = dyeKgValue * dyeRateValue ;
        const PLValue = dyeKgValue -  dyeValue / dyeKgValue * 100
        const pl = parseFloat(PLValue.toFixed(2));
        row.patchValue({ dyeValue , pl });
      }
    });
  }
  calculateGriegeTotal() {
    let total1 = 0;
    let total2 = 0;
    this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const dyeValue = parseFloat(row.get('dyeValue')?.value) || 0;
        total1 += dyeValue;
  
        const dyeKgTotal = parseFloat(row.get('dyeKg')?.value) || 0;
        total2 += dyeKgTotal;

      }
    });
    this.DyeWorkOrderFrom.get('DyeValueTotal')?.setValue(total1);
    this.DyeWorkOrderFrom.get('GriegeKgsTotal')?.setValue(total2);

  }

  save() {
    this.api.DyeWorkOrderData(this.DyeWorkOrderFrom.value).subscribe((res) => {
      alert(res.message)
      this.router.navigate(['/main/DyeWorkOrderListing'])
    })
  }

}

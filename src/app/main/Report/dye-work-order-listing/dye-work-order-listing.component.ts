import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dye-work-order-listing',
  templateUrl: './dye-work-order-listing.component.html',
  styleUrls: ['./dye-work-order-listing.component.css']
})
export class DyeWorkOrderListingComponent {
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
  editview : boolean = false;
  DyeWorkOrderAllData: any;
  dyeWorkOrderhederdata: any;
  dyeWorkOrderlineData: any;
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
    this.api.getwodetails(this.buyerName, this.orderNo, this.style, this.color, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      const formArray = this.DyeWorkOrderFrom.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('knitWoId')?.setValue(woId);
    });
  }


  AllData(){
    this.api.DyeWorkOrderAllData().subscribe((res)=>{
      this.DyeWorkOrderAllData = res
      console.log(this.DyeWorkOrderAllData)
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
  }


  save() {
    this.api.KnitWorkOrderData(this.DyeWorkOrderFrom.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

exportexcel(){ }
edit(id:any){
  this.editview = true;
  console.log(id)
 
  this.api.DyeWorkOrderSingleData(id).subscribe((res)=>{
    this.dyeWorkOrderhederdata = res.headerData[0]
    console.log(res)
    this.dyeWorkOrderlineData = res.lineData
    this.DyeWorkOrderFrom.patchValue({
      "id": this.dyeWorkOrderhederdata.id,
      "buyer": this.dyeWorkOrderhederdata.buyer,
      "orderNo": this.dyeWorkOrderhederdata.orderNo,
      "dyefty": this.dyeWorkOrderhederdata.dyefty,
      "dyefty_details": this.dyeWorkOrderhederdata.knitfty_details,
      "woNo": this.dyeWorkOrderhederdata.woNo,
      "woRefNo": this.dyeWorkOrderhederdata.woRefNo,
      "woDate": this.dyeWorkOrderhederdata.woDate,
      "completedDate": this.dyeWorkOrderhederdata.completedDate,
      "notes": this.dyeWorkOrderhederdata.notes,
    })
    const KnitEntryData = this.DyeWorkOrderFrom.get('data') as FormArray;
    KnitEntryData.clear();

    const formControls: FormGroup[] = [];
    this.dyeWorkOrderlineData.forEach((dataItem: any) => {
      formControls.push(
        this.fb.group({
          "id": dataItem.id,
          "dyeWoId": dataItem.dyeWoId,
          "machDia": dataItem.machDia,
          "fabDia": dataItem.fabDia,
          "fabType": dataItem.fabType,
          "style": dataItem.style,
          "color": dataItem.color,
          "fabGSM": dataItem.fabGSM,
          "pl": dataItem.pl,
          "dyeKg": dataItem.dyeKg,
          "dyeRate": dataItem.dyeRate,
          "dyeValue": dataItem.dyeValue,
          "remarks": dataItem.remarks
        })

      );
    }
  );

    this.DyeWorkOrderFrom.setControl('data', this.fb.array(formControls));

  })
  
  this.api.getorders(this.buyerName).subscribe((res) => {
    this.order = res.orders
  })

  this.api.getstyle(this.buyerName, this.orderNo).subscribe((res) => {
    this.stylelist = res.styles;
  })

  this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
    this.colorlist = res.colors;
  })

}
new(){
this.router.navigate(['/main/DyeWorkOrderCreation'])
}
}

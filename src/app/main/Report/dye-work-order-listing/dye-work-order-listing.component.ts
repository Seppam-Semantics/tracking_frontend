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
  DyeWorkOrderHeader: any;
  DyeWorkOrderheaderData: any;
  DyeWorkOrderlineData: any;
  DyeFtyFillter:any;
  BuyerAllData: any;
  DyeBuyerFillter :any
  BuyerFillter: string | undefined;
  orderNoAllData: any;
  ngOnInit(): void { 
    this.buyername(), 
    this.factoryName() 
    this.AllData(),
    this.BuyerAllData = [{buyer:'No'}]
  }
  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) {

    this.DyeWorkOrderFrom = new FormGroup({
     "id" : new FormControl(''),
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


  dyeWorkOrderFactoryFilter(){
    this.api.dyeworkorder_fty_Fillter(this.DyeFtyFillter).subscribe((res)=>{
      this.DyeWorkOrderAllData = res.workorders
      this.BuyerAllData = res.buyer
    })
  }

  dyeWorkOrderBuyerFilter(){
    this.api.dyeworkorder_buyer_Fillter(this.DyeFtyFillter, this.BuyerFillter).subscribe((res)=>{
      this.DyeWorkOrderAllData = res.workorders
      this.orderNoAllData = res.orderNo
    })
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
  }


  update() {
    this.api.DyeWorkOrderData(this.DyeWorkOrderFrom.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }
exportexcel(){ }
edit(id:any){
  this.editview = true;
  this.api.DyeWorkOrderSingleData(id).subscribe((res)=>{
    this.DyeWorkOrderheaderData = res.headerData[0]
    this.DyeWorkOrderlineData   = res.lineData

    this.DyeWorkOrderFrom.patchValue({
      "id": this.DyeWorkOrderheaderData.id,
      "buyer": this.DyeWorkOrderheaderData.buyer,
      "orderNo": this.DyeWorkOrderheaderData.orderNo,
      "dyefty": this.DyeWorkOrderheaderData.dyefty,
      "dyefty_details": this.DyeWorkOrderheaderData.dyefty_details,
      "woNo": this.DyeWorkOrderheaderData.woNo,
      "woRefNo": this.DyeWorkOrderheaderData.woRefNo,
      "woDate": this.DyeWorkOrderheaderData.woDate,
      "completedDate": this.DyeWorkOrderheaderData.completedDate,
      "notes": this.DyeWorkOrderheaderData.notes,
    })

    const KnitEntryData = this.DyeWorkOrderFrom.get('data') as FormArray;
    KnitEntryData.clear();

    const formControls: FormGroup[] = [];
    this.DyeWorkOrderlineData.forEach((dataItem: any) => {
      formControls.push(
        this.fb.group({
          "id": dataItem.id,
          "dyeWoId" : dataItem.id,
          "machDia": dataItem.machDia,
          "fabDia": dataItem.fabDia,
          "fabType": dataItem.fabType,
          "style": dataItem.style,
          "color": dataItem.color,
          "fabGSM": dataItem.fabGSM,
          "pl": dataItem.pl,
          "dyeKg": dataItem.greigeKg,
          "dyeRate": dataItem.dyeRate,
          "dyeValue": dataItem.dyeValue,
          "remarks": dataItem.remarks
        })

      );
    }
  );

    this.DyeWorkOrderFrom.setControl('data', this.fb.array(formControls));

    this.api.getorders(this.buyerName).subscribe((res) => {
      this.order = res.orders
    })

    this.api.getstyle(this.buyerName, this.orderNo).subscribe((res) => {
      this.stylelist = res.styles;
    })

    this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
      this.colorlist = res.colors;
    })

  })
}

delete(id:any){
this.api.deleteDyeWorkOrder(id).subscribe((res)=>{
  alert(res.message)
  window.location.reload()
})
}
new(){
this.router.navigate(['/main/DyeWorkOrderCreation'])
}
}

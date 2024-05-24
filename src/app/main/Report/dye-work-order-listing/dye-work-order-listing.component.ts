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
  ngOnInit(): void { 
    this.buyername(), 
    this.factoryName() 
    this.AllData()
  }
  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) {

    this.DyeWorkOrderFrom = new FormGroup({
     
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
      console.log(woId)
      const formArray = this.DyeWorkOrderFrom.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('knitWoId')?.setValue(woId);
    });
  }


  AllData(){
    this.api.DyeWorkOrderAllData().subscribe((res)=>{
      this.DyeWorkOrderAllData = res
    })
  }


  get items() {
    return this.DyeWorkOrderFrom.get("data") as FormArray
  }




  DyeWorkOrderAddButton() {

    const row = this.fb.group({
      "id": new FormControl(''),
      "knitWoId": new FormControl(''),
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
      this.router.navigate(['/main/DyeWorkOrderListing'])
    })
  }
exportexcel(){ }
edit(){
  this.editview = true;
}
new(){
this.router.navigate(['/main/DyeWorkOrderCreation'])
}
}

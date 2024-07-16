import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cut-prod-entry',
  templateUrl: './cut-prod-entry.component.html',
  styleUrls: ['./cut-prod-entry.component.css']
})
export class CutProdEntryComponent implements OnInit{

  CutProdEty : FormGroup
  valueExceeded : boolean = false;
  Buyer_Value: any;
  buyersDta: any;
  orderNoDta: any;
  Order_Value: any;
  styleDta: any;
  style_Value: any;
  colorDta: any;
  color_Value: any;
  sizeDta: any;
  buyers: any;
  order: any;
  stylelist: any;
  colorlist: any;
  sizelist: any;
  cutting: any;
  cuttinglist: any;

  ngOnInit(): void {

    this.api.getbuyers().subscribe((res) => {
      this.buyers = res.buyers;
    })

  }

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) {

    this.CutProdEty = new FormGroup({
      cutDate : new FormControl('', Validators.required) ,
      data: this.fb.array([]),
    })

  }

  get items() {
    return this.CutProdEty.get("data") as FormArray
  }

  CutProdEtyAddButton() {

    const row = this.fb.group({
      "id": [''],
      "buyer": [''],
      "orderNo": [''],
      "style": [''],
      "color": [''],
      "size": [''],
      "woId": ['',Validators.required],
      "batch": [''],
      "rolls": [''],
      "cutPcs": ['']
    });
    this.items.push(row);

  }


  getBuyerValue(index: any) {
    // this.buyerName = event.target.value;
    const formArray = this.CutProdEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.getorders()
  }

  getorders() {
    this.api.getorders(this.Buyer_Value).subscribe((res) => {
      this.order = res.orders
    })
  }

  ordervalue(index: any) {
    // this.Order_Value = event.target.value
    const formArray = this.CutProdEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value =  row.get('buyer')?.value;
    this.Order_Value =  row.get('orderNo')?.value;
    this.orderdata()
  }

  orderdata() {
    this.api.getstyle(this.Buyer_Value, this.Order_Value).subscribe((res) => {
      this.stylelist = res.styles;
    })
  }
  stylevalue(index: any) {
    const formArray = this.CutProdEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderNo')?.value;
    this.style_Value = row.get('style')?.value;

    this.styledata()
  }

  styledata() {
    this.api.getcolor(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  colorvalue(index: any) {
    const formArray = this.CutProdEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderNo')?.value;
    this.style_Value = row.get('style')?.value;
    this.color_Value = row.get('color')?.value;

    this.colordata()

  }

  colordata() {
    this.api.getsize(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }

  getwoId(size: any, index: number){
    this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      const formArray = this.CutProdEty.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('woId')?.setValue(woId);
    });
}

  delete(index:any){
    this.items.removeAt(index)
  }


  save(){

    if (this.CutProdEty.valid) {
      this.api.cuttingPost(this.CutProdEty.value).subscribe((res) => {
        if (res.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['main/CutProdList'])
        }
        else {
          alert("Error while saving...!!!")
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "woId (or) CutDate  Missing"
      });
    }
  
  }
}

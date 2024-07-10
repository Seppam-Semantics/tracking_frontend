import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-sew-input-entry',
  templateUrl: './sew-input-entry.component.html',
  styleUrls: ['./sew-input-entry.component.css']
})
export class SewInputEntryComponent implements OnInit{

  SewinputEty : FormGroup
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  filterDate1 : any
  filterDate2 : any

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


  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) { 


    this.SewinputEty = new FormGroup({
      inputDate : new FormControl('', Validators.required) ,
      data: this.fb.array([]),
    })

  }

  ngOnInit(): void {
    this.api.cut_buyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }
//-------------------------------------------------------------------------------------------------------

getBuyerValue(index: any) {
  // this.buyerName = event.target.value;
  const formArray = this.SewinputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.getorders()
}

getorders() {
  this.api.cut_buyersorders(this.Buyer_Value).subscribe((res) => {
    this.order = res.orders
  })
}

ordervalue(index: any) {
  // this.Order_Value = event.target.value
  const formArray = this.SewinputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value =  row.get('buyer')?.value;
  this.Order_Value =  row.get('orderNo')?.value;
  this.orderdata()
}

orderdata() {
  this.api.cut_ordersstyles(this.Buyer_Value, this.Order_Value).subscribe((res) => {
    this.stylelist = res.styles;
  })
}
stylevalue(index: any) {
  const formArray = this.SewinputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.Order_Value = row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;

  this.styledata()
}

styledata() {
  this.api.cut_stylescolors(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

colorvalue(index: any) {
  const formArray = this.SewinputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.Order_Value = row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;
  this.color_Value = row.get('color')?.value;

  this.colordata()

}

colordata() {
  this.api.cut_colorssizes(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

getwoId(size: any, index: number){
  this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const woId = res.workorders[0].id;
    console.log(res)
    const formArray = this.SewinputEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('woId')?.setValue(woId);
  });

  this.api.getcutdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const cuttingId = res.cutting[0].id;
    console.log(res)
    const formArray = this.SewinputEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('cutId')?.setValue(cuttingId);
  });
}

//-------------------------------------------------------------------------------------------------------


  get items() {
    return this.SewinputEty.get("data") as FormArray
  }

  SewinputEtyAddButton() {

    const row = this.fb.group({
      "id": [''],
      "woId":['',Validators.required],
      "buyer": [''],
      "orderNo": [''],
      "style": [''],
      "color": [''],
      "size": [''],
      "cutId": ['',Validators.required],
      "lineNo": [''],
      "inputPcs": [''],
      "bundleNo": ['']
    });
    this.items.push(row);

  }

  delete(index:any){
    this.items.removeAt(index)
  }

  save(){
    // this.router.navigate(['main/SewInputList'])
    this.api.sewingPost(this.SewinputEty.value).subscribe((res)=>{
      if (this.SewinputEty.valid) {
        this.api.cuttingPost(this.SewinputEty.value).subscribe((res) => {
          if (res.success) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: res.message,
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['main/SewInputList'])
          }
          else {
            alert("Error while saving...!!!")
          }
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "cutId and woId Missing"
        });
      }    
    })
  }

}

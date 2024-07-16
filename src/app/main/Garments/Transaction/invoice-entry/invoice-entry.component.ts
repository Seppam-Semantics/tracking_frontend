import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-invoice-entry',
  templateUrl: './invoice-entry.component.html',
  styleUrls: ['./invoice-entry.component.css']
})
export class InvoiceEntryComponent {
  InvoiceEty : FormGroup
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
  sewingPacklist: any;
  shipDetails: any;
  toleranceValid: any[] = [];

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) { 


    this.InvoiceEty = new FormGroup({
      "id" : new FormControl(0),
      "buyer" : new FormControl(''),
      "invoice"  : new FormControl(''),
      "notes" : new FormControl(''),
      "invoiceDate" : new FormControl('',Validators.required),
      data: this.fb.array([]),

    })

  }

  ngOnInit(): void {
    this.api.shipping_buyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }


        //-------------------------------------------------------------------------------------------------------

getBuyerValue() {
  // this.buyerName = event.target.value;
  // const formArray = this.InvoiceEty.get('data') as FormArray;
  // const row = formArray.at(index);
  this.Buyer_Value = this.InvoiceEty.get('buyer')?.value;
  this.getorders()
}

getorders() {
  this.api.shipping_buyersorders(this.Buyer_Value).subscribe((res) => {
    this.order = res.orders
  })
}

ordervalue(index:any) {
  // this.Order_Value = event.target.value
  const formArray = this.InvoiceEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value =  this.InvoiceEty.get('buyer')?.value;
  this.Order_Value =  row.get('orderNo')?.value;
  this.orderdata()
}

orderdata() {
  this.api.shipping_ordersstyles(this.Buyer_Value, this.Order_Value).subscribe((res) => {
    this.stylelist = res.styles;
  })
}
stylevalue(index: any) {
  const formArray = this.InvoiceEty.get('data') as FormArray;
  const row = formArray.at(index);
  // this.Buyer_Value = row.get('buyer')?.value;
  // this.Order_Value = row.get('orderNo')?.value;
  this.Buyer_Value =  this.InvoiceEty.get('buyer')?.value;
  this.Order_Value =  row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;

  this.styledata()
}

styledata() {
  this.api.shipping_stylescolors(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

colorvalue(index: any) {
  const formArray = this.InvoiceEty.get('data') as FormArray;
  const row = formArray.at(index);
  // this.Buyer_Value = row.get('buyer')?.value;
  // this.Order_Value = row.get('orderNo')?.value;
  this.Buyer_Value =  this.InvoiceEty.get('buyer')?.value;
  this.Order_Value =  row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;
  this.color_Value = row.get('color')?.value;

  this.colordata()

}

colordata() {
  this.api.shipping_colorssizes(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

getwoId(size: any, index: number){
  this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const woId = res.workorders[0].id;
    // const fabGsm = res.workorders[0].fabGsm;
    // const fabType = res.workorders[0].fabType;
    // const orderPcs = res.workorders[0].orderPcs;

    console.log("WOid" + woId)
    
    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('woId')?.setValue(woId);
    // row.get('fabGSM')?.setValue(fabGsm);
    // row.get('orderPcs')?.setValue(orderPcs);
    // row.get('fabtype')?.setValue(fabType);
  });

  this.api.getcutdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const cuttingId = res.cutting[0].id;
    console.log( "cuttingId" + cuttingId)
    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('cutId')?.setValue(cuttingId);
  });

  this.api.getsewinputfilterdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const SewinputEtyId = res.sewinginput[0].id;
    console.log( "SewinputId" + SewinputEtyId)
    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('inputId')?.setValue(SewinputEtyId);
  });

  this.api.getsewoutputdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const SewoutputEtyId = res.sewingoutput[0].id;
    console.log("SewoutputId" + SewoutputEtyId)
    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('outputId')?.setValue(SewoutputEtyId);
  });


  this.api.getsewingpackingdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
  
    const PackingEtyId = res.sewingpacking[0].id;
    console.log("SewoutputId" + PackingEtyId)
    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('packId')?.setValue(PackingEtyId);
  });


  this.api.getshippingdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
  
    const shippingEtyId = res.shipping[0].id;
    const fabGsm = res.shipping[0].fabGSM;
    const fabType = res.shipping[0].fabtype;
    const shipPcs = res.shipping[0].shipPcs;
    this.shipDetails = res.shipping[0].shipPcs;
    console.log(shippingEtyId)
    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('shipId')?.setValue(shippingEtyId);
    row.get('fabGSM')?.setValue(fabGsm);
    row.get('shipPcs')?.setValue(shipPcs);
    row.get('fabtype')?.setValue(fabType);
  });
}

//-------------------------------------------------------------------------------------------------------



  get items() {
    return this.InvoiceEty.get("data") as FormArray
  }

  InvoiceEtyAddButton() {

    const row = this.fb.group({
      "id" : [''],
      "headId" : [''],
      "fabtype" : [''],
      "fabGSM" : [''],
      "orderNo" : [''],
      "style" : [''],
      "color" : [''],
      "size" : [''],
      "woId" : ['',Validators.required],
      "cutId" : ['',Validators.required],
      "inputId" : ['',Validators.required],
      "outputId" : ['',Validators.required],
      "packId" : ['',Validators.required],
      "shipId" : ['',Validators.required],
      "shipPcs" : [''],
      "fobRate" : [''],
      "valueUSD" : [''],
      "remarks" : ['']
    });
    this.items.push(row);    
  }

  delete(index:any){
    this.items.removeAt(index)
  }

  valid(value:any, i:any){
    const inputValue = value;
    const tolerance = (this.shipDetails)
    if(inputValue > tolerance ){
      alert("Allowed value with 5% tolerance is : " + tolerance);
      this.toleranceValid[i] = true
    }
    else{
      this.toleranceValid[i] = false
    }
    this.validlity()
  }

  validlity(){
    if(this.toleranceValid.includes(true)){
      this.valueExceeded = true;
    }
    else{
      this.valueExceeded = false;
    }
  }


  save(){
    // this.router.navigate(['/main/InvoiceListing'])
    // console.log(this.InvoiceEty.value)
    if (this.InvoiceEty.valid) {
      this.api.invoicePost(this.InvoiceEty.value).subscribe((res) => {
        if (res.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['main/InvoiceListing'])
        }
        else {
          alert("Error while saving...!!!")
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "check woId , cutId,inputId,outputId,packId,shipId , Invoice Date , invoice Missing" 
      });
    }
  }
}
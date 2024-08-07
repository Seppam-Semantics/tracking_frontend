import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-sew-output-entry',
  templateUrl: './sew-output-entry.component.html',
  styleUrls: ['./sew-output-entry.component.css']
})
export class SewOutputEntryComponent implements OnInit{
  SewoutputEty : FormGroup
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
  inputDetails: any;
  toleranceValid: any[] = [];

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) { 


    this.SewoutputEty = new FormGroup({
      outputDate : new FormControl('', Validators.required) ,
      data: this.fb.array([]),
    })

  }

  ngOnInit(): void {
    this.api.sewinput_buyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }

  //-------------------------------------------------------------------------------------------------------

getBuyerValue(index: any) {
  // this.buyerName = event.target.value;
  const formArray = this.SewoutputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.getorders()
}

getorders() {
  this.api.sewinput_buyersorders(this.Buyer_Value).subscribe((res) => {
    this.order = res.orders
  })
}

ordervalue(index: any) {
  // this.Order_Value = event.target.value
  const formArray = this.SewoutputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value =  row.get('buyer')?.value;
  this.Order_Value =  row.get('orderNo')?.value;
  this.orderdata()
}

orderdata() {
  this.api.sewinput_ordersstyles(this.Buyer_Value, this.Order_Value).subscribe((res) => {
    this.stylelist = res.styles;
  })
}
stylevalue(index: any) {
  const formArray = this.SewoutputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.Order_Value = row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;

  this.styledata()
}

styledata() {
  this.api.sewinput_stylescolors(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

colorvalue(index: any) {
  const formArray = this.SewoutputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.Order_Value = row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;
  this.color_Value = row.get('color')?.value;

  this.colordata()

}

colordata() {
  this.api.sewinput_colorssizes(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

getwoId(size: any, index: number){
  this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const woId = res.workorders[0].id;

    const formArray = this.SewoutputEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('woId')?.setValue(woId);
  });

  this.api.getcutdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const cuttingId = res.cutting[0].id;

    const formArray = this.SewoutputEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('cutId')?.setValue(cuttingId);
  });

  this.api.getsewinputfilterdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const SewinputEtyId = res.sewinginput[0].id;
    this.inputDetails = res.sewinginput[0].inputPcs;

    const formArray = this.SewoutputEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('inputId')?.setValue(SewinputEtyId);
  });
}

//-------------------------------------------------------------------------------------------------------



  get items() {
    return this.SewoutputEty.get("data") as FormArray
  }

  SewOutputEtyAddButton() {

    const row = this.fb.group({
      "id": [],
      "buyer": [''],
      "orderNo": [''],
      "style": [''],
      "color": [''],
      "size": [''],
      "woId": [''],
      "cutId": [''],
      "inputId": [''],
      "lineNo": [''],
      "bundleNo": [''],
      "mcUsed": [''],
      "mpUsed": [''],
      "mcHrs": [''],
      "outputPcs": [''],
      "timeperiod": [''],

    });
    this.items.push(row);

  }

  delete(index:any){
    this.items.removeAt(index)
  }

  valid(value:any, i:any){
    const inputValue = value;
    const tolerance = (this.inputDetails)
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

    // this.router.navigate(['main/SewOutputList'])

      if (this.SewoutputEty.valid) {
        this.api.sewoutputPost(this.SewoutputEty.value).subscribe((res) => {
          if (res.success) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: res.message,
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['main/SewOutputList'])
          }
          else {
            alert("Error while saving...!!!")
          }
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Check cutId and woId and InputId and outputDate Missing"
        });
      } 


  }
}

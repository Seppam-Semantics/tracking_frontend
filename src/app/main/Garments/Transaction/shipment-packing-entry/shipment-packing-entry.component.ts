import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-shipment-packing-entry',
  templateUrl: './shipment-packing-entry.component.html',
  styleUrls: ['./shipment-packing-entry.component.css']
})
export class ShipmentPackingEntryComponent {
  ShipEty : FormGroup
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
  toleranceValid: any[] = [];
  packvalue: any;
  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) { 


    this.ShipEty = new FormGroup({
      id : new FormControl(0),
      buyer: new FormControl(''),
      orderNo : new FormControl(''),
      notes : new FormControl(''),
      shipDate : new FormControl(''),
      data: this.fb.array([]),
    })

  }

  ngOnInit(): void {
    this.api.sewingpacking_buyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }

      //-------------------------------------------------------------------------------------------------------

getBuyerValue() {
  // this.buyerName = event.target.value;
  // const formArray = this.ShipEty.get('data') as FormArray;
  // const row = formArray.at(index);
  this.Buyer_Value = this.ShipEty.get('buyer')?.value;
  this.getorders()
}

getorders() {
  this.api.sewingpacking_buyersorders(this.Buyer_Value).subscribe((res) => {
    this.order = res.orders
  })
}

ordervalue() {
  // this.Order_Value = event.target.value
  // const formArray = this.ShipEty.get('data') as FormArray;
  // const row = formArray.at(index);
  this.Buyer_Value =  this.ShipEty.get('buyer')?.value;
  this.Order_Value =  this.ShipEty.get('orderNo')?.value;
  this.orderdata()
}

orderdata() {
  this.api.sewingpacking_ordersstyles(this.Buyer_Value, this.Order_Value).subscribe((res) => {
    this.stylelist = res.styles;
  })
}
stylevalue(index: any) {
  const formArray = this.ShipEty.get('data') as FormArray;
  const row = formArray.at(index);
  // this.Buyer_Value = row.get('buyer')?.value;
  // this.Order_Value = row.get('orderNo')?.value;
  this.Buyer_Value =  this.ShipEty.get('buyer')?.value;
  this.Order_Value =  this.ShipEty.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;

  this.styledata()
}

styledata() {
  this.api.sewingpacking_stylescolors(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

colorvalue(index: any) {
  const formArray = this.ShipEty.get('data') as FormArray;
  const row = formArray.at(index);
  // this.Buyer_Value = row.get('buyer')?.value;
  // this.Order_Value = row.get('orderNo')?.value;
  this.Buyer_Value =  this.ShipEty.get('buyer')?.value;
  this.Order_Value =  this.ShipEty.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;
  this.color_Value = row.get('color')?.value;

  this.colordata()

}

colordata() {
  this.api.sewingpacking_colorssizes(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

getwoId(size: any, index: number){
  this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const woId = res.workorders[0].id;
    const fabGsm = res.workorders[0].fabGsm;
    const fabType = res.workorders[0].fabType;
    const orderPcs = res.workorders[0].orderPcs;

    console.log("WOid" + woId)
    
    const formArray = this.ShipEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('woId')?.setValue(woId);
    row.get('fabGSM')?.setValue(fabGsm);
    row.get('orderPcs')?.setValue(orderPcs);
    row.get('fabtype')?.setValue(fabType);
  });

  this.api.getcutdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const cuttingId = res.cutting[0].id;
    console.log( "cuttingId" + cuttingId)
    const formArray = this.ShipEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('cutId')?.setValue(cuttingId);
  });

  this.api.getsewinputfilterdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const SewinputEtyId = res.sewinginput[0].id;
    console.log( "SewinputId" + SewinputEtyId)
    const formArray = this.ShipEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('inputId')?.setValue(SewinputEtyId);
  });

  this.api.getsewoutputdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const SewoutputEtyId = res.sewingoutput[0].id;
    console.log("SewoutputId" + SewoutputEtyId)
    const formArray = this.ShipEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('outputId')?.setValue(SewoutputEtyId);
  });


  this.api.getsewingpackingdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
  
    const PackingEtyId = res.sewingpacking[0].id;
    console.log("SewoutputId" + PackingEtyId)
    this.packvalue = res.sewingpacking[0].packPcs
    const formArray = this.ShipEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('packId')?.setValue(PackingEtyId);
  });
}

//-------------------------------------------------------------------------------------------------------


  get items() {
    return this.ShipEty.get("data") as FormArray
  }

  ShipEtyAddButton() {

    const row = this.fb.group({
      "id": [''],
      "style": [''],
      "color": [''],
      "size": [''],
      "fabtype": [''],
      "fabGSM":[''],
      "woId": ['',Validators.required],
      "cutId": ['',Validators.required],
      "inputId": ['',Validators.required],
      "outputId": ['',Validators.required],
      "packId": ['',Validators.required],
      "orderPcs": [''],
      "shipPcs": [''],
      "carton": [''],
      "pendingPcs": [''],
      "remarks": ['']
    });
    this.items.push(row);

    row.get('shipPcs')?.valueChanges.subscribe(()=>{
      this.calculateDiff()
    })

    row.get('orderPcs')?.valueChanges.subscribe(()=>{
      this.calculateDiff()
    })
    
  }

  calculateDiff(){
    this.items.controls.forEach((control:AbstractControl)=>{
      const row = control as FormGroup

      if (row instanceof FormGroup) {
        const ShipPcsValue = parseFloat(row.get('shipPcs')?.value);
        const CartonnosValue = parseFloat(row.get('orderPcs')?.value);
  
        const a =  CartonnosValue - ShipPcsValue
        const pendingPcs = parseFloat(a.toFixed(2));
  
        row.patchValue({ pendingPcs});
      }
    })
  }

  delete(index:any){
    this.items.removeAt(index)
  }

  valid(value:any, i:any){
    const inputValue = value;
    const tolerance = (this.packvalue)
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
    // this.router.navigate(['main/ShipmentListingList'])
    // console.log(this.ShipEty.value)
    if (this.ShipEty.valid) {
      this.api.shippingPost(this.ShipEty.value).subscribe((res) => {
        if (res.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['main/ShipmentListingList'])
        }
        else {
          alert("Error while saving...!!!")
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Check cutId , woId , InputId , OutputId , packId and shipDate Missing"
      });
    }
  }

}

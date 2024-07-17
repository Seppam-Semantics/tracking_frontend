import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-knit-factory-machine-entry',
  templateUrl: './knit-factory-machine-entry.component.html',
  styleUrls: ['./knit-factory-machine-entry.component.css']
})
export class KnitFactoryMachineEntryComponent implements OnInit{
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  filterDate1 : any
  filterDate2 : any
  cuttinglist: any;
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
  cuttinglistpath: any;
  cuttingDate: any;
  cutDate: any;
  buyerslist: any;
  OrderNolist: any;
  buyervalue:any
  orderNovalue:any
  knitFtyMachineForm:FormGroup
  ftyName: any;
  dayprod: any;
  values: any=[];
  previousRow:any;
  constructor(private fb: FormBuilder, private api: ApiService , private router : Router , private datePipe: DatePipe) { 
     
    this.knitFtyMachineForm = new FormGroup({
      id : new FormControl(0),
      buyer : new FormControl('', Validators.required) ,
      orderNo : new FormControl('',Validators.required),
      data: this.fb.array([]),
    })

  }

ngOnInit(): void {
  this.api.getbuyers().subscribe((res) => {
    this.buyers = res.buyers;
  })

  this.api.knitfty_name().subscribe((res) => {
    this.ftyName = res.factorys
  })
}

  //--------------------------------------------------------------------------------------------------------
  getBuyerValue() {
    // this.buyerName = event.target.value;
    // const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    // const row = formArray.at(index);
    this.Buyer_Value = this.knitFtyMachineForm.get('buyer')?.value;
    this.getorders()
  }

  getorders() {
    this.api.getorders(this.Buyer_Value).subscribe((res) => {
      this.order = res.orders
    })
  }

  ordervalue() {
    // this.Order_Value = event.target.value
    // const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    // const row = formArray.at(index);
    this.Buyer_Value = this.knitFtyMachineForm.get('buyer')?.value;
    this.Order_Value =  this.knitFtyMachineForm.get('orderNo')?.value;
    this.orderdata()
  }

  orderdata() {
    this.api.getstyle(this.Buyer_Value, this.Order_Value).subscribe((res) => {
      this.stylelist = res.styles;
    })
  }
  stylevalue(index: any) {
    const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = this.knitFtyMachineForm.get('buyer')?.value;
    this.Order_Value =  this.knitFtyMachineForm.get('orderNo')?.value;
    this.style_Value = row.get('style')?.value;

    this.styledata()
  }

  styledata() {
    this.api.getcolor(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  colorvalue(index: any) {
    const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = this.knitFtyMachineForm.get('buyer')?.value;
    this.Order_Value =  this.knitFtyMachineForm.get('orderNo')?.value;
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
    this.api.getmachineDiadetails(this.style_Value , size).subscribe((res)=>{
      const machineDia = res.machineDia[0].machineDia

      const formArray = this.knitFtyMachineForm.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('machineDia')?.setValue(machineDia);

    })
    this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      const greigeKg = res.workorders[0].greigeKg;

      const formArray = this.knitFtyMachineForm.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('woId')?.setValue(woId);
      row.get('greigeKg')?.setValue(greigeKg);
    });

}

production_days(factory : any, index:any){
  const formArray = this.knitFtyMachineForm.get('data') as FormArray;
  const row = formArray.at(index);
  const knitFty = factory
  const machineDia = row.get('machineDia')?.value;
  this.api.getProductionDays(knitFty, machineDia).subscribe((res)=>{
    this.dayprod = res.data[0].prodDay
    row.get('daysrequired')?.setValue(this.dayprod)
  })
}

//--------------------------------------------------------------------------------------------------------

get items() {
  return this.knitFtyMachineForm.get("data") as FormArray
}

knitFtyMachineAddButton() {

  const previousEndDate = this.items && this.items.length > 0 ? this.items.at(this.items.length - 1).get('enddate')?.value : null;
  this.previousRow = this.items.length > 0 ? this.items.at(this.items.length) : null;
   
  const row = this.fb.group({
    id: [''],
    style: [''],
    color: [''],
    size: [''],
    woId: ['', Validators.required],
    greigeKg: [''],
    machineDia: [''],
    knitFty: [''],
    allocated: [''],
    startDate: [previousEndDate ? new Date(previousEndDate) : ''],
    daysrequired: [''],
    endDate: [''],
  });

 
   this.items.push(row);

  //  this.values = this.items.getRawValue();

}

check(index:any){
  const formArray = this.knitFtyMachineForm.get('data') as FormArray;
  const row = formArray.at(index);
  const currentStyle = row.get('style')?.value;
  const currentColor = row.get('color')?.value;
  const currentSize = row.get('size')?.value;

  this.values = this.items.getRawValue();

  for (let i = 0; i < this.values.length; i++) {
    const style = this.values[i]?.style;
    const size = this.values[i]?.size;
    const color = this.values[i]?.color;
  
    if (currentStyle === style===undefined?"":style && currentColor === color===undefined?"":color && currentSize === size===undefined?"":size ) {
      
      const endDate = this.values[i]?.endDate;
      console.log(endDate)
        const formArray = this.knitFtyMachineForm.get('data') as FormArray;
        const row = formArray.at(index);
        row.get('startDate')?.setValue(endDate); // Set formatted date into form control
      }
    }
  }

calculateEndDate(index: number) {
  const row = this.items.at(index);
  const startDate = new Date(row.get('startDate')?.value);
  const daysReq = +row.get('daysrequired')?.value; // Convert daysreq to number

  if (startDate && !isNaN(daysReq)) {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + daysReq);
    row.get('endDate')?.setValue(endDate.toISOString().substring(0, 10)); // Set enddate in yyyy-MM-dd format
  }
}

delete(index:any){
  this.items.removeAt(index)
}

save(){
if(this.knitFtyMachineForm.valid){
  this.api.postAllocation(this.knitFtyMachineForm.value).subscribe((res)=>{
    alert(res.message);
    window.location.reload()
  })
}
else{
  alert("Please Choose the correct value from the WorkOrder")
}
}

}

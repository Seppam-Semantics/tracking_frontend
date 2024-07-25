import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-knit-factory-machine',
  templateUrl: './knit-factory-machine.component.html',
  styleUrls: ['./knit-factory-machine.component.css']
})
export class KnitFactoryMachineComponent {
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
  machine: any;
  size_Value: any;
  greigeKgTotal: any;
  toleranceValid: any[] = [];
  totalGreigeKg: number = 0;


  ngOnInit(): void {
    this.api.getbuyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  
    this.api.knitfty_name().subscribe((res) => {
      this.ftyName = res.factorys
    })

    this.api.getAllocation().subscribe((res)=>{
      this.machine = res.data
    })
    this.calculateEndDate();

    this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
          row.get('daysrequired')?.valueChanges.subscribe(() => {
              this.calculateEndDate();
          });

          row.get('startDate')?.valueChanges.subscribe(() => {
              this.calculateEndDate();
          });
      }
  });
  }

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router , private datePipe: DatePipe) { 
    this.knitFtyMachineForm = new FormGroup({
      id:new FormControl('',Validators.required),
      buyer : new FormControl('', Validators.required) ,
      orderNo : new FormControl('',Validators.required),
      data: this.fb.array([]),
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.machine, event.previousIndex, event.currentIndex);
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

  greigevalidation(index:any){
    const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = this.knitFtyMachineForm.get('buyer')?.value;
    this.Order_Value =  this.knitFtyMachineForm.get('orderNo')?.value;
    this.style_Value = row.get('style')?.value;
    this.color_Value = row.get('color')?.value;
    this.size_Value = row.get('size')?.value;
  
    this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, this.size_Value).subscribe((res) => {
      const woId = res.workorders[0].id;
      this.greigeKgTotal = res.workorders[0].greigeKg;
    })
  }

  valid(value:any, i:any){
    const inputValue = value;
    const tolerance = (this.greigeKgTotal)
    if(inputValue > tolerance ){
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
  

  production_days(factory : any, index:any){
    const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    const row = formArray.at(index);
    const knitFty = factory
    const machineDia = row.get('machineDia')?.value;
    this.api.getProductionDays(knitFty, machineDia).subscribe((res)=>{
      this.dayprod = res.data[0].prodDay
      const daysReq = ((row.get('greigeKg')?.value)/this.dayprod).toFixed()
      row.get('daysrequired')?.setValue(daysReq)
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
      "id": [''],
      "headId":[''],
      "style": [''],
      "color": [''],
      "size": [''],
      "woId": ['',Validators.required],
      "greigeKg": [''],
      "machineDia": [''],
      "knitFty": [''],
      "allocated": [''],
      "startDate": [previousEndDate ? new Date(previousEndDate) : ''],
      "daysrequired": [''],
      "endDate": [''],
    });
    this.items.push(row);
  
    row.get('daysrequired')?.valueChanges.subscribe(() => {
      this.calculateEndDate();
    });
  }



  check(index: number) {
    const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    const currentRow = formArray.at(index);
  
    const currentStyle = currentRow.get('style')?.value;
    const currentColor = currentRow.get('color')?.value;
    const currentSize = currentRow.get('size')?.value;
  
    for (let i = 0; i < index; i++) {
      const row = formArray.at(i);
      const style = row.get('style')?.value;
      const color = row.get('color')?.value;
      const size = row.get('size')?.value;
      const endDate = row.get('endDate')?.value;
  
      if (currentStyle === style && currentColor === color && currentSize === size) {
  
        const nextDay = new Date(endDate);
        nextDay.setDate(nextDay.getDate() + 1);
  
        currentRow.get('startDate')?.setValue(nextDay.toISOString().substring(0, 10)); // Format as yyyy-MM-dd
        break; // Assuming you want to update only the first matching row's startDate
      }
    }
  }

  

  
calculateEndDate() {


  this.items.controls.forEach((control: AbstractControl) => {
    const row = control as FormGroup;
    if (row instanceof FormGroup) {
      const daysReq = parseFloat(row.get('daysrequired')?.value) || 0;
  
      const startDate = new Date(row.get('startDate')?.value);
      // const daysReq = +row.get('daysrequired')?.value; // Convert daysreq to number
    
      if (startDate && !isNaN(daysReq)) {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + daysReq);
        row.get('endDate')?.setValue(endDate.toISOString().substring(0, 10)); // Set enddate in yyyy-MM-dd format
      }     

    
    }
  });
}
  
Addcheck(index: number) {
  const formArray = this.knitFtyMachineForm.get('data') as FormArray;
  const currentRow = formArray.at(index);

  const currentStyle = currentRow.get('style')?.value;
  const currentColor = currentRow.get('color')?.value;
  const currentSize = currentRow.get('size')?.value;
  const currentGreigeKg = parseFloat(currentRow.get('greigeKg')?.value) || 0;
  console.log(currentGreigeKg)  
  this.totalGreigeKg = currentGreigeKg;

  for (let i = 0; i < formArray.length; i++) {
    if (i !== index) {
      const row = formArray.at(i);
      const style = row.get('style')?.value;
      const color = row.get('color')?.value;
      const size = row.get('size')?.value;
      const greigeKg = parseFloat(row.get('greigeKg')?.value) || 0;

      if (currentStyle === style && currentColor === color && currentSize === size) {
        this.totalGreigeKg += greigeKg;
        const inputValue = this.totalGreigeKg;
        const tolerance = (this.greigeKgTotal)
        if(inputValue > tolerance ){
          this.toleranceValid[i] = true
        }
        else{
          this.toleranceValid[i] = false
        }
        this.validlity()

        console.log(this.totalGreigeKg)
      }
    }
  }
}


  delete(index:any){
    this.items.removeAt(index)
  }
  

  new(){ this.router.navigate(['main/KnitFactoryMachineEntry'])}

  Save(){
    
  }
  
  exportexcel() { }


  edit(id:any){
    this.editview = true;
    this.api.getSingleAllocation(id).subscribe((res)=>{
      this.knitFtyMachineForm.get("id")?.setValue(id);
      this.knitFtyMachineForm.get("buyer")?.setValue(res.data[0].buyer);
      this.knitFtyMachineForm.get("orderNo")?.setValue(res.data[0].orderNo);

      const EntryData = this.knitFtyMachineForm.get('data') as FormArray;
      EntryData.clear();
      res.data.forEach((dataItem: any) => {
        const Details = this.fb.group({
            "id": [dataItem.id],
            "headId":[dataItem.headId],
            "style": [dataItem.style],
            "color": [dataItem.color],
            "size": [dataItem.size],
            "woId": [dataItem.woId],
            "greigeKg": [dataItem.greigeKg],
            "machineDia": [dataItem.machineDia],
            "knitFty": [dataItem.knitFty],
            "allocated": [dataItem.allocated],
            "startDate": [dataItem.startDate],
            "daysrequired": [dataItem.daysrequired],
            "endDate": [dataItem.endDate]
        })

        EntryData.push(Details);
        Details.get('daysrequired')?.valueChanges.subscribe(() => {
          this.calculateEndDate();
        });
    })
  })
}

   update(){
    if(this.knitFtyMachineForm.valid){
      this.api.postAllocation(this.knitFtyMachineForm.value).subscribe((res)=>{
        alert(res.message);
        window.location.reload();
      })
    }
    }
  Entry(){ }

    back(){
      this.router.navigate(['/main/knitFactoryMain'])
    }
}
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
  machine: any;


  ngOnInit(): void {
    this.api.getbuyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  
    this.api.knitfty_name().subscribe((res) => {
      this.ftyName = res.factorys
    })

    this.api.getAllocation().subscribe((res)=>{
      console.log(res)
      this.machine = res.data
    })
  }

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router , private datePipe: DatePipe) { 
    this.knitFtyMachineForm = new FormGroup({
      buyer : new FormControl('', Validators.required) ,
      orderNo : new FormControl('',Validators.required),
      data: this.fb.array([]),
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
        row.get('machinedia')?.setValue(machineDia);
  
      })
      this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
        const woId = res.workorders[0].id;
        const greigeKg = res.workorders[0].greigeKg;
  
        const formArray = this.knitFtyMachineForm.get('data') as FormArray;
        const row = formArray.at(index);
        row.get('woId')?.setValue(woId);
        row.get('greigekgs')?.setValue(greigeKg);
      });
  
  }
  //--------------------------------------------------------------------------------------------------------

  
  get items() {
    return this.knitFtyMachineForm.get("data") as FormArray
  }
  
  knitFtyMachineAddButton() {
  
    const row = this.fb.group({
      "id": [''],
      "style": [''],
      "color": [''],
      "fsize": [''],
      "woId": ['',Validators.required],
      "greigekgs": [''],
      "machinedia": [''],
      "knitfty": [''],
      "allocmcnos": [''],
      "startdate": [''],
      "daysreq": [''],
      "enddate": [''],
    });
    this.items.push(row);
  
  }
  
  delete(index:any){
    this.items.removeAt(index)
  }
  

  new(){ this.router.navigate(['main/KnitFactoryMachineEntry'])}

  
  exportexcel() { }


  edit(id:any){
    console.log(id); 
    this.editview = true
  }

   update(){ }
  Entry(){ }
}
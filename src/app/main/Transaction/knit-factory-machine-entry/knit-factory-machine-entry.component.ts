import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Dropdown } from 'primeng/dropdown';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-knit-factory-machine-entry',
  templateUrl: './knit-factory-machine-entry.component.html',
  styleUrls: ['./knit-factory-machine-entry.component.css']
})
export class KnitFactoryMachineEntryComponent implements OnInit, AfterViewInit{
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
  totalGreigeKg:number = 0;
  toleranceValid: any[] = [];
  toleranceValid2: any[] = [];
  greigeKgTotal: any;
  size_Value: any;
  machineNosDta: any;
  totalMCNos: any;
  machineDia: any;

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router , private datePipe: DatePipe, private cdr: ChangeDetectorRef) { 
     
    this.knitFtyMachineForm = new FormGroup({
      data: this.fb.array([]),
    })

  }

ngOnInit(): void {
  this.api.getbuyers().subscribe((res) => {
    this.buyers = res.buyers;
  })
}

ngAfterViewInit(){
  setTimeout(() => {
    this.cdr.detectChanges();
  }); 
}

  //--------------------------------------------------------------------------------------------------------
  getBuyerValue(index:any) {
    const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.getorders()
  }

  getorders() {
    this.api.getorders(this.Buyer_Value).subscribe((res) => {
      this.order = res.orders
    })
  }

  ordervalue(index:any) {
    const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value =  row.get('orderNo')?.value;
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
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value =  row.get('orderNo')?.value;
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


  getwoId(index: number){
    const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    const row = formArray.at(index);

    const size  = row.get('size')?.value;
    this.api.getmachineDiadetails(this.style_Value , size).subscribe((res)=>{
      this.machineDia = res.machineDia[0].machineDia

      const formArray = this.knitFtyMachineForm.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('machineDia')?.setValue(this.machineDia);
    })
    this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      const formArray = this.knitFtyMachineForm.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('woId')?.setValue(woId);
    });
}

knitFactory(event:any){
  try{
  this.api.knitfactoryforentry(event).subscribe((res)=>{
    this.ftyName = res.data
  })
}
catch{}
}

greigevalidation(index:any){
  const formArray = this.knitFtyMachineForm.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.Order_Value =  row.get('orderNo')?.value;
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

valid2(value:any, i:any){
  const inputValue = value;
  const tolerance = (this.machineNosDta)
  if(inputValue > tolerance ){

    this.toleranceValid2[i] = true
  }
  else{
    this.toleranceValid2[i] = false
  }
  this.validlity2()
}

validlity(){
  if(this.toleranceValid.includes(true)){
    this.valueExceeded = true;
  }
  else{
    this.valueExceeded = false;
  }
}

validlity2(){
  if(this.toleranceValid2.includes(true)){
    this.valueExceeded = true;
  }
  else{
    this.valueExceeded = false;
  }
}


production_days(event:any,index:any){
  const formArray = this.knitFtyMachineForm.get('data') as FormArray;
  const row = formArray.at(index);
  const knitFty = row.get('knitFty')?.value
  const machineDia = row.get('machineDia')?.value;
  const allocated = event;
  const greige = row.get('greigeKg')?.value;
  this.api.getProductionDays(knitFty, machineDia).subscribe((res)=>{
    this.dayprod = res.data[0].prodDay
    this.machineNosDta = res.data[0].machineNos
    const daysReq = ((greige/(this.dayprod*allocated))).toFixed()
    row.get('daysrequired')?.setValue(daysReq)
  })
  this.api.getStartDate(knitFty, machineDia).subscribe((res)=>{
    const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    const daterow = formArray.at(0);
    daterow.get('startDate')?.setValue(res.data[0].endDate)
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
    id: [],
    buyer:[''],
    orderNo:[''],
    style: [''],
    color: [''],
    size: [''],
    woId: [''],
    greigeKg: [''],
    machineDia: ['',Validators.required],
    knitFty: ['',Validators.required],
    allocated: [''],
    startDate: [previousEndDate ? new Date(previousEndDate) : ''],
    daysrequired: [''],
    endDate: [''],
  });

  row.get('daysrequired')?.valueChanges.subscribe(() => {
    this.calculateEndDate();
  });
  
   this.items.push(row);

}

check() {
  try{
  const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    for(let index = formArray.length -1; index >= 0; index--) {

  const currentRow = formArray.at(index);

  const currentSize = currentRow.get('size')?.value;
  const currentmachineDia = currentRow.get('machineDia')?.value;
  const currentknitFty = currentRow.get('knitFty')?.value;

  let latestEndDate: Date | null = null;

  for (let i = 0; i < index; i++) {
    const row = formArray.at(i);
    const machineDia = row.get('machineDia')?.value;
    const knitFty = row.get('knitFty')?.value;
    const size = row.get('size')?.value;
    const endDate = row.get('endDate')?.value;
    
    if (currentknitFty === knitFty && currentmachineDia === machineDia && currentSize === size) {
      const endDateObj = new Date(endDate);
      if (!latestEndDate || endDateObj > latestEndDate) {
        latestEndDate = endDateObj;
      }
    }
  }

  if (latestEndDate) {
    const nextDay = new Date(latestEndDate);
    nextDay.setDate(nextDay.getDate() + 1);
    currentRow.get('startDate')?.setValue(nextDay.toISOString().substring(0, 10));
  }
}
}
catch{}
}


Addcheck(index: number) {
  try{
  const formArray = this.knitFtyMachineForm.get('data') as FormArray;
  const currentRow = formArray.at(index);

  const currentSize = currentRow.get('size')?.value;
  const currentmachineDia = currentRow.get('machineDia')?.value;
  const currentknitFty = currentRow.get('knitFty')?.value;
  const currentGreigeKg = parseFloat(currentRow.get('greigeKg')?.value) || 0;
  const currentMCNos = parseFloat(currentRow.get('allocated')?.value) || 0;
  this.totalGreigeKg = currentGreigeKg;
  this.totalMCNos = currentMCNos;

  for (let i = 0; i < formArray.length; i++) {
    if (i !== index) {
      const row = formArray.at(i);
      const machineDia = row.get('machineDia')?.value;
      const knitFty = row.get('knitFty')?.value;
      const size = row.get('size')?.value;

      const greigeKg = parseFloat(row.get('greigeKg')?.value) || 0;

      const allocated = parseFloat(row.get('allocated')?.value) || 0;

      if (currentknitFty === knitFty && currentmachineDia === machineDia && currentSize === size) {
        this.totalGreigeKg += greigeKg;
        this.totalMCNos += allocated
        const inputValue = this.totalGreigeKg;
        const inputValue2 = this.totalMCNos;
        const tolerance = (this.greigeKgTotal)
        const tolerance2 = (this.machineNosDta)
        if(inputValue > tolerance ){

          this.toleranceValid[i] = true
        }
        else{
          this.toleranceValid[i] = false
        }
        this.validlity()
        if(inputValue2>tolerance2){
          this.toleranceValid2[i] = true
        }else{
          this.toleranceValid2[i] = false
        }
        this.validlity2()
      }
    }
  }
}
catch{

}
}



calculateEndDate() {

try{
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
catch{}
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


@ViewChildren('buyername') buyername!: QueryList<Dropdown>;
buyerlist(index: any) {
  if (this.buyername) {
    setTimeout(() => {
      const dropdownArray = this.buyername.toArray();
      if (dropdownArray[index]) {
        dropdownArray[index].show();
      }
    });
  } else { }
}

@ViewChildren('orders') orders!: QueryList<Dropdown>;
orderlist(index:any) {
  if (this.orders) {
    setTimeout(() => {
    const orders = this.orders.toArray();
    if (orders[index]) {
      orders[index].show();
    }
  });
  } else { }
}

@ViewChildren('styles') styles!: QueryList<Dropdown>;
styleslist(index:any) {
  if (this.styles) {
    setTimeout(() => {
    const styles = this.styles.toArray();
    if (styles[index]) {
      styles[index].show();
    }
  })
  } else { }
}

@ViewChildren('colors') colors!: QueryList<Dropdown>;
colorslist(index:any) {
  if (this.colors) {
    setTimeout(() => {
    const colors = this.colors.toArray();
    if (colors[index]) {
      colors[index].show();
    }
  })
  } else { }
}

@ViewChildren('sizes') sizes!: QueryList<Dropdown>;
sizeslist(index:any) {
  if (this.sizes) {
    setTimeout(() => {
    const sizes = this.sizes.toArray();
    if (sizes[index]) {
      sizes[index].show();
    }
  })
  } else { }
}

back(){
  this.router.navigate(['/main/KnitFactoryMachine'])
}

}

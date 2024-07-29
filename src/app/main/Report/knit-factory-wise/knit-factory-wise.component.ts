import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef ,QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-knit-factory-wise',
  templateUrl: './knit-factory-wise.component.html',
  styleUrls: ['./knit-factory-wise.component.css']
})
export class KnitFactoryWiseComponent implements OnInit {
  valueExceeded: boolean = false;
  viewEntry: boolean = false;
  editview: boolean = false;
  knitFtyMachineForm: FormGroup
  ftyName: any;
  dayprod: any;
  values: any = [];
  previousRow: any;
  machine: any;
  size_Value: any;
  greigeKgTotal: any;
  toleranceValid: any[] = [];
  totalGreigeKg: number = 0;
  machineDiadrop: any;
  fty_name: any;
  knitfty: any
  machineDia: any
  AllIddata: any;
  buyers: any;
  Buyer_Value: any;
  order: any;
  Order_Value: any;
  stylelist: any;
  style_Value: any;
  colorlist: any;
  color_Value: any;
  sizelist: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private datePipe: DatePipe) {

    this.knitFtyMachineForm = new FormGroup({
      id: new FormControl('', Validators.required),
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

    this.api.getAllocation().subscribe((res) => {
      this.machine = res.data
    })

    this.api.getallmachineDiadetails().subscribe((res) => {
      this.machineDiadrop = res.data
    })

    this.api.getknitwofty().subscribe((res) => {
      this.fty_name = res.knitfty
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

  knitftyValue() {

    this.api.getSingleAllocation('', this.knitfty, '').subscribe((res) => {
    })
  }

  machineDiaValue() {
    this.api.getSingleAllocation('', this.knitfty, this.machineDia).subscribe((res) => {
      this.AllIddata = res.data

      const EntryData = this.knitFtyMachineForm.get('data') as FormArray;
      EntryData.clear();

      this.AllIddata.forEach((dataItem: any, i: any) => {
        const Details = this.fb.group({
          "id": [dataItem.id],
          "headId": [parseInt(dataItem.headId)],
          "seqId": [i + 1],
          "buyer": [dataItem.buyer],
          "orderNo": [dataItem.orderNo],
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
          "endDate": [dataItem.endDate],
          "nextid": [i+2],
          "oldId": [dataItem.oldId ? dataItem.oldId : dataItem.id]
        })

        EntryData.push(Details);
        Details.get('daysrequired')?.valueChanges.subscribe(() => {
          this.calculateEndDate();
        });
      })
    })
  }



  drop(event: CdkDragDrop<any[]>) {

    moveItemInArray(this.AllIddata, event.previousIndex, event.currentIndex);
  

    const entryData = this.knitFtyMachineForm.get('data') as FormArray;
    const movedItem = entryData.at(event.previousIndex);
    entryData.removeAt(event.previousIndex);
    entryData.insert(event.currentIndex, movedItem);
    this.updateSequenceIds();
  }
  
  updateSequenceIds() {
    const entryData = this.knitFtyMachineForm.get('data') as FormArray;
    entryData.controls.forEach((control, index) => {
      control.get('seqId')?.setValue(index + 1);
    });
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
    this.Order_Value = this.knitFtyMachineForm.get('orderNo')?.value;
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
    this.Order_Value = this.knitFtyMachineForm.get('orderNo')?.value;
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
    this.Order_Value = this.knitFtyMachineForm.get('orderNo')?.value;
    this.style_Value = row.get('style')?.value;
    this.color_Value = row.get('color')?.value;

    this.colordata()

  }

  colordata() {
    this.api.getsize(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }

  getwoId(size: any, index: number) {
    this.api.getmachineDiadetails(this.style_Value, size).subscribe((res) => {
      const machineDia = res.machineDia[0].machineDia

      const formArray = this.knitFtyMachineForm.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('machineDia')?.setValue(machineDia);

    })
    try{
    this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      const greigeKg = res.workorders[0].greigeKg;

      const formArray = this.knitFtyMachineForm.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('woId')?.setValue(woId);
      row.get('greigeKg')?.setValue(greigeKg);
    })
  }catch{}
  }

  greigevalidation(index: any) {
    const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = this.knitFtyMachineForm.get('buyer')?.value;
    this.Order_Value = this.knitFtyMachineForm.get('orderNo')?.value;
    this.style_Value = row.get('style')?.value;
    this.color_Value = row.get('color')?.value;
    this.size_Value = row.get('size')?.value;

    this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, this.size_Value).subscribe((res) => {
      const woId = res.workorders[0].id;
      this.greigeKgTotal = res.workorders[0].greigeKg;
    })
  }

  valid(value: any, i: any) {
    const inputValue = value;
    const tolerance = (this.greigeKgTotal)
    if (inputValue > tolerance) {
      alert("Allowed value is : " + tolerance);
      this.toleranceValid[i] = true
    }
    else {
      this.toleranceValid[i] = false
    }
    this.validlity()
  }

  validlity() {
    if (this.toleranceValid.includes(true)) {
      this.valueExceeded = true;
    }
    else {
      this.valueExceeded = false;
    }
  }


  production_days(factory: any, index: any) {
    const formArray = this.knitFtyMachineForm.get('data') as FormArray;
    const row = formArray.at(index);
    const knitFty = factory
    const machineDia = row.get('machineDia')?.value;
    this.api.getProductionDays(knitFty, machineDia).subscribe((res) => {
      this.dayprod = res.data[0].prodDay
      const daysReq = ((row.get('greigeKg')?.value) / this.dayprod).toFixed()
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
      "seqId": [],
      "headId": [],
      "buyer": [''],
      "orderNo": [''],
      "style": [''],
      "color": [''],
      "size": [''],
      "woId": ['', Validators.required],
      "greigeKg": [''],
      "machineDia": [''],
      "knitFty": [''],
      "allocated": [''],
      "startDate": [previousEndDate ? new Date(previousEndDate) : ''],
      "daysrequired": [''],
      "endDate": [''],
      "oldId": [''],
      "nextid":['']
    });
    this.items.push(row);

    row.get('daysrequired')?.valueChanges.subscribe(() => {
      this.calculateEndDate();
    });
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
    
    this.totalGreigeKg = currentGreigeKg;
  
    for (let i = 0; i < formArray.length; i++) {
      if (i !== index) {
        const row = formArray.at(i);
        const machineDia = row.get('machineDia')?.value;
        const knitFty = row.get('knitFty')?.value;
        const size = row.get('size')?.value;
  
        const greigeKg = parseFloat(row.get('greigeKg')?.value) || 0;
  
        if (currentknitFty === knitFty && currentmachineDia === machineDia && currentSize === size) {
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
          }
      }
    }
  }
  catch{ }
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

  @ViewChildren('buyername') buyername!: QueryList<Dropdown>;
buyerlist(index: any) {
  if (this.buyername) {
    setTimeout(() => {
      const dropdownArray = this.buyername.toArray();
      if (dropdownArray[index]) {
        dropdownArray[index].show();
      }
    });
  } else {
    console.error('buyername is not defined');
  }
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
  } else {
    console.error('orders is not defined');
  }
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
  } else {
    console.error('styles is not defined');
  }
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
  } else {
    console.error('colors is not defined');
  }
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
  } else {
    console.error('sizes is not defined');
  }
}

  back() {
    this.router.navigate(['main/knitFactoryMain'])
  }

  getSerialNumber(index: number): number {
    return index + 1;
  }

  save() {
    this.api.postAllocation(this.knitFtyMachineForm.value).subscribe((res) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

}

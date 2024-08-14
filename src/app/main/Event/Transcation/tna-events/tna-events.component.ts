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
  selector: 'app-tna-events',
  templateUrl: './tna-events.component.html',
  styleUrls: ['./tna-events.component.css']
})
export class TnaEventsComponent implements OnInit {
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  Buyer_Value: any;
  Order_Value: any;
  style_Value: any;
  color_Value: any;
  buyers: any;
  order: any;
  stylelist: any;
  colorlist: any;
  tnaEventsForm!:FormGroup
  previousRow:any;

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router , private datePipe: DatePipe, private cdr: ChangeDetectorRef) { 
     
    this.tnaEventsForm = new FormGroup({
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
    const formArray = this.tnaEventsForm.get('data') as FormArray;
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
    const formArray = this.tnaEventsForm.get('data') as FormArray;
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
    const formArray = this.tnaEventsForm.get('data') as FormArray;
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
    const formArray = this.tnaEventsForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderNo')?.value;
    this.style_Value = row.get('style')?.value;
    this.color_Value = row.get('color')?.value;

    this.colordata()

  }

  colordata() {

  }

//--------------------------------------------------------------------------------------------------------

get items() {
  return this.tnaEventsForm.get("data") as FormArray
}

AddButton() {
  const row = this.fb.group({
    id: [],
    buyer:[''],
    orderNo:[''],
    style: [''],
    color: [''],
    events: [''],
    planDate: [''],
    actualDate: ['' ],
    remarks: ['']
  });
   this.items.push(row);
}

delete(index:any){
  this.items.removeAt(index)
}

save(){
  console.log(this.tnaEventsForm.value)
// if(this.tnaEventsForm.valid){
//   this.api.postAllocation(this.tnaEventsForm.value).subscribe((res)=>{
//     alert(res.message);
//     window.location.reload()
//   })
// }
// else{
//   Swal.fire({
//     icon: "error",
//     title: "Oops...",
//     text: "Fill All Required datas"
//   });
// }
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

  back(){
    this.router.navigate(['main/EventList'])
  }
}

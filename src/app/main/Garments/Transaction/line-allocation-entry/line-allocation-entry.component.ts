import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-line-allocation-entry',
  templateUrl: './line-allocation-entry.component.html',
  styleUrls: ['./line-allocation-entry.component.css']
})
export class LineAllocationEntryComponent implements OnInit{
  valueExceeded : boolean = false;
  LineAllocationForm: FormGroup;

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
  shipDatevalue: any;


  ngOnInit(): void {
    this.api.getbuyersData().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }

  constructor(private api : ApiService , private fb : FormBuilder){

    this.LineAllocationForm = new FormGroup ({
      data : this.fb.array([])
    })

  }

  //---------------------------------------------------------------------------------------------------

  getBuyerValue(index: any) {
    // this.buyerName = event.target.value;
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.getorders()
  }

  getorders() {
    this.api.Buyer_to_order(this.Buyer_Value).subscribe((res) => {
      this.order = res.orderNo
    })
  }

  ordervalue(index: any) {
    // this.Order_Value = event.target.value
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value =  row.get('buyer')?.value;
    this.Order_Value =  row.get('orderno')?.value;
    this.orderdata()
  }

  orderdata() {
    this.api.order_to_style(this.Buyer_Value, this.Order_Value).subscribe((res) => {
      this.stylelist = res.style;
    })
  }
  stylevalue(index: any) {
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderno')?.value;
    this.style_Value = row.get('style')?.value;
    this.styledata()
  }

  styledata() {
    this.api.style_to_color(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
      this.colorlist = res.color;
    })
  }


  //---------------------------------------------------------------------------------------------------

  get items(){
    return this.LineAllocationForm.get("data") as FormArray
  }

  LineAllocationfun(){
    const row = this.fb.group({
      "id" : [''],
      "buyer" : [''],
      "orderno" : [''],
      "style" : [''],
      "color" : [''],
      "shipdate" : [''],
      "fridate" : [''],
      "orderpcs" : [''],
      "planqty" : [''],
      "line" : [''],
      "startdate" : [''],
      "daysreqd" : [''],
      "enddate" : [''],
      "nextid" : ['']
    });

    this.items.push(row)
    row.get('shipdate')?.valueChanges.subscribe(() => {
      this.calculateEndDate();
    });
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

//-----------------------------------------------------------------------

ShipDate(index:any){
  const formArray = this.LineAllocationForm.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.Order_Value = row.get('orderno')?.value;
  this.api.lineallocationshipDate(this.Buyer_Value,this.Order_Value).subscribe((res)=>{
    this.shipDatevalue = res.shipDate[0].shipDate
    console.log(this.shipDatevalue)
    row.get('shipdate')?.setValue(this.shipDatevalue);
  })
}

OrderPcsData(index:any){
  const formArray = this.LineAllocationForm.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.Order_Value = row.get('orderno')?.value;
  this.style_Value = row.get('style')?.value;
  this.color_Value = row.get('color')?.value;
  this.api.lineallocationOrderPcs(this.Buyer_Value,this.Order_Value,this.style_Value,this.color_Value).subscribe((res)=>{
    console.log(res)
  })
}

calculateEndDate() {

  try{
    this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
    
        const shipdate = new Date(row.get('shipdate')?.value);
      
        if (shipdate) {
          const endDate = new Date(shipdate);
          endDate.setDate(shipdate.getDate() - 7);
          row.get('fridate')?.setValue(endDate.toISOString().substring(0, 10));
        }       
      
      }
    });
  }
  catch{}
  }
//-----------------------------------------------------------------------
}

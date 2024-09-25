import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { EventsapiService } from '../../eventsapi.service';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-tna-event-update',
  templateUrl: './tna-event-update.component.html',
  styleUrls: ['./tna-event-update.component.css']
})
export class TnaEventUpdateComponent implements OnInit {
valueExceeded: boolean = false;
clickCount = 1;
datePlan : any[]= []
tnaEventUpdate!: FormGroup;
tnaEventNew !: FormGroup;
colorlist : any;
data: any[] = [];
  Buyer_Value: any;
  order: any;
  Order_Value: any;
  stylelist: any;
  style_Value: any;
  color_Value: any;
  eventlist: any;
  buyers: any;
  visible : boolean = false;
  tnaData: any;


constructor(private router : Router, private fb : FormBuilder, private api : ApiService, private api1 : EventsapiService){
  this.tnaEventNew = this.fb.group({
    id : new FormControl(),
    buyer : new FormControl(),
    orderNo : new FormControl(),
    style : new FormControl(),
    color : new FormControl(),
    data : this.fb.array([])
  })
  this.tnaEventUpdate = this.fb.group({
    id : new FormControl(),
    buyer : new FormControl(),
    orderNo : new FormControl(),
    style : new FormControl(),
    color : new FormControl(),
    data : this.fb.array([])
  })
}

ngOnInit(): void {
  this.api.getbuyers().subscribe((res) => {
    this.buyers = res.buyers;
  })
}

get rows(): FormArray {
  return this.tnaEventNew.get('data') as FormArray;
}

get rowsupdate(): FormArray {
  return this.tnaEventUpdate.get('data') as FormArray;
}
  

duplicateDate() {
  if(this.Buyer_Value && this.Order_Value && this.style_Value && this.color_Value){
    this.api1.getTNAEvent(this.style_Value).subscribe((res)=>{
      // console.log(res)
      this.tnaData = res.data
      this.tnaEventUpdate.patchValue({
        id : this.tnaData[0].headId,
        buyer : this.Buyer_Value,
        orderNo : this.Order_Value,
        style : this.style_Value,
        color : this.color_Value
      })
      this.rowsupdate.clear();
      this.tnaData.forEach((row : any) => {
        const details = this.fb.group({
          id: [0],
          plan: [row.plans + 1],
          events: [row.events],
          planDate: [row.planDate],
          actualDate: [row.actualDate]
        });
        this.rowsupdate.push(details);
      });
    })
    this.visible = true;
  }
  else{
    alert("Please select the buyer, orderNo, style, color")
  }
}






getBuyerValue() {
  this.Buyer_Value = this.tnaEventNew.get('buyer')?.value;
  this.getorders()
}

getorders() {
  this.api.getorders(this.Buyer_Value).subscribe((res) => {
    this.order = res.orders
  })
}

ordervalue() {
  this.Buyer_Value = this.tnaEventNew.get('buyer')?.value;
  this.Order_Value =  this.tnaEventNew.get('orderNo')?.value;
  this.orderdata()
}

orderdata() {
  this.api.getstyle(this.Buyer_Value, this.Order_Value).subscribe((res) => {
    this.stylelist = res.styles;
  })
}
stylevalue() {
  this.Buyer_Value = this.tnaEventNew.get('buyer')?.value;
  this.Order_Value =  this.tnaEventNew.get('orderNo')?.value;
  this.style_Value = this.tnaEventNew.get('style')?.value;

  this.styledata()
}

styledata() {
  this.api.getcolor(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

colorvalue() {
  this.Buyer_Value = this.tnaEventNew.get('buyer')?.value;
  this.Order_Value = this.tnaEventNew.get('orderNo')?.value;
  this.style_Value = this.tnaEventNew.get('style')?.value;
  this.color_Value = this.tnaEventNew.get('color')?.value;

  this.api1.getTNAEvent(this.style_Value).subscribe((res)=>{
      // console.log(res)
      this.eventlist = res.data
      this.tnaEventNew.patchValue({
        id : this.eventlist[0].headId ? this.eventlist[0]?.headId : 0,
        buyer : this.Buyer_Value,
        orderNo : this.Order_Value,
        style : this.style_Value,
        color : this.color_Value
      })
      this.rows.clear();
      // console.log(res)
      this.eventlist.forEach((row : any) => {
        const details = this.fb.group({
          id : [row.id ? row.id : 0],
          plan : [row.plans ? row.plans : 1],
          events: [row.events],
          planDate: [row.planDate], 
          actualDate: [row.actualDate] 
        });
        this.rows.push(details);
      });
    }
  )
}

@ViewChildren('buyername') buyername!: QueryList<Dropdown>;
buyerlist() {
  if (this.buyername) {
    setTimeout(() => {
      const dropdownArray = this.buyername.toArray();
        dropdownArray[0].show();
    });
  }
}

@ViewChildren('orders') orders!: QueryList<Dropdown>;
orderlist() {
  if (this.orders) {
    setTimeout(() => {
    const orders = this.orders.toArray();
      orders[0].show();
  });
  }
}

@ViewChildren('styles') styles!: QueryList<Dropdown>;
styleslist() {
  if (this.styles) {
    setTimeout(() => {
    const styles = this.styles.toArray();
      styles[0].show();
  })
  }
}

save(){
  // console.log(this.tnaEventNew.value)
  this.api1.postTnaEvents(this.tnaEventNew.value).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

update(){
  // console.log(this.tnaEventUpdate.value)
  this.api1.postTnaEvents(this.tnaEventUpdate.value).subscribe((res)=>{
    alert(res.message)
  })
}

back(){
  this.router.navigate(['main/EventList'])
}

}
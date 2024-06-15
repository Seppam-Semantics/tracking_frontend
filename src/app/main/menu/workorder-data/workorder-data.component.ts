import { Component, NgModule, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api.service';
import * as xls from 'xlsx'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workorder-data',
  templateUrl: './workorder-data.component.html',
  styleUrls: ['./workorder-data.component.css']
})
export class WorkorderDataComponent implements OnInit{
  Buyer_Value : any;
  buyersDta: any;
  orderNoDta: any;
  Order_Value: any;
  styleDta: any;
  style_Value: any;
  colorDta: any;
  color_Value: any;
  sizeDta: any;
  size_Value: any;
  sizeid: any;
  fsizeDta: any;
  fsize_Value: any;
  fabricstypedta: any;
  fabdiaDta: any;
  fabGsmDta: any;
  fabdia_Value: any;
  FabGsm_Value: any;
  spinftydta: any;
  knitFtydta: any;
  dyeFtydta: any;
  yarntypedta: any;
  finishfabConsumptionDta: any;
ngOnInit(): void {
  this.buyerdata()
  this.api.fabric_type_BO().subscribe((res)=>{
    this.fabricstypedta = res.fabricstype
  })

  this.api.Spin_Fty_BO().subscribe((res)=>{
    this.spinftydta = res.SpinFty
  })

  this.api.Knit_Fty_BO().subscribe((res)=>{
    this.knitFtydta = res.knitFty
  })

  this.api.Dyein_Fty_BO().subscribe((res)=>{
    this.dyeFtydta = res.dyeFty
  })

  this.api.yarn_type_BO().subscribe((res)=>{
    this.yarntypedta = res.yarntype
  })
}

constructor(private api : ApiService , private router : Router , private fb : FormBuilder){}

buyervalue(event:any){
  this.Buyer_Value = event.target.value
}
ordervalue(event:any){
  this.Order_Value = event.target.value
}

buyerdata(){
  this.api.Buyer_to_order(this.Buyer_Value).subscribe((res)=>{
      this.buyersDta = res.buyers
      this.orderNoDta = res.orderNo
    })
}

orderdata(){
  this.api.order_to_style(this.Buyer_Value,this.Order_Value).subscribe((res)=>{
      this.styleDta = res.style
    })
}

stylevalue(event:any){
  this.style_Value = event.target.value
}

styledata(){
  this.api.style_to_color(this.Buyer_Value,this.Order_Value,this.style_Value).subscribe((res)=>{
    this.colorDta = res.color
  })
}

colorvalue(event:any){
  this.color_Value = event.target.value
}

colordata(){
  this.api.color_to_size(this.Buyer_Value,this.Order_Value,this.style_Value,this.color_Value).subscribe((res)=>{
    this.sizeDta = res.size
  })
}

sizevalue(event:any){
  this.size_Value = event.target.value
}

sizedata(){
  this.api.size_to_id(this.Buyer_Value,this.Order_Value,this.style_Value,this.color_Value,this.size_Value).subscribe((res)=>{
    this.sizeid = res.sizeId
    console.log(this.sizeid)
  })

  this.api.f_size_BO(this.style_Value,this.size_Value).subscribe((res)=>{
    this.fsizeDta = res.fsize
    this.fabdiaDta = res.FabDia
    this.fabGsmDta = res.FabGsm
    this.finishfabConsumptionDta = res.finishfabConsumption[0].finishfabConsumption
    console.log(res)
  })
}

fsizedata(){
 
}
fsizevalue(event:any){
  this.fsize_Value = event.target.value
}

fabdiavalue(event:any){
  this.fabdia_Value = event.target.value
}

FabGsmvalue(event:any){
  this.FabGsm_Value = event.target.value
}

calculateDiff() {
  this.items.controls.forEach((control: AbstractControl) => {
    const row = control as FormGroup;
    if (row instanceof FormGroup) {
      const OrderPcs = parseFloat(row.get('OrderPcs')?.value) || 0;
      const FinishKg1 = (this.finishfabConsumptionDta)* OrderPcs ;
      console.log(this.finishfabConsumptionDta)
      const FinishKg = parseFloat(FinishKg1.toFixed(2));

      row.patchValue({ FinishKg });
    }
  });
}

buyerorderform = new FormGroup({
  data: this.fb.array([])
})
get items() {
  return this.buyerorderform.get("data") as FormArray;
}
add1button(){
  const row = this.fb.group({
    "Buyer": new FormControl(''),
    "OrderNo": new FormControl(''),
    "Style": new FormControl(''),
    "Color": new FormControl(''),
    "FSize": new FormControl(''),
    "GSize": new FormControl(''),
    "FabType": new FormControl(''),
    "FabDia": new FormControl(''),
    "FabGsm": new FormControl(''),
    "KnitSL": new FormControl(''),
    "YarnType": new FormControl(''),
    "YarnKg": new FormControl(''),
    "GreigeKg": new FormControl(''),
    "FinishKg": new FormControl(''),
    "SpinFty": new FormControl(''),
    "KnitFty": new FormControl(''),
    "DyeinFty": new FormControl(''),
    "OrderPcs": new FormControl(''),
    "OrderFOBRate": new FormControl(''),
    "KnitRate": new FormControl(''),
    "DyeRate": new FormControl(''),
  });
  this.items.push(row);

  row.get('OrderPcs')?.valueChanges.subscribe(() => {
    this.calculateDiff();
  });

}

Delete(index: number) {
  this.items.removeAt(index);
}
}
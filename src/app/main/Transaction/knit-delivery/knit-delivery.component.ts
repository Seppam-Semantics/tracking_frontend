import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-knit-delivery',
  templateUrl: './knit-delivery.component.html',
  styleUrls: ['./knit-delivery.component.css']
})
export class KnitDeliveryComponent {
  DateData: any
  KnitFactoryData: any
  ToDyeFtyData: any
  BuyerData: any
  OrderData: any
  StyleData: any
  ColorData: any
  SizeData: any
  KnitRateData: any
  KnitDeliveryNewPop: boolean = false
  KnitDelivery!: FormGroup
  fty_name: any;
  buyer: any;
  order: any;
  stylelist: any;
  colorlist: any;
  sizelist: any;
  buyerName: any;
  orderNo: any;
  style: any;
  color: any;
  size: any;
  knitDelAllData: any;

  ngOnInit(): void {
    this.buyername()
  }
  constructor(private fb: FormBuilder, private router: Router , private api : ApiService) {

    this.KnitDelivery = new FormGroup({
      "date": new FormControl(''),
      "factory": new FormControl(''),
      data: this.fb.array([]),
      "RollsTotal": new FormControl(),
      "DeliveryTotal": new FormControl(),
      "KnitTotal": new FormControl(),
    })



    this.api.knitfty_name().subscribe((res) => {
      this.fty_name = res.factorys
    })

    this.api.getKnitDelivery().subscribe((res)=>{
      this.knitDelAllData = res.knitDelivery
    })
  }




  get items() {
    return this.KnitDelivery.get("data") as FormArray;
  }

  KnitDeliveryAddButton() {

    const row = this.fb.group({
      "id": new FormControl(),
      "woId": new FormControl(),
      "dyeFactory": new FormControl(),
      "knitChallan": new FormControl(),
      "scandexChallan": new FormControl(),
      "buyer": new FormControl(),
      "orderNo": new FormControl(),
      "style": new FormControl(),
      "color": new FormControl(),
      "size": new FormControl(),
      "noOfRolls": new FormControl(''),
      "deliveryKgs": new FormControl(''),
      "knitRate": new FormControl(''),
      "knitValue": new FormControl(''),

    });

    row.get('knitRate')?.valueChanges.subscribe(() => {
      this.calculate();
    });

    this.items.push(row);
  }

  KnitDeliveryRemoveButton(index: any) {
    this.items.removeAt(index);
  }

  calculate() {
    let DeliveryGreigeFabTotal = 0;
    let noRollsTotal = 0;
    let KnitValueTotal2 = 0;
    this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const noRolls = parseFloat(row.get('noOfRolls')?.value) || 0;
        const KnitRate = parseFloat(row.get('knitRate')?.value) || 0;
        const DeliveryGreigeFab = parseFloat(row.get('deliveryKgs')?.value) || 0;
        const knitdata = parseFloat(row.get('knitValue')?.value) || 0;

        const KnitTotal = KnitRate * DeliveryGreigeFab

        DeliveryGreigeFabTotal += DeliveryGreigeFab;

        noRollsTotal += noRolls

        KnitValueTotal2 += knitdata

        const knitValue = parseFloat(KnitTotal.toFixed(2));

        row.patchValue({ knitValue });
      }
      this.KnitDelivery.get('DeliveryTotal')?.setValue(DeliveryGreigeFabTotal);
      this.KnitDelivery.get('RollsTotal')?.setValue(noRollsTotal);
      this.KnitDelivery.get('KnitTotal')?.setValue(KnitValueTotal2);
    });
  }
  //-------------------------------------------------------------------------//
buyername() {
  this.api.getbuyers().subscribe((res) => {
    this.buyer = res.buyers
  })
}
getBuyerValue(event: any) {
  this.buyerName = event.target.value;
}

getorders() {
  this.api.getorders(this.buyerName).subscribe((res) => {
    this.order = res.orders
  })
}

getOrderValue(event: any) {
  this.orderNo = event.target.value
}

getstyle() {
  this.api.getstyle(this.buyerName, this.orderNo).subscribe((res) => {
    this.stylelist = res.styles;
  })
}

getstylevalue(event: any) {
  this.style = event.target.value
}

getcolor() {
  this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

getcolorvalue(event: any) {
  this.color = event.target.value
}

getsize() {
  this.api.getsize(this.buyerName, this.orderNo, this.style, this.color).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}
//-------------------------------------------------------------------------//
  saveButton() {
    console.log(this.KnitDelivery.value)
  }

  edit() {
    this.KnitDeliveryNewPop = true;
  }


  new() {
    this.router.navigate(['/main/Knit-DelEntry'])
  }


}

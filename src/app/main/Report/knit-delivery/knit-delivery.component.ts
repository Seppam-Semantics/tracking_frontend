import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2';

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
  knitheaderData: any;
  knitlineData: any[]=[];
  knitAllData: any[]=[];
  kintid: any;
  factoryname: any;
  knitdelFillter:any
  buyerlist: any;
  orderNolist: any;
  buyerFillter:any;
  orderNoFillter:any
  colorFillter:any
  colorlist2:any
  TotalValue: any;
  ngOnInit(): void {
    this.buyername()
    this.knitdelBuyerFilter()
    this.knitdelOrderFilter()

    this.api.knitdelivery_buyer_list().subscribe((res)=>{
      this.buyerlist = res.buyer
    })

    this.api.knitdelivery_orderNo_list().subscribe((res)=>{
      this.orderNolist = res.orderNo
    })

    this.api.knitdelivery_color_list().subscribe((res)=>{
      this.colorlist2 = res.color
    })

    this.api.knitdelivery_Total_Fillter().subscribe((res)=>{
      this.TotalValue = res.knitDeliveryTotal[0].totalKg
    })
  
  }
  constructor(private fb: FormBuilder, private router: Router, private api: ApiService) {

    this.KnitDelivery = new FormGroup({
      "id": new FormControl(),
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

    // this.api.getKnitDelivery().subscribe((res) => {
    //   this.knitDelAllData = res.knitDelivery
    // })

    this.api.dye_factory_name().subscribe((res)=>{
      this.factoryname=res.factorys
    })
    
  }
  
  colorjson1(data: any): any {
    return JSON.parse(data);
  }
  colorjson2(data: any): any {
    return JSON.parse(data);
  }

  get items() {
    return this.KnitDelivery.get("data") as FormArray;
  }
  knitdelBuyerFilter(){
    this.api.knitdelivery_fty_Fillter(this.buyerFillter  ,'').subscribe((res)=>{
      this.knitDelAllData = res.knitDelivery    })

      this.api.knitdelivery_Total_Fillter(this.buyerFillter  ,'').subscribe((res)=>{
        this.TotalValue = res.knitDeliveryTotal[0].totalKg
      })
    }

  knitdelOrderFilter(){
    this.api.knitdelivery_fty_Fillter('',this.orderNoFillter).subscribe((res)=>{
      this.knitDelAllData = res.knitDelivery
    })
  
    this.api.knitdelivery_Total_Fillter('',this.orderNoFillter).subscribe((res)=>{
      this.TotalValue = res.knitDeliveryTotal[0].totalKg
    })
  
  }

  knitdelColorFilter(){
    this.api.knitdelivery_fty_Fillter('','',this.colorFillter).subscribe((res)=>{
      this.knitDelAllData = res.knitDelivery
    })

    this.api.knitdelivery_Total_Fillter('','',this.colorFillter).subscribe((res)=>{
      this.TotalValue = res.knitDeliveryTotal[0].totalKg
    })

  }
  
  fileName = "knitDeliveryReport.xlsx"
exportexcel() {

    Swal.fire({
      title: "Are you sure?",
      text: "You Want To Download Report!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Download it!"
    }).then((result) => {
      if (result.isConfirmed) {

        let data = document.getElementById("table-data");
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, this.fileName);      
        
        Swal.fire({
          title: "Good job!",
          text: "Your Download Compleated !!!",
          icon: "success"
        });
      }
    });
}

  KnitDeliveryAddButton() {

    const row = this.fb.group({
      "id": new FormControl(''),
      "knitDelId":new FormControl(this.kintid),
      "woId": new FormControl(''),
      "dyeFactory": new FormControl(''),
      "knitChallan": new FormControl(''),
      "scandexChallan": new FormControl(''),
      "buyer": new FormControl(''),
      "orderNo": new FormControl(''),
      "style": new FormControl(''),
      "color": new FormControl(''),
      "size": new FormControl(''),
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
// <!------------------------------------------------------------>
buyername(){
  this.api.getbuyers().subscribe((res)=>{
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

getOrderValue(event:any){
  this.orderNo = event.target.value
}

getstyle() {
  this.api.getstyle(this.buyerName, this.orderNo).subscribe((res) => {
    this.stylelist = res.styles;
  })
}

getstylevalue(event:any){
  this.style = event.target.value
}

getcolor() {
  this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

getcolorvalue(event:any){
  this.color = event.target.value
}

getsize() {
  this.api.getsize(this.buyerName, this.orderNo, this.style, this.color).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

getWoId(size: any, index: number) {
  this.api.getwodetails(this.buyerName, this.orderNo, this.style, this.color, size ).subscribe((res) => {
    const woId = res.workorders[0].id;
    const formArray = this.KnitDelivery.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('woId')?.setValue(woId);
  });
}
// <!------------------------------------------------------------>
  delete(id: any) {
    this.api.deleteKnitDelivery(id).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })

  }

  edit(id: any) {
    this.KnitDeliveryNewPop = true;
    this.kintid = id
    this.api.getSingleKnitDel(this.kintid).subscribe((res) => {
      this.knitAllData = res;
      this.knitheaderData = res. headerData[0]
      this.knitlineData = res. lineData
      this.KnitDelivery.patchValue({
        "id": this.kintid,
        "date": this.knitheaderData.date,
        "factory": this.knitheaderData.factory,
        "RollsTotal": this.knitheaderData.totalrolls,
        "DeliveryTotal": this.knitheaderData.totalKg,
        "KnitTotal": this.knitheaderData.knit_total,
      });

      const KnitEntryData = this.KnitDelivery.get('data') as FormArray;
      KnitEntryData.clear();

      const formControls: FormGroup[] = [];
      this.knitlineData.forEach((dataItem: any) => {
        formControls.push(
          this.fb.group({
            "id": dataItem.id,
            "knitDelId": dataItem.knitDelId,
            "woId": dataItem.woId,
            "dyeFactory": dataItem.dyeFactory,
            "knitChallan": dataItem.knitChallan,
            "scandexChallan": dataItem.scandexChallan,
            "buyer": dataItem.buyer,
            "orderNo": dataItem.orderNo,
            "style": dataItem.style,
            "color": dataItem.color,
            "size": dataItem.size,
            "noOfRolls": dataItem.noOfRolls,
            "deliveryKgs": dataItem.deliveryKgs,
            "knitRate": dataItem.knitRate,
            "knitValue": dataItem.knitValue,
          })
        );
      });

      this.KnitDelivery.setControl('data', this.fb.array(formControls));

    });
  }

  UpdateButton() {
    this.api.addUpdateKnitDelivery(this.KnitDelivery.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

  new() {
    this.router.navigate(['/main/Knit-DelEntry'])
  }


}

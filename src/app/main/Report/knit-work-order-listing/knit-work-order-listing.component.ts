import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-knit-work-order-listing',
  templateUrl: './knit-work-order-listing.component.html',
  styleUrls: ['./knit-work-order-listing.component.css']
})
export class KnitWorkOrderListingComponent implements OnInit {

  BuyerDate: any;
  OrderDate: any;
  KnitWorkOrderFrom!: FormGroup
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
  factoryname: any;
  editview: boolean = false;
  viewEntry: boolean = false;
  ftyName: any;
  ftyname: any
  KnitWorkOrderAllData: any;
  KnitWorkOrderhederdata: any;
  KnitWorkOrderlineData: any;
  KnitWorkOrderlineData1: any[] = [];
  KnitFtyFillter: string = '';
  BuyerFillter: any;
  OrderFillter: any;
  BuyerAllData: any[] = [];
  OrderAllData: any;
  ViewEtyKnitWorkOrderhederdata: any;
  ViewEtyKnitWorkOrderlineData1: any;
  download: any;
  knitKgTotal: any;

  ngOnInit(): void {
    this.buyername(), this.factoryName()
    this.alldata()
    this.KnitWorkOrderFactoryFilter()
    this.KnitWorkOrderBuyerFilter()
    this.KnitWorkOrderOrderFilter()
    this.BuyerAllData = [{ buyer: "Nodata" }]
    this.OrderAllData = [{ orderNo: "Nodata" }]
  }
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {

    this.KnitWorkOrderFrom = new FormGroup({
      "id": new FormControl(''),
      "buyer": new FormControl(''),
      "orderNo": new FormControl(''),
      "knitfty": new FormControl(''),
      "knitfty_details": new FormControl(''),
      "woNo": new FormControl(''),
      "woRefNo": new FormControl(''),
      "woDate": new FormControl(''),
      "completedDate": new FormControl(''),
      "notes": new FormControl(''),
      data: this.fb.array([]),
    })

  }

  buyername() {
    this.api.getbuyers().subscribe((res) => {
      this.buyer = res.buyers
    })
  }

  factoryName() {
    this.api.knitfty_name().subscribe((res) => {
      this.ftyName = res.factorys
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

  getstylevalue(index: any) {
    // this.style = event.target.value
    const formArray = this.KnitWorkOrderFrom.get('data') as FormArray;
    const row = formArray.at(index);
    this.style = row.get('style')?.value;
 
    this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  getcolor() {
    this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  getcolorvalue(event: any) {
    this.color = event.target.value
  }

  getsize(index:any) {

    const formArray = this.KnitWorkOrderFrom.get('data') as FormArray;
    const row = formArray.at(index);
    this. style = row.get('style')?.value;
    this. color = row.get('color')?.value;

    this.api.getsize(this.buyerName, this.orderNo, this.style, this.color).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }

  getWoId(size: any, index: number) {
    this.api.getwodetails(this.buyerName, this.orderNo, this.style, this.color, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      const formArray = this.KnitWorkOrderFrom.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('knitWoId')?.setValue(woId);
    });
  }

  KnitWorkOrderFactoryFilter() {
    this.api.knitworkorder_fty_Fillter(this.KnitFtyFillter).subscribe((res) => {
      this.KnitWorkOrderAllData = res.workorders
      this.BuyerAllData = res.buyer
      this.knitKgTotal = res.knitKgTotal[0].knitKgTotal
    })
  }

  KnitWorkOrderBuyerFilter() {
    this.api.knitworkorder_buyer_Fillter(this.KnitFtyFillter, this.BuyerFillter).subscribe((res) => {
      this.KnitWorkOrderAllData = res.workorders
      this.OrderAllData = res.orderNo
      this.knitKgTotal = res.knitKgTotal[0].knitKgTotal

    })
  }

  KnitWorkOrderOrderFilter() {
    this.api.knitworkorder_order_Fillter(this.KnitFtyFillter, this.BuyerFillter, this.OrderFillter).subscribe((res) => {
      this.KnitWorkOrderAllData = res.workorders
      this.knitKgTotal = res.knitKgTotal[0].knitKgTotal
    })
  }

  alldata() {
    this.api.KnitWorkOrderAllData().subscribe((res) => {
      this.KnitWorkOrderAllData = res.workorders
      this.knitKgTotal = res.knitKgTotal[0].knitKgTotal
    })
  }
  colorjson(data: any): any {
    return JSON.parse(data);
  }
  get items() {
    return this.KnitWorkOrderFrom.get("data") as FormArray
  }

  calculateDiff5() {
    this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const knitRate = parseFloat(row.get('knitRate')?.value);
        const knitKg = parseFloat(row.get('knitKg')?.value);
  
        const a = knitRate * knitKg
        const knitValue = parseFloat(a.toFixed(2));
  
        row.patchValue({ knitValue});
      }
    });
  }

  KnitWorkOrderAddButton() {
    const row = this.fb.group({
      "id": new FormControl(''),
      "knitWoId": new FormControl(''),
      "machDia": new FormControl(''),
      "fabDia": new FormControl(''),
      "fabType": new FormControl(''),
      "style": new FormControl(''),
      "color": new FormControl(''),
      "fabGSM": new FormControl(''),
      "KnitSl": new FormControl(''),
      "knitKg": new FormControl(''),
      "knitRate": new FormControl(''),
      "knitValue": new FormControl(''),
      "remarks": new FormControl('')
    });
    this.items.push(row);
  
    row.get('knitKg')?.valueChanges.subscribe(() => {
      this.calculateDiff5()
    });
    row.get('knitRate')?.valueChanges.subscribe(() => {
      this.calculateDiff5()
    });
  }

  fileName = "KnitWorkOrderReport.xlsx"
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

  edit(id: any) {
    this.editview = true;
    this.api.KnitWorkOrderSingleData(id).subscribe((res) => {
      this.KnitWorkOrderhederdata = res.headerData[0]
      this.KnitWorkOrderlineData1 = res.lineData

      this.KnitWorkOrderFrom.patchValue({
        "id": this.KnitWorkOrderhederdata.id,
        "buyer": this.KnitWorkOrderhederdata.buyer,
        "orderNo": this.KnitWorkOrderhederdata.orderNo,
        "knitfty": this.KnitWorkOrderhederdata.knitfty,
        "knitfty_details": this.KnitWorkOrderhederdata.knitfty_details,
        "woNo": this.KnitWorkOrderhederdata.woNo,
        "woRefNo": this.KnitWorkOrderhederdata.woRefNo,
        "woDate": this.KnitWorkOrderhederdata.woDate,
        "completedDate": this.KnitWorkOrderhederdata.completedDate,
        "notes": this.KnitWorkOrderhederdata.notes,
      })

      this.api.getorders(this.KnitWorkOrderhederdata.buyer).subscribe((res) => {
        this.order = res.orders
      })

      this.api.getstyle(this.KnitWorkOrderhederdata.buyer, this.KnitWorkOrderhederdata.orderNo).subscribe((res) => {
        this.stylelist = res.styles;
      })

      const KnitEntryData = this.KnitWorkOrderFrom.get('data') as FormArray;
      KnitEntryData.clear();

      const formControls: FormGroup[] = [];
      this.KnitWorkOrderlineData1.forEach((dataItem: any) => {
        formControls.push(
          this.fb.group({
            "id": dataItem.id,
            "knitWoId": dataItem.knitWoId,
            "machDia": dataItem.machDia,
            "fabDia": dataItem.fabDia,
            "fabType": dataItem.fabType,
            "style": dataItem.style,
            "color": dataItem.color,
            "fabGSM": dataItem.fabGSM,
            "KnitSl": dataItem.KnitSl,
            "knitKg": dataItem.knitKg,
            "knitRate": dataItem.knitRate,
            "knitValue": dataItem.knitValue,
            "remarks": dataItem.remarks
          })
        );
      }
      );
      this.KnitWorkOrderFrom.setControl('data', this.fb.array(formControls));
    })

  }

  Entry(id: any) {
    this.viewEntry = true;
    this.api.KnitWorkOrderSingleData(id).subscribe((res) => {
      this.ViewEtyKnitWorkOrderhederdata = res.headerData
      this.ViewEtyKnitWorkOrderlineData1 = res.lineData
    })
  }

  delete(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteKnitWorkOrder(id).subscribe((res) => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          this.alldata()
        })
      }
    });


  }

  update() {
    this.api.KnitWorkOrderData(this.KnitWorkOrderFrom.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

  new() {
    this.router.navigate(['/main/KnitWorkOrderCreation'])
  }

  exportToPDF() {
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

        this.download = false;
        const element = document.getElementById('print');

        html2canvas(element!).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('l', 'mm', 'a5');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('KnitWOEntry.pdf');
        });
        Swal.fire({
          title: "Good job!",
          text: "Your Download Compleated !!!",
          icon: "success"
        });
      }
    });
  }
}

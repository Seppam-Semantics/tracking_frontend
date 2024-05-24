import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-fabrics-transfer-cut-list-report',
  templateUrl: './fabrics-transfer-cut-list-report.component.html',
  styleUrls: ['./fabrics-transfer-cut-list-report.component.css']
})
export class FabricsTransferCutListReportComponent implements OnInit {

  filterDate1: string = '';
  filterDate2: string = '';
  Date: any;
  Transferno: any;
  Buyer: any;
  Buyerlist: any;
  Order: any;
  Orderlist: any;
  editscreen: boolean = false;
  FabricsTransferForm!: FormGroup
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
  fabdetailsAlldata: any;
  fabDetailspatch: any;
  BuyerFillter: any;
  OrderFillter:any;
  buyer2: any;
  order2: any;
  ngOnInit(): void {
    this.buyername()
    this.date()
  }
  constructor(private fb: FormBuilder, private router: Router, private api: ApiService , private datePipe: DatePipe) {

    this.FabricsTransferForm = new FormGroup({
      fabentry: this.fb.array([]),
    })

  }
  get items() {
    return this.FabricsTransferForm.get("fabentry") as FormArray;
  }

  FabricsTransferAddButton() {

    const row = this.fb.group({
      "woId": new FormControl(),
      "transferDate": new FormControl(),
      "finishFabKg": new FormControl(),
      "fabRolls": new FormControl(),
      "transferNo": new FormControl(),
      "size": new FormControl(),
      "color": new FormControl(),
      "style": new FormControl(),
      "orderNo": new FormControl(),
      "buyer": new FormControl()

    });
    this.items.push(row);
  }

  buyername() {
    this.api.getbuyers().subscribe((res) => {
      this.buyer2 = res.buyers
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
  getorders2() {
    this.api.getorders(this.BuyerFillter).subscribe((res) => {
      this.order2 = res.orders
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

  getWoId(size: any, index: number) {
    this.api.getwodetails(this.buyerName, this.orderNo, this.style, this.color, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      const formArray = this.FabricsTransferForm.get('fabentry') as FormArray;
      const row = formArray.at(index);
      row.get('woId')?.setValue(woId);
    });
  }

  update() {

    this.api.FabricsTransferData(this.FabricsTransferForm.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

  edit(id: any) {
    this.editscreen = true
    this.api.FabricsTransfersingleData(id).subscribe((res) => {
      this.FabricsTransferForm.patchValue({
      });


      this.fabDetailspatch = res.fabDetails[0]
      const KnitEntryData = this.FabricsTransferForm.get('fabentry') as FormArray;
      KnitEntryData.clear();

      const formControls: FormGroup[] = [];
      this.fabDetailspatch.forEach((dataItem: any) => {

        const formattedDate1 = this.datePipe.transform(
          dataItem.transfer_date,
        'mm-dd-yyy'
      );
  

        formControls.push(
          this.fb.group({
            "id": dataItem.id,
            "buyer": dataItem.buyer,
            "orderNo": dataItem.orderNo,
            "style": dataItem.style,
            "size": dataItem.size,
            "woId": dataItem.woId,
            "color": dataItem.color,
            "transferNo": dataItem.transferno,
            "transferDate": dataItem.transfer_date,
            "fabRolls": dataItem.rollNo,
            "finishFabKg": dataItem.finishKg,
          })
        );
      });

      this.FabricsTransferForm.setControl('fabentry', this.fb.array(formControls));
    })
  };

  date() { 
    this.api.FabricsTransferAllData(this.BuyerFillter , this.OrderFillter , this.filterDate1 , this.filterDate2 ).subscribe((res) => {
      this.fabdetailsAlldata = res.fabDetails[0]
    })
   }

  new() {
    this.router.navigate(['/main/FabricsTransferCuttingEntry'])
  }

  delete(id:any){
    this.api.deleteFabricsTransfer(id).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }
  fileName = "Fabrics-TransferReport.xlsx"
  exportexcel() {
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
}

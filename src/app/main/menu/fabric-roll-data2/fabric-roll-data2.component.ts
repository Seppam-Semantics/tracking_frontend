import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-fabric-roll2-data',
  templateUrl: './fabric-roll-data2.component.html',
  styleUrls: ['./fabric-roll-data2.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class FabricRollData2Component implements OnInit {
  dataSource: any[] = []
  data: any[] = [];
  fabricdetails: any
  ordernumber: any
  buyers: any;
  buyerName: any
  order: any;
  ordernumbers: any
  stylelist: any;
  styleslist: any
  colorlist: any;
  colorslist: any
  sizelist: any;
  sizeslist: any
  workorderhide: boolean = true;
  workorderId: any;
  WoNumber: any;
  fabdetails: any;
  rollnnumber: any;
  wodetails: any;
  fabid: any;
  AllWoDetails: any[] = [];
  entry1: any
  entry2: any
  entry3: any
  entry4: any
  entry5: any
  entry6: any
  entry7: any
  entry1total: any;
  entry2total: any;
  entry3total: any;
  entry4total: any;
  entry5total: any;
  entry6total: any;
  entry7total: any;
  LoadingTotal: boolean = false;
  totalcount: any;
  totalvalues: any;
  woupdateid: any;
  fabentrydata: any;
  fabentryentry: any;
  Woupdate: any;
  fabentrydata7: any;
  fabentrydata6: any;
  fabentrydata1: any;
  fabentrydata2: any;
  fabentrydata3: any;
  fabentrydata4: any;
  fabentrydata5: any;
  dataIndex: any;
  newfabEntry: any[] = []
  visible: boolean = false;
  visibleEntry: boolean = false;
  FabricBookingReport : boolean = false;
  status: any;
  woBuyervalue: any;
  woorderNovalue: any;
  data2: any[]=[];
  data3: any[]=[];
  woorderNovalue2: any;
  woBuyervalue2: any;
  headerData: any;
  headerstylevalue: any;
  headerdatavalue: any;
  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getbuyers();
    this.loadworkorder()
  }





  public getbuyers() {
    this.api.getbuyersData().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }

  getorders(buyer: any) {
    this.api.getordersData(buyer).subscribe((res) => {
      this.order = res.orders
    })
  }


  getstyle(orderNo: any) {
    this.api.getstyleData(orderNo).subscribe((res) => {
      this.stylelist = res.styles;
    })
    this.loadworkorderdetails(orderNo)
  }

  getcolor(buyer: any, orderNo: any, style: any) {
    this.api.getcolorData(buyer, orderNo, style).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  getsize(buyer: any, orderNo: any, style: any, color: any) {
    this.api.getsizeData(buyer, orderNo, style, color).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }

  loadworkorder(buyer: string = '', orderNo: string = '', style: string = '', color: string = '', size: string = '') {
    this.api.getwodetails(buyer, orderNo, style, color, size).subscribe((res) => {
      this.data = res.workorders;
    });
  }

  loadworkorderdetails(orderNo: string, style: string = '', color: string = '', size: string = '') {
    this.api.getwolinedetails(orderNo, style, color, size).subscribe((res) => {
      this.data2 = res.workorders;
      this.woBuyervalue = res.workorders[0].buyer
      this.woorderNovalue = res.workorders[0].orderNo
    });
  }

  loadworkorderdetails2(orderNo: string, style: string = '', color: string = '', size: string = '') {
    this.api.getwolinedetails(orderNo, style, color, size).subscribe((res) => {
      this.data3 = res.workorders;
      this.woBuyervalue2 = res.workorders[0].buyer
      this.woorderNovalue2 = res.workorders[0].orderNo


      const EntryData = this.buyerorderform.get('data') as FormArray;
      EntryData.clear();
      this.data3.forEach((dataItem: any) => {
        const Details = this.fb.group({
          "id": dataItem.id,
          "poid": dataItem.poid,
          "polineId": dataItem.polineId,
          "Buyer": dataItem.buyer,
          "OrderNo": dataItem.orderNo,
          "Style": dataItem.style,
          "Color": dataItem.color,
          "Size": dataItem.FSize,
          "fSize": dataItem.size,
          "SizeId": dataItem.sizeid,
          "FabType": dataItem.fabType,
          "fabricTypeId": dataItem.fabricTypeId,
          "FabDia": dataItem.fabDia,
          "FabDiaId": dataItem.fabdiaId,
          "FabGsm": dataItem.fabGsm,
          "FabGsmId": 0,
          "YarnKg": dataItem.yarnKg,
          "GreigeKg": dataItem.greigeKg,
          "YarnType": dataItem.yarnType,
          "YarnTypeId": dataItem.yarnTypeId,
          "FinishKg": dataItem.finishKg,
          "KnitSL": dataItem.knitSL,
          "SpinFty": dataItem.spinFty,
          "SpinFtyId": dataItem.spinFtyId,
          "KnitFty": dataItem.knitFty,
          "KnitFtyId": dataItem.knitFtyId,
          "DyeinFty": dataItem.dyeinFty,
          "DyeinFtyId": dataItem.dyeinFtyId,
    
          "dyetype": dataItem.dyetype,
          "dyeTypeId": dataItem.dyeTypeId,
          "OrderPcs": dataItem.orderPcs,
          "OrderFOBRate": dataItem.orderFOBRate,
          "KnitRate": dataItem.knitRate,
          "DyeRate": dataItem.dyeRate,
          
          "status": dataItem.status,
        });
        EntryData.push(Details);
      });
  



    });
  }

  woByBuyer() {
    this.getorders(this.buyerName);
    this.loadworkorder(this.buyerName);
  }
  wobyOrder() {
    this.getstyle(this.ordernumbers)
    this.loadworkorder(this.buyerName, this.ordernumbers);
  }

  woLineDetails(orderNo : any){
    this.visibleEntry = true
    this.loadworkorderdetails(JSON.stringify(orderNo))
  }

  wobystyle() {
    this.getcolor(this.buyerName, this.ordernumbers, this.styleslist)
    this.loadworkorderdetails(this.ordernumbers, this.styleslist);
  }
  wobycolor() {
    this.getsize(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist)
    this.loadworkorderdetails(this.ordernumbers, this.styleslist, this.colorslist);
  }
  wobysize() {
    this.loadworkorderdetails(this.ordernumbers, this.styleslist, this.colorslist, this.sizeslist);
  }

  clearAll() {
    this.buyerName = ''
    this.ordernumbers = ''
    this.styleslist = ''
    this.colorslist = ''
    this.sizeslist = ''
  }
  fileName2 = "Workorder-data.xlsx"
  exportexcel2() {

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

        let data2 = document.getElementById("table-data2");
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data2);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet2');
        XLSX.writeFile(wb, this.fileName2);      
        
        Swal.fire({
          title: "Good job!",
          text: "Your Download Compleated !!!",
          icon: "success"
        });
      }
    });

  }
  fileName1 = "Fabricrolldata.xlsx"
  exportexcel() {
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName1);
  }

  check(id: any) {
    this.api.getsingleFabricroll(id).subscribe((res) => {
      this.fabentrydata1 = res.entry1;
      this.fabentrydata2 = res.entry2;
      this.fabentrydata3 = res.entry3;
      this.fabentrydata4 = res.entry4;
      this.fabentrydata5 = res.entry5;
      this.fabentrydata6 = res.entry6;
      this.fabentrydata7 = res.entry7;

      const fabEntryArray = [this.fabentrydata1, this.fabentrydata2, this.fabentrydata3, this.fabentrydata4, this.fabentrydata5, this.fabentrydata6, this.fabentrydata7];

      let maxIndex = 0;
      for (let i = 1; i < fabEntryArray.length; i++) {
        if (fabEntryArray[i].length > fabEntryArray[maxIndex].length) {
          maxIndex = i;
        }
      }

      this.dataIndex = maxIndex;
      this.newfabEntry = Array.from({ length: fabEntryArray[this.dataIndex].length }, (_, i) => i + 1);
    });
  }

  getMaxIndex(): number {
    let maxLength = 0;
    let maxIndex = 0;
    for (let i = 0; i < this.fabentryentry.length; i++) {
      if (this.fabentryentry[i].length > maxLength) {
        maxLength = this.fabentryentry[i].length;
        maxIndex = i;
      }
    }
    return maxIndex;
  }

  generateArray(maxIndex: number): number[] {
    return Array.from({ length: maxIndex }, (_, index) => index + 1);
  }

  edit(orderNo: any) {
 
    this.loadworkorderdetails2(JSON.stringify(orderNo))
    this.visible = true;
  }

  Report(id:any , i:any){
    
    const a = this.data[i]
    
    this.FabricBookingReport = true
    this.api.fabbooking(a).subscribe((res)=>{
     this.headerData = res.head
     this.headerdatavalue = res.data
     console.log(res)
    
    })
  }

  parseHeaders(data: any): any[] {
    if (data) {
      try {
        const fixedHeadersData = data.headers?.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
          .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');
        const fixedPoheadData = data.pohead?.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
          .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');
  
        const parsedData1 = fixedHeadersData ? JSON.parse(fixedHeadersData) : {};
        const parsedData2 = fixedPoheadData ? JSON.parse(fixedPoheadData) : {};
  
        return parsedData1.map((item1 : any, index:any) => {
          const item2 = parsedData2[index] || {};
          return { ...item1, ...item2 };
        });
  
      } catch (error) {
        console.error('Error parsing data:', error);
        return [];
      }
    }
    return [];
  }
  parseheaders3(data: any): any {
    if (data && data.greige_fabric) {
        let fixedgreige_fabricData = data.greige_fabric.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
        .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');
      try {
        const parsedData3 = JSON.parse(fixedgreige_fabricData);
        console.log(parsedData3)
        return parsedData3;
      } catch (error) {
        console.error('Error parsing order_allocation data:', error);
        return;
      }
    }
    return;
  }

  parseheaders4(data: any): any {
    if (data && data.garment_break_down) {
        let fixedgarment_break_downData = data.garment_break_down.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
        .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');
      try {
        const parsedData4 = JSON.parse(fixedgarment_break_downData);
        return parsedData4;
      } catch (error) {
        console.error('Error parsing order_allocation data:', error);
        return;
      }
    }
    return;
  }

  parseheaders5(data: any): any {
    if (data && data.finish_fabric) {
        let fixedfinish_fabricData = data.finish_fabric.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
        .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');
      try {
        const parsedData5 = JSON.parse(fixedfinish_fabricData);
        console.log(parsedData5)
        return parsedData5;
      } catch (error) {
        console.error('Error parsing order_allocation data:', error);
        return;
      }
    }
    return;
  }



  woUpdateFrom = new FormGroup({
    id: new FormControl(),
    buyer: new FormControl(''),
    orderNo: new FormControl(''),
    style: new FormControl(''),
    color: new FormControl(''),
    size: new FormControl(''),
    fabType: new FormControl(''),
    fabDia: new FormControl(''),
    fabGsm: new FormControl(''),
    knitSL: new FormControl(''),
    yarnKg: new FormControl(''),
    greigeKg: new FormControl(''),
    yarnType: new FormControl(''),
    finishKg: new FormControl(''),
    spinFty: new FormControl(''),
    knitFty: new FormControl(''),
    dyeinFty: new FormControl(''),
    noDays: new FormControl(''),

    orderPcs: new FormControl(''),
    orderFOBRate: new FormControl(''),
    knitRate: new FormControl(''),
    dyeRate: new FormControl(''),

    gSize: new FormControl(''),

    status: new FormControl('')
  })

  buyerorderform = new FormGroup({
    data: this.fb.array([])
  })
  get items() {
    return this.buyerorderform.get("data") as FormArray;
  }
  add1button() {
    const row = this.fb.group({
      "id": new FormControl(''),
      "poid": new FormControl('', Validators.required),
      "polineId": new FormControl('', Validators.required),
      "Buyer": new FormControl(''),
      "OrderNo": new FormControl(''),
      "Style": new FormControl(''),
      "Color": new FormControl(''),
      "Size": new FormControl(''),
      "fSize": new FormControl(''),
      "SizeId": new FormControl(''),
      "FabType": new FormControl(''),
      "fabricTypeId": new FormControl(''),
      "FabDia": new FormControl(''),
      "FabDiaId": new FormControl(''),
      "FabGsm": new FormControl(''),
      "FabGsmId": new FormControl(0),
      "YarnKg": new FormControl(''),
      "GreigeKg": new FormControl(''),
      "YarnType": new FormControl(''),
      "YarnTypeId": new FormControl(''),
      "FinishKg": new FormControl(''),
      "KnitSL": new FormControl(''),
      "SpinFty": new FormControl(''),
      "SpinFtyId": new FormControl(''),
      "KnitFty": new FormControl(''),
      "KnitFtyId": new FormControl(''),
      "DyeinFty": new FormControl(''),
      "DyeinFtyId": new FormControl(''),

      "dyetype": new FormControl(''),
      "dyeTypeId": new FormControl(''),
      "OrderPcs": new FormControl(''),
      "OrderFOBRate": new FormControl(''),
      "KnitRate": new FormControl(''),
      "DyeRate": new FormControl(''),
      "status": new FormControl(''),
    });
    this.items.push(row);
  }

  woupdatesubmit() {
    this.api.postworkorder(this.buyerorderform.value.data).subscribe((res) => {
      alert(res.message)
      this.visible = false;
      this.woByBuyer()
      this.loadworkorder()
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
        
        this.api.Workorderdelect(id).subscribe((res) => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          this.loadworkorder()
        })
      }
    });
  }
  knite() {
    this.router.navigate(['/main/Knit-Report'])
  }
  Dye() {
    this.router.navigate(['/main/Dye-Report'])
  }
  yarn() {
    this.router.navigate(['/main/Yarn-Report'])
  }
  fabricEntry() {
    this.router.navigate(['/main/WorkorderData'])
  }

  FBReport() {
    this.router.navigate(['/main/FBReport'])
  }

  workorder() {
    this.router.navigate(['/main/WorkorderData'])
  }
  Upload() {
    this.router.navigate(['/main/WorkorderData'])
  }

  fabricreport(data:any){
    sessionStorage.setItem('FabricEntrybuyer' ,data.buyer)
    sessionStorage.setItem('FabricEntrystyle' ,data.style)
    sessionStorage.setItem('FabricEntrycolor' ,data.color)
    sessionStorage.setItem('FabricEntrysize' ,data.size)
    sessionStorage.setItem('FabricEntryorderNo' ,data.orderNo)

   this.router.navigate(["/main/fabricroll1"])
  }


}

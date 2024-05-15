import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'


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
  ordernumber:any
  buyers: any;
  buyerName: any
  order: any;
  ordernumbers:any
  stylelist: any;
  styleslist:any
  colorlist: any;
  colorslist:any
  sizelist: any;
  sizeslist:any
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
  LoadingTotal:boolean=false;
  totalcount: any;
  totalvalues: any;
  woupdateid:any;
  fabentrydata:any;
  fabentryentry:any;
  Woupdate:any;
  fabentrydata7: any;
  fabentrydata6: any;
  fabentrydata1: any;
  fabentrydata2: any;
  fabentrydata3: any;
  fabentrydata4: any;
  fabentrydata5: any;
  dataIndex:any;
  newfabEntry:any[] = []
  visible: boolean = false;
  status : any;
  constructor(private api: ApiService, private router : Router) { }

  ngOnInit(): void {
    this.getbuyers();
    this.loadworkorder()
}
  

  fileName = "Fabricrolldata.xlsx"
  fileName2="Workorder-data.xlsx"

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

  getstyle(buyer: any, orderNo: any) {
    this.api.getstyleData(buyer, orderNo).subscribe((res) => {
      this.stylelist = res.styles;
    })
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

  loadworkorder(buyer: string = '', orderNo: string = '', style: string ='', color: string = '', size: string ='') {
    this.api.getwodetails(buyer, orderNo, style, color, size).subscribe((res) => {
      this.data = res.workorders;
      console.log(this.data)
    
    });
  }
  
  woByBuyer(){
    this.getorders(this.buyerName);
    this.loadworkorder(this.buyerName);
  }
  wobyOrder(){
    this.getstyle(this.buyerName, this.ordernumbers)
      this.loadworkorder(this.buyerName, this.ordernumbers);
  }
  wobystyle(){
    this.getcolor(this.buyerName, this.ordernumbers, this.styleslist)
      this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist);
  }
  wobycolor(){
    this.getsize(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist)
    this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist);
  }
  wobysize(){
    this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist, this.sizeslist);
  }

  clearAll(){
    this.buyerName = ''
    this.ordernumbers = ''
    this.styleslist = ''
    this.colorslist = ''
    this.sizeslist = ''
  }

  exportexcel2() {
    let data = document.getElementById("table-data2");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName2);
  }
  
  exportexcel() {
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
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
  
      // Creating an array containing all entry arrays
      const fabEntryArray = [this.fabentrydata1, this.fabentrydata2, this.fabentrydata3, this.fabentrydata4, this.fabentrydata5, this.fabentrydata6, this.fabentrydata7];
  
      // Finding the index of the longest entry array
      let maxIndex = 0;
      for (let i = 1; i < fabEntryArray.length; i++) {
        if (fabEntryArray[i].length > fabEntryArray[maxIndex].length) {
          maxIndex = i;
        }
      }
  
      // Setting the index of the longest entry array
      this.dataIndex = maxIndex;
      console.log(this.dataIndex);
  
      // Creating an array from 1 to the length of the longest entry array
      this.newfabEntry = Array.from({length: fabEntryArray[this.dataIndex].length}, (_, i) => i + 1);
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

  edit(id: any) {
    console.log(id)
    this.visible = true;
    this.woupdateid=id
    this.api.getsinglewodetails(id).subscribe((res) => {
      this.Woupdate = res.workorder
      const value = this.Woupdate.status
      if(value == 1){
        this.status = true
      }else{
        this.status = false
      }
      this.woUpdateFrom.patchValue({
        id:this.Woupdate.id,
        buyer: this.Woupdate.buyer,
        orderNo: this.Woupdate.orderNo,
        style: this.Woupdate.style,
        color: this.Woupdate.color,
        size: this.Woupdate.size,
        fabType: this.Woupdate.fabType,
        fabDia: this.Woupdate.fabDia,
        fabGsm: this.Woupdate.fabGsm,
        knitSL: this.Woupdate.knitSL,
        yarnKg: this.Woupdate.yarnKg,
        greigeKg: this.Woupdate.greigeKg,
        yarnType: this.Woupdate.yarnType,
        finishKg: this.Woupdate.finishKg,
        spinFty: this.Woupdate.spinFty,
        knitFty: this.Woupdate.knitFty,
        dyeinFty: this.Woupdate.dyeinFty,
        noDays: this.Woupdate.noRolls,

        orderPcs: this.Woupdate.orderPcs,
        orderFOBRate: this.Woupdate.orderFOBRate,
        dyeRate: this.Woupdate.dyeRate,
        knitRate: this.Woupdate.knitRate,
      })
    })
     }


  woUpdateFrom = new FormGroup({
    id:new FormControl(),
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
    greigeKg : new FormControl(''),
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

    status:new FormControl('')
  })

woupdatesubmit(){
  this.api.postsinglewodetails(this.woUpdateFrom.value,this.woupdateid).subscribe((res) => {
    alert(res.message)
    this.visible = false;
    this.woByBuyer()
  })
}
knite(){
this.router.navigate(['/main/Knit-Report'])
}
Dye(){
  this.router.navigate(['/main/Dye-Report'])
  }
  yarn(){
    this.router.navigate(['/main/Yarn-Report'])
  }
  fabricEntry(){
    this.router.navigate(['/main/fabricroll1'])
  }
  workorder(){
    this.router.navigate(['/main/WorkorderData'])
  }
  Upload(){
    this.router.navigate(['/main/WorkorderData'])
  }
  
}

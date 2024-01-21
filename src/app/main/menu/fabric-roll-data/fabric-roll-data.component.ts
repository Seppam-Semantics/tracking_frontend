import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as xls from 'xlsx'

@Component({
  selector: 'app-fabric-roll-data',
  templateUrl: './fabric-roll-data.component.html',
  styleUrls: ['./fabric-roll-data.component.css']
})
export class FabricRollDataComponent implements OnInit {

  fabricdetails:any
  ordernumber:any;
  buyers:any;
  buyerName:any;
  order:any;
  ordernumbers:any;
  stylelist:any;
  styleslist:any;
  colorlist:any;
  colorslist:any;
  sizelist:any;
  sizeslist:any;
  workorderhide:boolean = true;
  workorderId:any;
  WoNumber:any;
  fabdetails:any;
  rollnnumber:any;

fabricrolltable:boolean=true;
workordertable:boolean=false;

fabricrolltableclick(){
  this.fabricrolltable =false;
  this.workordertable=true;
}

workordertableclick(){
  this.fabricrolltable =true;
  this.workordertable=false;
}


  constructor(private api: ApiService, 
              private http: HttpClient,
              private cdref: ChangeDetectorRef){}

  ngOnInit(): void {
        this.getbuyers();
        this.getworkorderdetails()
  }


  displayedColumns: string[] = ['RollNo', 'FabBarcode', 'FabBatchno', 'FirstrollWeightKGS', 'FirstrollWeightDATE',
    'GriegeFabKGS', 'GriegeFabDATE', 'DyeBatchingKGS', 'DyeBatchingDATE',
    'DyeFinishKGS', 'DyeFinishDATE', 'DeliverytoGarmenthKGS', 'DeliverytoGarmenthDATE', 'PlanCutPanelsKGS',
    'PlanCutPanelsDATE', 'ActualCutPanelsKGS', 'ActualCutPanelsDATE', 'PcsperBundle', 'PlannedBundles', 'ActualBundles', 'PrintStatus'
  ];

  displayedColumns2: string[] = ['Sl.no', 'buyer', 'orderNo', 'style', 'color', 'size', 'fabType',
    'fabDia', 'fabGsm', 'greigeKg', 'finishKg', 'knitSL', 'spinFty', 'knitFty', 'dyeingFty', 'yarnQty', 'noRolls', 'PrintStatus'
  ];
 
  dataSource = ELEMENT_DATA;
  dataSource2=ELEMENT_DATA;
  users: any;

  readexcelfile(e: any) {

    const file = e.target.files[0]
    let fr = new FileReader();

    fr.readAsArrayBuffer(file);

    fr.onload = () => {
      let data = fr.result;
      let workbook = xls.read(data, { type: 'array' });
      const sheetname = workbook.SheetNames[0];
      const sheet1 = workbook.Sheets[sheetname]
      this.users = xls.utils.sheet_to_json(sheet1, { raw: true });
      this.users.forEach((user:any) => {
        this.dataSource = user
      });
    };
  }

  loaddetails(){
    const id = this.workorderId
    const entry = 1
    this.api.getfabricdetails(id, entry).subscribe((res)=>{ 
      this.fabricdetails = res.fabricRolls
      this.dataSource = this.fabricdetails
    })
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  public getworkorderdetails() {
    this.api.getworkorderdetails().subscribe((res) => {
      this.ordernumber = res.workorders
    })
  }

  public getbuyers() {
    this.api.getbuyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }
  getorders(buyer: any) {
    this.api.getorders(buyer).subscribe((res) => {
      this.order = res.orders
    })
  }

  getstyle(buyer: any, order: any) {
    this.api.getstyle(buyer, order).subscribe((res) => {
      this.stylelist = res.styles;
    })
  }

  getcolor(buyer: any, order: any, style: any) {
    this.api.getcolor(buyer, order, style).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  getsize(buyer: any, order: any, style: any, color: any) {
    this.api.getsize(buyer, order, style, color).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }


  
onSelectionChange() {
      // if (this.workorderId) {
      //   this.loadworkorderdetails(this.workorderId);
      // }
      if(this.buyerName){
        this.getorders(this.buyerName)
      }
      if(this.buyerName && this.ordernumbers){
       
        this.getstyle(this.buyerName, this.ordernumbers)
      }
      if(this.buyerName && this.ordernumbers && this.styleslist){
       
        this.getcolor(this.buyerName, this.ordernumbers, this.styleslist)
      }
      if(this.buyerName && this.ordernumbers && this.styleslist && this.colorslist){
       
        this.getsize(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist)
      }
      if(this.buyerName && this.ordernumbers && this.styleslist && this.colorslist && this.sizeslist){
        this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist, this.sizeslist)
        this.workorderhide = false;
      }
  }

  // loadworkorderdetails(WOno: any){
  //   const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
  //   const headers = new HttpHeaders().set('x-access-token', proftoken);
  //   this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=${WOno}&entry=1`, { headers }).subscribe((res)=>{
  //     this.fabdetails = res.workorder
  //     this.rollnnumber = res.fabricRolls;
  //   })
  // }

loadworkorder(buyer:any, order:any, style:any, color:any, size:any){
  const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=&entry=1&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&size=${size}`, { headers }).subscribe((res)=>{
      this.fabdetails = res.workorder
      this.rollnnumber = res.fabricRolls
      this.workorderId = this.rollnnumber[0].workorderId;
      console.log(this.fabdetails)
    })
}
}



export interface PeriodicElement {

  RollNo: number;
  FabBarcode: number;
  FabBatchno: number;

  FirstrollWeightKGS: number;
  FirstrollWeightDATE: string;

  GriegeFabKGS: string;
  GriegeFabDATE: string;

  DyeBatchingKGS: string;
  DyeBatchingDATE: string;

  DyeFinishKGS: string;
  DyeFinishDATE: string;

  DeliverytoGarmenthKGS: string;
  DeliverytoGarmenthDATE: string;

  PlanCutPanelsKGS: string;
  PlanCutPanelsDATE: string;

  ActualCutPanelsKGS: string;
  ActualCutPanelsDATE: string;

  PcsperBundle: string;
  PlannedBundles: string;
  ActualBundles: string;
  PrintStatus: string;

}

const ELEMENT_DATA: PeriodicElement[] = [];
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'


@Component({
  selector: 'app-fabric-roll-data',
  templateUrl: './fabric-roll-data.component.html',
  styleUrls: ['./fabric-roll-data.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class FabricRollDataComponent implements OnInit {
  dataSource: any[] = []
  data: any[] = [];
  fabricdetails: any
  ordernumber:any
  buyers: any;
  buyerName: any = null
  order: any;
  ordernumbers:any = null
  stylelist: any;
  styleslist:any = null
  colorlist: any;
  colorslist:any = null
  sizelist: any;
  sizeslist:any = null
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
  Woupdate:any;

  constructor(private api: ApiService,
    private http: HttpClient,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getbuyers();
  }

  fileName = "Fabricrolldata.xlsx"
  fileName2="Workorder-data.xlsx"

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

  getstyle(buyer: any, orderNo: any) {
    this.api.getstyle(buyer, orderNo).subscribe((res) => {
      this.stylelist = res.styles;
    })
  }

  getcolor(buyer: any, orderNo: any, style: any) {
    this.api.getcolor(buyer, orderNo, style).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  getsize(buyer: any, orderNo: any, style: any, color: any) {
    this.api.getsize(buyer, orderNo, style, color).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }

  loadworkorder(buyer: any, orderNo?: string, style?: string, color?: string, size?: any) {
    this.LoadingTotal = true
    this.spinner.show()
    const proftoken = 'Bearer ' + sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    let url = `${this.api.apiUrl}/workorderapi/workorders-filter?buyer=${buyer}`;
    if (orderNo) url += `&orderNo=${orderNo}`;
    if (style) url += `&style=${style}`;
    if (color) url += `&color=${color}`;
    if (size) url += `&size=${size}`;

    this.http.get<any>(url, { headers }).subscribe((res) => {
      this.data = res.workorders;
      this.totalcount = res.tota_count
      this.totalvalues = res.total_value
      setTimeout(() => {
        this.spinner.hide()
        this.LoadingTotal = false
      }, 2000)
    });
  }

  clear(){
    this.buyerName = null
    this.ordernumbers = null
    this.styleslist = null
    this.colorslist = null
    this.styleslist = null
  }
  onSelectionChange() {
    if (this.buyerName) {
      this.getorders(this.buyerName);
      this.loadworkorder(this.buyerName);
    }
    if (this.buyerName && this.ordernumbers) {
      this.getstyle(this.buyerName, this.ordernumbers)
      this.loadworkorder(this.buyerName, this.ordernumbers);
    }
    if (this.buyerName && this.ordernumbers && this.styleslist) {
      this.getcolor(this.buyerName, this.ordernumbers, this.styleslist)
      this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist);
    }
    if (this.buyerName && this.ordernumbers && this.styleslist && this.colorslist) {
      this.getsize(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist)
      this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist);
    }
    if (this.buyerName && this.ordernumbers && this.styleslist && this.colorslist && this.sizeslist) {
      this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist,this.sizeslist);
    }
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
    const entry = 1
    this.api.getfabricdetails(id, entry).subscribe((res) => {
      this.fabentrydata = res.fabricRolls
    })
  
  }



  edit(id: any) {
    const entry = 1
    this.woupdateid=id
    this.api.getsinglewodetails(id).subscribe((res) => {
      this.Woupdate = res.workorder
      console.log(this.Woupdate)
      this.woUpdateFrom.patchValue({
        buyer: this.Woupdate.buyer,
        orderNo: this.Woupdate.orderNo,
        style: this.Woupdate.style,
        color: this.Woupdate.color,
        size: this.Woupdate.size,
        fabType: this.Woupdate.fabType,
        fabDia: this.Woupdate.fabDia,
        fabGSM: this.Woupdate.fabGsm,
        knitSL: this.Woupdate.knitSL,
        yarnLot: this.Woupdate.yarnLot,
        yarnType: this.Woupdate.yarnType,
        yarnCount: this.Woupdate.yarnCount,
        spinFty: this.Woupdate.spinFty,
        knitFty: this.Woupdate.knitFty,
        dyeinFty: this.Woupdate.dyeinFty,
        noRolls: this.Woupdate.noRolls
      })
    })
     }


  woUpdateFrom = new FormGroup({
    buyer: new FormControl(''),
    orderNo: new FormControl(''),
    style: new FormControl(''),
    color: new FormControl(''),
    size: new FormControl(''),
    fabType: new FormControl(''),
    fabDia: new FormControl(''),
    fabGSM: new FormControl(''),
    knitSL: new FormControl(''),
    yarnLot: new FormControl(''),
    yarnType: new FormControl(''),
    yarnCount: new FormControl(''),
    spinFty: new FormControl(''),
    knitFty: new FormControl(''),
    dyeinFty: new FormControl(''),
    noRolls: new FormControl('')
  })

woupdatesubmit(){
  const entry = 1
  console.log(this.woUpdateFrom.value)
  this.api.postsinglewodetails(this.woUpdateFrom.value,this.woupdateid).subscribe((res) => {
    alert(res.message)
    this.onSelectionChange()
  })
}


}




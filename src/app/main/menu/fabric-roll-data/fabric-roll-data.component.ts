import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as xls from 'xlsx'


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
  dataSource:any[]=[]
  data:any[]=[];
  fabricdetails: any
  ordernumber: any;
  buyers: any;
  buyerName: any;
  order: any;
  ordernumbers: any;
  stylelist: any;
  styleslist: any;
  colorlist: any;
  colorslist: any;
  sizelist: any;
  sizeslist: any;
  workorderhide: boolean = true;
  workorderId: any;
  WoNumber: any;
  fabdetails: any;
  rollnnumber: any;
  wodetails: any;
  fabid:any;

  constructor(private api: ApiService,
    private http: HttpClient,
    private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getbuyers();
  }


check(id:any){

  const entry = 1
    this.api.getfabricdetails(id, entry).subscribe((res) => {
      this.dataSource = res.fabricRolls
       console.log(this.dataSource)
    })


} 

  loaddetails(id: any, element: any) {
    const entry = 1
    this.api.getfabricdetails(id, entry).subscribe((res) => {
      this.dataSource = res.fabricRolls
    })
    // setTimeout(() => {
    //   this.expandedElement = this.expandedElement === element ? null : element
    // }, 3000)

  }

  // ngAfterContentChecked() {
  //   this.cdref.detectChanges();
  // }


  public getbuyers() {
    this.api.getbuyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }


  getorders(buyer: any) {
    this.api.getorders(buyer).subscribe((res) => {
      this.order = res.orders
    })
    const proftoken = 'Bearer ' + sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/workorderapi/workorders-filter?buyer=${buyer}`, { headers }).subscribe((res) => {
      this.data = res.workorders
    })
  }

  getstyle(buyer: any, orderNo: any) {
    this.api.getstyle(buyer, orderNo).subscribe((res) => {
      this.stylelist = res.styles;
    })
    const proftoken = 'Bearer ' + sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/workorderapi/workorders-filter?buyer=${buyer}&orderNo=${orderNo}`, { headers }).subscribe((res) => {
      this.data = res.workorders
    })
  }

  getcolor(buyer: any, orderNo: any, style: any) {
    this.api.getcolor(buyer, orderNo, style).subscribe((res) => {
      this.colorlist = res.colors;
    })
    const proftoken = 'Bearer ' + sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/workorderapi/workorders-filter?buyer=${buyer}&&orderNo=${orderNo}&&style=${style}`, { headers }).subscribe((res) => {
      this.data = res.workorders
    })
  }

  getsize(buyer: any, orderNo: any, style: any, color: any) {
    this.api.getsize(buyer, orderNo, style, color).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }



  onSelectionChange() {
    if (this.buyerName) {
      this.getorders(this.buyerName);
    }
    if (this.buyerName && this.ordernumbers) {
      this.getstyle(this.buyerName, this.ordernumbers)
    }
    if (this.buyerName && this.ordernumbers && this.styleslist) {
      this.getcolor(this.buyerName, this.ordernumbers, this.styleslist)
    }
    if (this.buyerName && this.ordernumbers && this.styleslist && this.colorslist) {
      this.getsize(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist)
      this.api.getwodetails(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist)
    }
    if (this.buyerName && this.ordernumbers && this.styleslist && this.colorslist && this.sizeslist) {
      this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist, this.sizeslist)
    }
  }


  loadworkorder(buyer: any, orderNo: any, style: any, color: any, size: any) {
    const proftoken = 'Bearer ' + sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/workorderapi/workorders-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}`, { headers }).subscribe((res) => {
      this.data = res.workorders
    })
  }
}




import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';
import { ApiService } from 'src/app/api.service';
import * as xls from 'xlsx'

@Component({
  selector: 'app-workorder-data',
  templateUrl: './workorder-data.component.html',
  styleUrls: ['./workorder-data.component.css']
})
export class WorkorderDataComponent {

  orderNo: any;
  id?: string;

  constructor(private api: ApiService) {

  }

  displayedColumns: string[] = ['WOno', 'WOLineno', 'buyer', 'orderNo', 'style', 'color', 'size', 'fabType',
    'fabDia', 'fabGsm', 'yarnType', 'yarnCount', 'knitSL', 'spinFty', 'knitFty', 'dyeingFty', 'yarnLot', 'noRolls', 'PrintStatus'
  ];


  workorder = new FormGroup({
    WOno: new FormControl(''),
    WOLineno: new FormControl(''),
    Order: new FormControl(''),
    Style: new FormControl(''),
    Color: new FormControl(''),
    Size: new FormControl(''),
    FabType: new FormControl(''),
    FabDia: new FormControl(''),
    FabGSM: new FormControl(''),
    Yarntype: new FormControl(''),
    YarnCount: new FormControl(''),
    KnitSL: new FormControl(''),
    SpinFty: new FormControl(''),
    KnitFty: new FormControl(''),
    DyeingFty: new FormControl(''),
    YarnLot: new FormControl(''),
    NoofRolls: new FormControl(''),
    PrintStatus: new FormControl(''),
  })


  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>([])
  users: any;
  file: any;

  readfile(e: any) {
    this.file = e.target.files[0]
  }
  workordersubmit() {
    const proftoken = 'Bearer ' + sessionStorage.getItem('token')
    this.api.postworkorder(this.dataSource, proftoken).subscribe((res)=>{
      console.log(res)
    })
    window.location.reload();
    console.log(this.dataSource)

  }

  readexcelfile() {
    let fr = new FileReader();

    fr.readAsArrayBuffer(this.file);

    fr.onload = () => {
      let data = fr.result;
      let workbook = xls.read(data, { type: 'array' });

      const sheetname = workbook.SheetNames[0];
      const sheet1 = workbook.Sheets[sheetname];

      this.users = xls.utils.sheet_to_json(sheet1, { raw: true });

      this.users.sort((a: any, b: any) => {
        const orderNumberA = a.orderNo.toUpperCase();
        const orderNumberB = b.orderNo.toUpperCase();

        if (orderNumberA < orderNumberB) {
          return -1;
        }
        if (orderNumberA > orderNumberB) {
          return 1;
        }
        return 0;
      });

      this.dataSource = this.users;

      this.assignUniqueIDs()
      this.uniqueid()
    };
  }



  assignUniqueIDs(): void {

    const uniqueOrderNumbers = [...new Set(this.users.map((order: any) => order.orderNo.toUpperCase()))];

    uniqueOrderNumbers.forEach(orderNumber => {
    const ordersWithSameNumber = this.users.filter((wr: { orderNo: any; }) => wr.orderNo.toUpperCase() == orderNumber);
    ordersWithSameNumber.forEach((wo: any, index: any) => {
        wo.WOLineno = `${index + 1}`;
      });
    });
  }
  
  uniqueid(){
    const uniqueWorkOrderNumbers = Array.from(new Set(this.users.map((order:any) => order.orderNo.toUpperCase())));

    uniqueWorkOrderNumbers.sort();

    const workOrderNumberToIndex: { [key: string]: number } = {};
    uniqueWorkOrderNumbers.forEach((workOrderNumber:any, index:any) => {
      workOrderNumberToIndex[workOrderNumber] = index + 1;
    });

    this.users.forEach((order:any) => {
      order.WOno = workOrderNumberToIndex[order.orderNo.toUpperCase()].toString().padStart(3, '0');

      console.log(order.WOno);
    });
  }

}



export interface PeriodicElement {

  WOno: any;
  WOLineno: any;
  Order: any;
  Style: any;
  Color: any;
  Size: any;
  FabType: any;
  FabDia: any;
  FabGSM: any;
  Yarntype: any;
  YarnCount: any;
  KnitSL: any;
  SpinFty: any;
  KnitFty: any;
  DyeingFty: any;
  YarnLot: any;
  NoofRolls: any;
  PrintStatus: any;
}

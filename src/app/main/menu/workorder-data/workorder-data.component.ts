import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';
import * as xls from 'xlsx'

@Component({
  selector: 'app-workorder-data',
  templateUrl: './workorder-data.component.html',
  styleUrls: ['./workorder-data.component.css']
})
export class WorkorderDataComponent {

  displayedColumns : string[] = [  'WOno', 'WOLineno', 'Order', 'Style', 'Color', 'Size', 'FabType',
    'FabDia','FabGSM','Yarntype','YarnCount','KnitSL','SpinFty','KnitFty','DyeingFty','YarnLot','NoofRolls','PrintStatus' 
  ];

  dataSource: MatTableDataSource<PeriodicElement>=new MatTableDataSource<PeriodicElement>([])
  users: any;

  readexcelfile(e:any){

    const file= e.target.files[0]
    let fr = new FileReader();

    fr.readAsArrayBuffer(file);

    fr.onload= ()=>{
      
      let data = fr.result;
          let workbook = xls.read(data,{type:'array'});

            const sheetname = workbook.SheetNames[0];

            const sheet1 = workbook.Sheets[sheetname]

            this.users=xls.utils.sheet_to_json(sheet1,{raw:true});
          

            this.users.forEach((user: any) => {
              this.dataSource=this.users
              console.log(this.dataSource)
              
            });
          };

        }
  }



export interface PeriodicElement {

  WOno: any;
  WOLineno: any;
  Order:  any;
  Style : any;
  Color :any;
  Size:any;
  FabType:any;
  FabDia:any;
  FabGSM:any;
  Yarntype:any;
  YarnCount:any;
  KnitSL:any;
  SpinFty:any;
  KnitFty:any;
  DyeingFty:any;
  YarnLot:any;
  NoofRolls:any;
  PrintStatus:any;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     WOno: 1,
//     WOLineno: 1,
//     Order: 'xxx',
//     Style: 'zzz',
//     Color: 'ccc',
//     Size: 12,
//     FabType: 'vvv',
//     FabDia: 'bbb',
//     FabGSM: 'nnnn',
//     Yarntype: 'mmmm',
//     YarnCount: 'lll',
//     KnitSL: 'kkk',
//     SpinFty: 'jjj',
//     KnitFty: 'hhh',
//     DyeingFty: 'ggg',
//     YarnLot: 'fff',
//     NoofRolls: 'ddd',
//     PrintStatus: 'sss',
//   }

// ];

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as xls from 'xlsx'

@Component({
  selector: 'app-fabric-roll-data',
  templateUrl: './fabric-roll-data.component.html',
  styleUrls: ['./fabric-roll-data.component.css']
})
export class FabricRollDataComponent implements OnInit {


  constructor(private api:ApiService){}
  ngOnInit(): void {
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')
    this.api.getfabricdetails(proftoken).subscribe((res)=>{ 
      console.log(res);
    })
  }

  displayedColumns: string[] = ['WONo', 'WOLineno', 'RollNo', 'FabBarcode', 'FabBatchno', 'FirstrollWeightKGS', 'FirstrollWeightDATE',
    'GriegeFabKGS', 'GriegeFabDATE', 'DyeBatchingKGS', 'DyeBatchingDATE',
    'DyeFinishKGS', 'DyeFinishDATE', 'DeliverytoGarmenthKGS', 'DeliverytoGarmenthDATE', 'PlanCutPanelsKGS',
    'PlanCutPanelsDATE', 'ActualCutPanelsKGS', 'ActualCutPanelsDATE', 'PcsperBundle', 'PlannedBundles', 'ActualBundles', 'PrintStatus'
  ];

  dataSource = ELEMENT_DATA;
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
      this.users.forEach((user: any) => {
        this.dataSource = this.users
        console.log(this.dataSource)
      });
    };
  }
}



export interface PeriodicElement {

  WONo: number;
  WOLineno: number;
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

const ELEMENT_DATA: PeriodicElement[] = [

  {

    WONo: 1,
    WOLineno: 1,
    RollNo: 2,
    FabBarcode: 3,
    FabBatchno: 4,

    FirstrollWeightKGS: 5,
    FirstrollWeightDATE: '28/01/2000',

    GriegeFabKGS: '5',
    GriegeFabDATE: '22/02/2000',

    DyeBatchingKGS: '7',
    DyeBatchingDATE: '28/01/2000',

    DyeFinishKGS: '23',
    DyeFinishDATE: '28/01/2000',

    DeliverytoGarmenthKGS: '45',
    DeliverytoGarmenthDATE: '28/01/2000',

    PlanCutPanelsKGS: '23',
    PlanCutPanelsDATE: '28/01/2000',

    ActualCutPanelsKGS: '34',
    ActualCutPanelsDATE: '28/01/2000',


    PcsperBundle: 'rrr',
    PlannedBundles: 'ttt',
    ActualBundles: 'yyy',
    PrintStatus: 'uuu',
  }

];
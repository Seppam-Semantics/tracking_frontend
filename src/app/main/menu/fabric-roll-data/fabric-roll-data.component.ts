import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import * as xls from 'xlsx'

@Component({
  selector: 'app-fabric-roll-data',
  templateUrl: './fabric-roll-data.component.html',
  styleUrls: ['./fabric-roll-data.component.css']
})
export class FabricRollDataComponent implements OnInit {

  fabricdetails:any
  ordernumber:any

  fabricfrom =  new FormGroup({
  'WOno': new FormControl(Validators.required),
  'WOLineno': new FormControl('0')
})

  constructor(private api:ApiService){}

  ngOnInit(): void {
this.getworkorderdetails()
  }

  public getworkorderdetails() {
    this.api.getworkorderdetails().subscribe((res) => {
      this.ordernumber = res.workorders
    })
  }

  displayedColumns: string[] = ['WONo', 'RollNo', 'FabBarcode', 'FabBatchno', 'FirstrollWeightKGS', 'FirstrollWeightDATE',
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
      this.users.forEach((user:any) => {
        this.dataSource = user
      });
    };
  }

  loaddetails(){
    const id = this.fabricfrom.get('WOno')?.value;
    const entry = this.fabricfrom.get('WOLineno')?.value;
    this.api.getfabricdetails(id, entry).subscribe((res)=>{ 
      this.fabricdetails = res.fabricRolls
      this.dataSource = this.fabricdetails
    })
  }


}



export interface PeriodicElement {

  WONo: number;
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
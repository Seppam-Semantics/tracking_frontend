import { Component } from '@angular/core';
import * as xls from 'xlsx'

@Component({
  selector: 'app-garment-bundles',
  templateUrl: './garment-bundles.component.html',
  styleUrls: ['./garment-bundles.component.css']
})
export class GarmentBundlesComponent {

  displayedColumns: string[] = ['WONo','WOLineno','FabBatchno','FabBarcode','RollNo','BundleBarcode','BundleNo',
    'BundleRange','ActualCutPanelsPCS','ActualCutPanelsDATE','InputtosewPCS','InputtosewDATE','SewOutputPCS','SewOutputDATE',
    'PackPCS','PackDATE','ReasonInputSew','ReasonSewPack'
  ];
  dataSource = ELEMENT_DATA;
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

  WONo: any;
  WOLineno: any;
  FabBatchno: any;
  FabBarcode: any;
  RollNo: any;
  BundleBarcode: any;
  BundleNo: any;
  BundleRange: any;
  ActualCutPanelsPCS: any;
  ActualCutPanelsDATE: any;
  InputtosewPCS: any;
  InputtosewDATE: any;
  SewOutputPCS: any
  SewOutputDATE: any;
  PackPCS: any;
  PackDATE: any;
  ReasonInputSew: any;
  ReasonSewPack: any;

}

const ELEMENT_DATA: PeriodicElement[] = [

  {

    WONo: 1,
    WOLineno: 2,
    FabBatchno: 3,
    FabBarcode: 4,
    RollNo: 5,
    BundleBarcode: 6,
    BundleNo: 7,
    BundleRange: 8,

    ActualCutPanelsPCS: 21,
    ActualCutPanelsDATE: 23,

    InputtosewPCS: 21,
    InputtosewDATE: 34,

    SewOutputPCS: 44,
    SewOutputDATE: 45,

    PackPCS: 12,
    PackDATE: 21,

    ReasonInputSew: 'ok',
    ReasonSewPack: 'not ok'
  }

];

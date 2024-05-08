import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-yarn-report',
  templateUrl: './yarn-report.component.html',
  styleUrls: ['./yarn-report.component.css']
})
export class YarnReportComponent implements OnInit {
  AllData: any;
  total1: any;
  allYarn: any
  yarnSpinnerDropdown: any;
  yarnData: any;
  yarnType: any;
  yarn_Id: any;
  spinftyYarnType: any;
  yarnTypeOrder: any;
  yarnorder_Id: any;
  spinftyOrder: any;
  spinftyReceipt: any
  orderNo: any;
  spinfty: any;
  spinfactory:any
  spinLcNo: any;
  spinStatus:any
  spinftyreceipt: any;
  yarnTypereceipt: any;
  yarnreceipt_Id: any;
  spinLotliNo: any;
  spinreceiptLno: any;
  spinorderliNo: any;
  spinnerLotlcNo: any;
  spinnerorderlcNo: any;
  orderTotal: any;
  buyerName: any;
  buyers: any;
  spinnerreceiptlcNo: any;
  yarn: any;
  yarnLcLines: any;
  yarnLcTotal: any;
  yarnLotCheck: any;
  yarnOrderAllocations: any;
  yarnQualityCheck: any;
  yarnReceiptsLines: any;
  yarnLineId: any;
  style: any;
  yarnOrderId: any;
  yarnreceiptId: any;
  indexvalue: any;
  QCindexvalue: any;
  spinDDLcNo: any;
  someStatus: any;
  ViewAllYarnData : boolean = false;
  LcClosure: any;
  YarnData: any;
  LcClosureData: any[] = [];
  yarnLcClosure: any;
  yarn_lc_linesLcClosure: any;
  yarn_lot_checkLcClosure: any;


  constructor(private router : Router, private api:ApiService , private fb : FormBuilder) { }

  


  

  ngOnInit(): void {
    this.api.getAllYarn().subscribe((res) => {
      this.AllData = res.yarn
    })

    this.api.yarnSpinner().subscribe((res) => {
      this.spinfty = res.spinners
    })
    
    this.api.yarnStatus().subscribe((res)=>{
      this.someStatus = res.status
    })
  }
  
  yarnlcNo(){
    this.api.yarnLcNo(this.spinfactory).subscribe((res:any)=>{
      this.spinDDLcNo = res.lcNo
    })
    this.api.yarnFilter(this.spinfactory).subscribe((res)=>{
      this.AllData = res.knit
    })
  }

  yarnStatus(){
    if(this.spinfactory && this.spinLcNo){
      this.api.yarnSomeStatus(this.spinfactory, this.spinLcNo).subscribe((res)=>{
        this.someStatus = res.status
      })
    }
    this.api.yarnFilter(this.spinfactory, this.spinLcNo).subscribe((res)=>{
      this.AllData = res.knit
    })
  }

  yarnDatawithStatus(){
    if(this.spinfactory && this.spinLcNo){
      this.api.yarnFilter(this.spinfactory, this.spinLcNo, '', this.spinStatus).subscribe((res)=>{
        this.AllData = res.knit
      })
    }
    else{
      this.api.yarnFilter('','','',this.spinStatus).subscribe((res)=>{
        this.AllData = res.knit
      })
    }
  }

  fileName = "YarnReport.xlsx"
exportexcel() {
  let data = document.getElementById("table-data");
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, this.fileName);
}

  yarnHead(){
    this.router.navigate(['/main/yarn-header'])
  }

  outstanding(){
    this.router.navigate(['/main/lc-outstanding'])
  }

  EditAllData(id:any){
    sessionStorage.setItem('singleData', id)
    this.router.navigate(['/main/yarn-transcation'])
  }

  view(id:any){
    this.ViewAllYarnData = true
    this.LcClosure = id
    // this.api.getSingleLcClosure(id).subscribe((res)=>{
    //   this.yarnLcClosure = res.yarn
    //   this.yarn_lc_linesLcClosure = res.yarn_lc_lines
    //   console.log(res)
    // })
  }

  delete(id: any) {
    let text = "Press Ok to delete the details";
    if (confirm(text) == true) {
      this.api.deleteYarn(id).subscribe(
        (res) => {
          alert(res.message);
          window.location.reload();
        }
      )
    } else {
      alert("Cancelled");
    }
  }
}

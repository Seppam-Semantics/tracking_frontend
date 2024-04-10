import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

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

  constructor(private router : Router, private api:ApiService) { }


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



  yarnHead(){
    this.router.navigate(['/main/yarn-header'])
  }


  EditAllData(id:any){
    sessionStorage.setItem('singleData', id)
    this.router.navigate(['/main/yarn-transcation'])
  }

  delete(id: any) {
    let text = "Press a button!\nEither OK or Cancel.";
    if (confirm(text) == true) {
      this.api.deleteYarn(id).subscribe(
        (res) => {
          alert(res.message);
          window.location.reload();
        },
        (error) => {
          alert("An error occurred while deleting the yarn: " + error.message);
        }
      );
    } else {
      alert("Cancelled");
    }
  }
  
}

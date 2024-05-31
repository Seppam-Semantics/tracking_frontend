import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  spinfactory: any
  spinLcNo: any;
  spinStatus: any
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
  ViewAllYarnData: boolean = false;
  LcClosure: any;
  YarnData: any;
  LcClosureData: any[] = [];
  yarnLcClosure: any;
  yarn_lc_linesLcClosure: any;
  yarn_lot_checkLcClosure: any;
  yarndetails: any;
  yarn_lc_lines_Details: any;
  lot_check_Details: any;
  lot_check_Details_1: any;
  lot_check_Details_2: any;
  Receipt_Details: any;
  @Input() data: any;
  parsedData: any;
  parsedData1: any;
  parsedData2: any;
  download:boolean = true;

  constructor(private router: Router, private api: ApiService, private fb: FormBuilder) { }






  ngOnInit(): void {

    this.api.getAllYarn().subscribe((res) => {
      this.AllData = res.yarn
    })

    this.api.yarnSpinner().subscribe((res) => {
      this.spinfty = res.spinners
    })

    this.api.yarnStatus().subscribe((res) => {
      this.someStatus = res.status
    })
  }

  yarnlcNo() {
    this.api.yarnLcNo(this.spinfactory).subscribe((res: any) => {
      this.spinDDLcNo = res.lcNo
    })
    this.api.yarnFilter(this.spinfactory).subscribe((res) => {
      this.AllData = res.knit
    })
  }

  yarnStatus() {
    if (this.spinfactory && this.spinLcNo) {
      this.api.yarnSomeStatus(this.spinfactory, this.spinLcNo).subscribe((res) => {
        this.someStatus = res.status
      })
    }
    this.api.yarnFilter(this.spinfactory, this.spinLcNo).subscribe((res) => {
      this.AllData = res.knit
    })
  }

  yarnDatawithStatus() {
    if (this.spinfactory && this.spinLcNo) {
      this.api.yarnFilter(this.spinfactory, this.spinLcNo, '', this.spinStatus).subscribe((res) => {
        this.AllData = res.knit
      })
    }
    else {
      this.api.yarnFilter('', '', '', this.spinStatus).subscribe((res) => {
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




  yarnHead() {
    this.router.navigate(['/main/yarn-header'])
  }

  outstanding() {
    this.router.navigate(['/main/lc-outstanding'])
  }

  reconciliation() {
    this.router.navigate(['/main/yarn-reconciliation'])
  }

  EditAllData(id: any) {
    sessionStorage.setItem('singleData', id)
    this.router.navigate(['/main/yarn-transcation'])
  }

  view(id: any) {
    this.ViewAllYarnData = true
    this.api.getSingleLcClosure(id).subscribe((res) => {
      this.yarndetails = res.yarn;
      this.yarn_lc_lines_Details = res.yarn_lc_lines;
    });
  }

  parseLotcheck(data: any): any {
    if (data && data.lotcheck) {
      let fixedlotcheckData = data.lotcheck.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
        .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');
      try {
        const parsedData = JSON.parse(fixedlotcheckData);
        return parsedData;
      } catch (error) {
        console.error('Error parsing order_allocation data:', error);
        return;
      }
    }
    return;
  }

  parseOrderall(data: any): any {
    if (data && data.order_allocation) {
      const fixedOrderAllocationData = data.order_allocation.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":').replace(
        /:\s*([^,\}\[]+)\s*(?=[,\}])/g,
        ': "$1"'
      );
      try {
        this.parsedData = JSON.parse(fixedOrderAllocationData);
        return this.parsedData;
      } catch (error) {
        console.error('Error parsing order_allocation data:', error);
        return;
      }
    }
    return;
  }
  parseRec(OrderAllData: any): any {
    const fixedOrderAllocationData = OrderAllData.receipt
    try {
      this.parsedData1 = fixedOrderAllocationData;
      return this.parsedData1;
    } catch (error) {
      console.error('Error parsing order_allocation data:', error);
    }
  }


  parseQty(OrderAllData: any): any {
    const fixedQTYData = OrderAllData.receipt.quality
    try {
      this.parsedData2 = fixedQTYData;
      return this.parsedData2;
    } catch (error) {
      console.error('Error parsing order_allocation data:', error);
    }
  }



  exportToPDF() { 
    this.download = false ;
    const element = document.getElementById('print');

    html2canvas(element!).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a5');

      // For full page capture, set proper width and height
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('LC-Closure-Report.pdf');
  
    });
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

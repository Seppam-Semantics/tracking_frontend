import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-lc-outstanding',
  templateUrl: './lc-outstanding.component.html',
  styleUrls: ['./lc-outstanding.component.css']
})
export class LCOutstandingComponent implements OnInit{
  LCOutstandingData: any;
  filterDate: string = '';
  lcnolist:any
  lcnoNumber:any
  Statuslist: any;
  yarnStatusvalue:any
  buyerlist: any;
  buyervalue:any
  ReceiptvalueTotal: any;
  PendingLCValueTotal: any;
  spinfty: any;
  ReceiptKgsValueTotal: any;
  PendingReceiptKgsValueTotal: any;

  constructor(private api : ApiService){}
  
  ngOnInit(): void { 
    this.lcnoFilter()
  
    this.api.lcNoListData().subscribe((res)=>{
      this.lcnolist = res.lcNo
    })

        this.api.yarnSpinner().subscribe((res) => {
      this.spinfty = res.spinners
    })

    this.api.StatusListData().subscribe((res)=>{
      this.Statuslist = res.yarnStatus
    })

    this.api.BuyerListData().subscribe((res)=>{
      this.buyerlist = res.buyer
    })

    this.api.LCOutstandingTotalData().subscribe((res)=>{
      this.ReceiptvalueTotal = res.LCOutstandingTotal[0].Receiptvalue
      this.PendingLCValueTotal = res.LCOutstandingTotal[0].PendingLCValue
      this.PendingReceiptKgsValueTotal = res.LCOutstandingTotal[0].PendingReceiptKgs
      this.ReceiptKgsValueTotal = res.LCOutstandingTotal[0].ReceiptKgs
    })
  }

lcnoFilter(){
  this.api.LCOutstandingData(this.lcnoNumber).subscribe((res)=>{
    this.LCOutstandingData = res.LCOutstanding

  })  

  this.api.LCOutstandingTotalData(this.lcnoNumber).subscribe((res)=>{
    this.ReceiptvalueTotal = res.LCOutstandingTotal[0].Receiptvalue
    this.PendingLCValueTotal = res.LCOutstandingTotal[0].PendingLCValue
    this.PendingReceiptKgsValueTotal = res.LCOutstandingTotal[0].PendingReceiptKgs
    this.ReceiptKgsValueTotal = res.LCOutstandingTotal[0].ReceiptKgs
  })
}
statusFilter(){
  this.api.LCOutstandingData('',this.yarnStatusvalue).subscribe((res)=>{
    this.LCOutstandingData = res.LCOutstanding
  })  

  this.api.LCOutstandingTotalData('',this.yarnStatusvalue).subscribe((res)=>{
    this.ReceiptvalueTotal = res.LCOutstandingTotal[0].Receiptvalue
    this.PendingLCValueTotal = res.LCOutstandingTotal[0].PendingLCValue
    this.PendingReceiptKgsValueTotal = res.LCOutstandingTotal[0].PendingReceiptKgs
    this.ReceiptKgsValueTotal = res.LCOutstandingTotal[0].ReceiptKgs
  })
}

BuyerFilter(){

  this.api.LCOutstandingData('','',this.buyervalue).subscribe((res)=>{
    this.LCOutstandingData = res.LCOutstanding
  })  

  this.api.LCOutstandingTotalData('','' ,this.buyervalue).subscribe((res)=>{
    this.ReceiptvalueTotal = res.LCOutstandingTotal[0].Receiptvalue
    this.PendingLCValueTotal = res.LCOutstandingTotal[0].PendingLCValue
    this.PendingReceiptKgsValueTotal = res.LCOutstandingTotal[0].PendingReceiptKgs
    this.ReceiptKgsValueTotal = res.LCOutstandingTotal[0].ReceiptKgs
  })

}

  fileName = "LCoutStandingReport.xlsx"
exportexcel() {

  Swal.fire({
    title: "Are you sure?",
    text: "You Want To Download Report!!!",
    icon: "warning",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Download Pdf",
    denyButtonText: `Download Excel`
  }).then((result) => {

    if (result.isConfirmed) {
      
      const doc = new jsPDF({
        orientation: 'landscape'
     });
     const options = {
       styles: {
         fontSize: 6,
       },
       margin: { top: 1 ,left : 1},
       tableWidth: 'auto'
     };
 
     const data = this.LCOutstandingData.map((row:any) => [
      row.lcNo , 
      row.lcDate , 
      row.pi , 
      row.piDate , 
      row.yarnType , 
      row.lcYarnKgs,
      row.yarnRate,
      row.yarnValue ,
      row.allocatedYarnKgs ,
      (row.lcYarnKgs - row.allocatedYarnKgs).toFixed(2) ,
      row.receiptYarnKgs ,
      (row.lcYarnKgs - row.receiptYarnKgs).toFixed(2),
      (row.yarnRate * row.receiptYarnKgs).toFixed(2),
      (row.yarnValue - (row.yarnRate * row.receiptYarnKgs)).toFixed(2) ,
      row.Status
     ]);
     (doc as any).autoTable({
       head: [[

            "LC no",
                "LC Date",
                
                "PI",
                "PI date",
                "Yarn Type",
                
                "Yarn Qty",
                "Yarn Rate",
                "Yarn Value",
                
                "Allocated Kgs",
                "Pending allocated Kgs",
                "Receipt Kgs",
                

                "Pending Receipt Kgs",
                "Receipt value"+"=" +"["+[this.ReceiptvalueTotal]+"]",
                "Pending LC Value"+ "=" +"["+[this.PendingLCValueTotal]+"]",
                "Status"

       ]],
       body: data , 
       ...options ,
         theme: 'grid'
     });
     doc.save('Lc Report.pdf');


      Swal.fire({
        title: "Good job!",
        text: "Your PDF Download Compleated !!!",
        icon: "success"
      });
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
      let data = document.getElementById("table-data");
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, this.fileName);
    
    
      Swal.fire({
        title: "Good job!",
        text: "Your Excel Download Compleated !!!",
        icon: "success"
      });
    
    }
  });
}

}

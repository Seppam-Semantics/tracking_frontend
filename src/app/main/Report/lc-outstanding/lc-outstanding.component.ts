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
  constructor(private api : ApiService){}
  ngOnInit(): void { 
    this.lcnoFilter()
  
    this.api.lcNoListData().subscribe((res)=>{
      this.lcnolist = res.lcNo
    })

    this.api.StatusListData().subscribe((res)=>{
      this.Statuslist = res.yarnStatus
    })
  }

lcnoFilter(){
  this.api.LCOutstandingData(this.lcnoNumber).subscribe((res)=>{
    this.LCOutstandingData = res.LCOutstanding
    // console.log(this.LCOutstandingData)
  })  
}
statusFilter(){
  this.api.LCOutstandingData('',this.yarnStatusvalue).subscribe((res)=>{
    this.LCOutstandingData = res.LCOutstanding
  })  
}

  fileName = "LCoutStandingReport.xlsx"
exportexcel() {

  Swal.fire({
    title: "Are you sure?",
    text: "You Want To Download Report!!!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Download it!"
  }).then((result) => {
    if (result.isConfirmed) {

      // let data = document.getElementById("table-data");
      // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
      // const wb: XLSX.WorkBook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      // XLSX.writeFile(wb, this.fileName);      
      

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
      row.lcYarnKgs - row.allocatedYarnKgs ,
      row.receiptYarnKgs ,

      row.lcYarnKgs - row.receiptYarnKgs,
      row.yarnRate * row.receiptYarnKgs,
      row.yarnValue - (row.yarnRate * row.receiptYarnKgs) ,
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
                "Receipt value",
                "Pending LC Value",
                "Status"

       ]],
       body: data , 
       ...options
     });
     doc.save('Lc Report.pdf');


      Swal.fire({
        title: "Good job!",
        text: "Your Download Compleated !!!",
        icon: "success"
      });
    }
  });
}

}

import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-day-knit',
  templateUrl: './day-knit.component.html',
  styleUrls: ['./day-knit.component.css']
})
export class DayKnitComponent  implements OnInit{

  filterDate : any
  DayKnitData: any;
  orderName: any;
  ordervalue: any;
  statusvalue:any
  filterDate1:string = '';
  filterDate2:string = '';
  status = [{status:"open"},{status:"close"}]
  ngOnInit(): void {
    this.OrderName() 
   }
  constructor(private api : ApiService){}

  OrderName() {
    this.api.knitfty_order().subscribe((res) => {
      this.orderName = res.order
    })
  }

  fileName = "DayKnitReport.xlsx"
  exportexcel() {

    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You Want To Download Report!!!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, Download it!"
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //     let data = document.getElementById("table-data");
    //     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //     XLSX.writeFile(wb, this.fileName);
        
    //     Swal.fire({
    //       title: "Good job!",
    //       text: "Your Download Compleated !!!",
    //       icon: "success"
    //     });
    //   }
    // });


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
   
       const data = this.DayKnitData.map((row:any) => [
        row.factory , 
        row.buyer , 
        row.orderNo , 
        row.style , 
        row.color , 
        row.size,
        row.greigeKg,
        (row.AlldayProductionKgs - row.OnedayProductionKgs).toFixed(2),
        row.OnedayProductionKgs ,
        row.AlldayProductionKgs ,
        (row.greigeKg - row.AlldayProductionKgs).toFixed(2) ,
    
       ]);
       (doc as any).autoTable({
         head: [[
                "Knit Factory",
                "Buyer",          
                "Order",
                "Style",
                "Color",
                "Size",
                "Knit Griege Booking",
                "Knit till yesterday",
                "Today Knit",
                "Knit till today",
                "Knit Pending"
         ]],
         body: data , 
         ...options ,
         theme: 'grid'
       });
       doc.save('Day Knit.pdf');
        Swal.fire({
          title: "Good job!",
          text: "Your PDF Download Compleated !!!",
          icon: "success"
        });
  
      } 
      
      else if (result.isDenied) {
  
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



  date(){
    console.log(this.filterDate1)
    console.log(this.filterDate2)
    this.api.DayKnit(JSON.stringify(this.filterDate1),JSON.stringify(this.filterDate2)).subscribe((res)=>{
      this.DayKnitData = res.data
    })
  }

  order(){
    this.api.DayKnit(JSON.stringify(this.filterDate1),JSON.stringify(this.filterDate2),JSON.stringify(this.ordervalue),'').subscribe((res)=>{
      this.DayKnitData = res.data
    })
  }
  statusfun(){
    this.api.DayKnit(JSON.stringify(this.filterDate1),JSON.stringify(this.filterDate2),JSON.stringify(this.ordervalue),JSON.stringify(this.statusvalue)).subscribe((res)=>{
      this.DayKnitData = res.data
    })
  }
}

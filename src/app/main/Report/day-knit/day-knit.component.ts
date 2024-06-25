import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    
  }
  constructor(private api : ApiService){}

  fileName = "DayKnitReport.xlsx"
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

        let data = document.getElementById("table-data");
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, this.fileName);
        
        Swal.fire({
          title: "Good job!",
          text: "Your Download Compleated !!!",
          icon: "success"
        });
      }
    });

  }



  date(){
    this.api.DayKnit(this.filterDate).subscribe((res)=>{
      this.DayKnitData = res.data
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
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
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }



  date(){
    this.api.DayKnit(this.filterDate).subscribe((res)=>{
      this.DayKnitData = res.data
      console.log(this.DayKnitData)
    })
  }
}

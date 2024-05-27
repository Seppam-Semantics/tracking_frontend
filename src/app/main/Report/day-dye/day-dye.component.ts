import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'


@Component({
  selector: 'app-day-dye',
  templateUrl: './day-dye.component.html',
  styleUrls: ['./day-dye.component.css']
})
export class DayDyeComponent {
  filterDate : any
  DayDyeData: any;

  ngOnInit(): void {
    
  }
  constructor(private api : ApiService){}

  fileName = "DayDyeReport.xlsx"
  exportexcel() {
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }



  date(){
    this.api.DayDye(this.filterDate).subscribe((res)=>{
      this.DayDyeData = res.data
      console.log(res.data)
    })
  }
}
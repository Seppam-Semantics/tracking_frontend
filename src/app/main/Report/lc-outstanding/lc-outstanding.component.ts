import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-lc-outstanding',
  templateUrl: './lc-outstanding.component.html',
  styleUrls: ['./lc-outstanding.component.css']
})
export class LCOutstandingComponent implements OnInit{
  LCOutstandingData: any;
  filterDate: string = '';
  constructor(private api : ApiService){}
  ngOnInit(): void { 
    this.dateFilter()
  }

dateFilter(){
  this.api.LCOutstandingData(this.filterDate).subscribe((res)=>{
    this.LCOutstandingData = res.LCOutstanding
    console.log(this.LCOutstandingData)
  })  

}

  fileName = "LCoutStandingReport.xlsx"
exportexcel() {
  let data = document.getElementById("table-data");
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, this.fileName);
}



}

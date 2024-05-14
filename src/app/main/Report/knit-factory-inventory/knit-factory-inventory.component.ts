import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-knit-factory-inventory',
  templateUrl: './knit-factory-inventory.component.html',
  styleUrls: ['./knit-factory-inventory.component.css']
})
export class KnitFactoryInventoryComponent implements OnInit{
  KnitFactoryInventoryData: any;
  filterDate!:string;
  ngOnInit(): void { 

  }

  constructor(private api : ApiService){}

  date(){
    this.api.KFInventoryData(this.filterDate).subscribe((res)=>{
      this.KnitFactoryInventoryData = res.KnitFactoryInventory
      console.log(this.KnitFactoryInventoryData)
    })
  }

  fileName = "KnitFactoryInventoryReport.xlsx"
  exportexcel() {
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

}

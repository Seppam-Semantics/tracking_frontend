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
 
  ngOnInit(): void { 

    this.api.KFInventoryData().subscribe((res)=>{
      this.KnitFactoryInventoryData = res.KnitFactoryInventory
    })
  }

  constructor(private api : ApiService){}



  fileName = "KnitFactoryReport.xlsx"
  exportexcel() {
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

}

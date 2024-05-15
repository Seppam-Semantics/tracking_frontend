import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-dye-factory-inventory',
  templateUrl: './dye-factory-inventory.component.html',
  styleUrls: ['./dye-factory-inventory.component.css']
})
export class DyeFactoryInventoryComponent implements OnInit{
  DyeFactoryInventoryData: any;
  filterDate!:string;
ngOnInit(): void { }
constructor(private api : ApiService){}

fileName = "DyeFactoryInventoryReport.xlsx"
  exportexcel() {
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  date(){
    this.api.DFInventoryData(this.filterDate).subscribe((res)=>{
      this.DyeFactoryInventoryData = res.DyeFactoryInventory
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'


@Component({
  selector: 'app-yarn-reconciliation',
  templateUrl: './yarn-reconciliation.component.html',
  styleUrls: ['./yarn-reconciliation.component.css']
})
export class YarnReconciliationComponent implements OnInit{
ngOnInit(): void { }
YarnReconciliationData: any;
filterDate1:string = '';
filterDate2:string = '';
constructor(private Api : ApiService){ }

date(){
  this.Api.YarnReconciliation(this.filterDate1,this.filterDate2).subscribe((res)=>{
    this.YarnReconciliationData = res.YarnReconciliation
  })
}


fileName = "YarnReconciliationReport.xlsx"
exportexcel() {
  let data = document.getElementById("table-data");
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, this.fileName);
}


}

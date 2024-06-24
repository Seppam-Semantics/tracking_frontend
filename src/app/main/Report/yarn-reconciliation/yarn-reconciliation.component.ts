import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
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

      let data = document.getElementById("tableToConvert");
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


}

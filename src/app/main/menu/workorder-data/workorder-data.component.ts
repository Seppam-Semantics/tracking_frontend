import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api.service';
import * as xls from 'xlsx'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-workorder-data',
  templateUrl: './workorder-data.component.html',
  styleUrls: ['./workorder-data.component.css']
})
export class WorkorderDataComponent {

  loadingspinner:boolean=false;
  orderNo: any;
  id?: string;

  constructor(private api: ApiService ,  private spinner: NgxSpinnerService) {

  }

  dataSource:any[]=[]
  users: any;
  file: any;


  readfile(e: any) {
    this.file = e.target.files[0]
  }

  readexcelfile() {
    let fr = new FileReader();

    fr.readAsArrayBuffer(this.file);

    fr.onload = () => {
      let data = fr.result;
      let workbook = xls.read(data, { type: 'array' });

      const sheetname = workbook.SheetNames[0];
      const sheet1 = workbook.Sheets[sheetname];
      this.users = xls.utils.sheet_to_json(sheet1, { raw: true });
      this.users.splice(0, 1)
      this.dataSource = this.users;
      console.log(this.dataSource)
      
    };
  }

  workordersubmit() {
    this.spinner.show();
    this.api.postworkorder(this.dataSource).subscribe((res)=>{
      if(res.success){
        alert("Your work order details have been saved....!!!!")
        window.location.reload(); 
      }
      else{
        alert("Error while saving...!!!")
      }
    })       
  }

}
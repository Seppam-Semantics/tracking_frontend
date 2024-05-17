import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fabrics-transfer-cut-list-report',
  templateUrl: './fabrics-transfer-cut-list-report.component.html',
  styleUrls: ['./fabrics-transfer-cut-list-report.component.css']
})
export class FabricsTransferCutListReportComponent implements OnInit{

filterDate1:string = '';
filterDate2:string = '';
Buyer: any;
Buyerlist: any;
Order: any;
Orderlist: any;
constructor(private fb : FormBuilder , private router : Router){}


ngOnInit(): void { 
  this.Buyer = [ { name: 'New York', code: 'NY' }, ];
}

date(){   }

new(){ 
  this.router.navigate(['/main/FabricsTransferCuttingEntry'])
}
exportexcel(){}
}

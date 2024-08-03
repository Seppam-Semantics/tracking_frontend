import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdown } from 'primeng/dropdown';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-line-allocation-list',
  templateUrl: './line-allocation-list.component.html',
  styleUrls: ['./line-allocation-list.component.css']
})
export class LineAllocationListComponent implements OnInit{
  valueExceeded : boolean = false;
  AllData: any;
  Buyer_Value: any;
  buyersDta: any;
  orderNoDta: any;
  Order_Value: any;
  styleDta: any;
  style_Value: any;
  colorDta: any;
  color_Value: any;
  sizeDta: any;
  buyers: any;
  order: any;
  stylelist: any;
  colorlist: any;
  sizelist: any;
  shipDatevalue: any;
  orderpcsvalue: any;
  linedropdata: any;
  prodhrdata: any;



constructor(private router : Router , private api: ApiService , private fb : FormBuilder){

}


ngOnInit(): void {
  this.api.lineallocationAllData().subscribe((res)=>{
    this.AllData = res.data
  })
}

new(){
  this.router.navigate(['main/lineAllocationReport'])
}

update(){
  this.router.navigate(['main/lineallocationupdate'])
}
}

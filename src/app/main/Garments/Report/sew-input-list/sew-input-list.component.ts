import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-sew-input-list',
  templateUrl: './sew-input-list.component.html',
  styleUrls: ['./sew-input-list.component.css']
})
export class SewInputListComponent {
  SewinputEty : FormGroup
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  filterDate1 : any
  filterDate2 : any

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) { 


    this.SewinputEty = new FormGroup({
      InputDate : new FormControl('', Validators.required) ,
      data: this.fb.array([]),
    })

  }

  new(){ this.router.navigate(['main/SewInputEntry'])}

  get items() {
    return this.SewinputEty.get("data") as FormArray
  }

  SewinputEtyAddButton() {

    const row = this.fb.group({
      "id": [''],
      "Buyer": [''],
      "Orderno": [''],
      "Style": [''],
      "Color": [''],
      "GSize": [''],
      "GSizeId": ['',Validators.required],
      "LineNo": [''],
      "InputPcs": [''],
      "Bundleno": ['']
    });
    this.items.push(row);

  }

  delete(index:any){
    this.items.removeAt(index)
  }


  save(){
    this.router.navigate(['main/CutProdList'])
  }


  
  exportexcel(){ }
  edit(){ 
    this.editview = true;
   }
  Entry(){ }
  date(){ }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-cut-prod-list',
  templateUrl: './cut-prod-list.component.html',
  styleUrls: ['./cut-prod-list.component.css']
})
export class CutProdListComponent {

  CutProdEty : FormGroup
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  filterDate1 : any
  filterDate2 : any

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) { 


    this.CutProdEty = new FormGroup({
      CutDate : new FormControl('', Validators.required) ,
      data: this.fb.array([]),
    })

  }

  new(){ this.router.navigate(['main/CutProdEntry'])}

  get items() {
    return this.CutProdEty.get("data") as FormArray
  }

  CutProdEtyAddButton() {

    const row = this.fb.group({
      "id": [''],
      "Buyer": [''],
      "Orderno": [''],
      "Style": [''],
      "Color": [''],
      "GSize": [''],
      "GSizeId": ['',Validators.required],
      "Batch": [''],
      "Rollsnos": [''],
      "CutPcs": ['']
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

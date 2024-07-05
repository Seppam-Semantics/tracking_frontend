import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-sew-output-list',
  templateUrl: './sew-output-list.component.html',
  styleUrls: ['./sew-output-list.component.css']
})
export class SewOutputListComponent {
  SewoutputEty : FormGroup
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  filterDate1 : any
  filterDate2 : any

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) { 


    this.SewoutputEty = new FormGroup({
      OutputDate : new FormControl('', Validators.required) ,
      data: this.fb.array([]),
    })

  }

  new(){ this.router.navigate(['main/SewOutputEntry'])}

  get items() {
    return this.SewoutputEty.get("data") as FormArray
  }

  SewOutputEtyAddButton() {

    const row = this.fb.group({
      "id": [''],
      "Buyer": [''],
      "Orderno": [''],
      "Style": [''],
      "Color": [''],
      "GSize": [''],
      "GSizeId": ['',Validators.required],
      "LineNo": [''],
      "MCUsed": [''],
      "MPUsed": [''],
      "MCHrs": [''],
      "OutputPcs": [''],
      "TimePeriod": [''],
      "Bundleno": ['']
    });
    this.items.push(row);

  }

  delete(index:any){
    this.items.removeAt(index)
  }


  save(){
    this.router.navigate(['main/SewOutputEntry'])
  }


  
  exportexcel(){ }
  edit(){ 
    this.editview = true;
   }
  Entry(){ }
  date(){ }
  update(){

  }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-sewing-packing-entry',
  templateUrl: './sewing-packing-entry.component.html',
  styleUrls: ['./sewing-packing-entry.component.css']
})
export class SewingPackingEntryComponent {
  SewPkEty : FormGroup
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  filterDate1 : any
  filterDate2 : any

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) { 


    this.SewPkEty = new FormGroup({
      PackDate : new FormControl('', Validators.required) ,
      data: this.fb.array([]),
    })

  }
  get items() {
    return this.SewPkEty.get("data") as FormArray
  }

  SewPkEtyAddButton() {

    const row = this.fb.group({
      "id": [''],
      "Buyer": [''],
      "Orderno": [''],
      "Style": [''],
      "Color": [''],
      "GSize": [''],
      "GSizeId": ['',Validators.required],
      "LineNo": [''],
      "MPUsed": [''],
      "MCHrs": [''],
      "Bundleno": [''],
      "TimePeriod": [''],
      "PackPcs": [''],
      "CartonNos" :['']
    });
    this.items.push(row);

  }

  delete(index:any){
    this.items.removeAt(index)
  }

  save(){
    this.router.navigate(['main/SewingPackingList'])
  }
}

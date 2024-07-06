import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-invoice-entry',
  templateUrl: './invoice-entry.component.html',
  styleUrls: ['./invoice-entry.component.css']
})
export class InvoiceEntryComponent {
  InvoiceEty : FormGroup
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  filterDate1 : any
  filterDate2 : any

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) { 


    this.InvoiceEty = new FormGroup({
      Buyer: new FormControl(''),
      Invoiceno : new FormControl(''),
      notes : new FormControl(''),
      data: this.fb.array([]),
    })

  }

  get items() {
    return this.InvoiceEty.get("data") as FormArray
  }

  InvoiceEtyAddButton() {

    const row = this.fb.group({
      "id": [''],
      "Orderno" : [''],
      "Style": [''],
      "Color": [''],
      "GSize": [''],
      "FabType": [''],
      "FabGSM":[''],
      "GSizeId": ['',Validators.required],
      "ShipPcs": [''],
      "FOBRate": [''],
      "ValueUSD": [''],
      "SpecificRemarks": ['']
    });
    this.items.push(row);    
  }

  delete(index:any){
    this.items.removeAt(index)
  }

  save(){
    this.router.navigate(['/main/InvoiceListing'])
  }
}
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-shipment-listing-list',
  templateUrl: './shipment-listing-list.component.html',
  styleUrls: ['./shipment-listing-list.component.css']
})
export class ShipmentListingListComponent {
  ShipEty : FormGroup
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  filterDate1 : any
  filterDate2 : any

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) { 


    this.ShipEty = new FormGroup({
      Buyer: new FormControl(''),
      Orderno : new FormControl(''),
      notes : new FormControl(''),
      data: this.fb.array([]),
    })

  }

  new(){ this.router.navigate(['main/ShipmentPackingEntry'])}

  get items() {
    return this.ShipEty.get("data") as FormArray
  }

  ShipEtyAddButton() {

    const row = this.fb.group({
      "id": [''],
      "Style": [''],
      "Color": [''],
      "GSize": [''],
      "FabType": [''],
      "FabGSM":[''],
      "GSizeId": ['',Validators.required],
      "OrderPcs": [''],
      "ShipPcs": [''],
      "Cartonnos": [''],
      "PendingPcs": [''],
      "SpecificRemarks": ['']
    });
    this.items.push(row);

    row.get('ShipPcs')?.valueChanges.subscribe(()=>{
      this.calculateDiff()
    })

    row.get('Cartonnos')?.valueChanges.subscribe(()=>{
      this.calculateDiff()
    })
    
  }

  calculateDiff(){
    this.items.controls.forEach((control:AbstractControl)=>{
      const row = control as FormGroup

      if (row instanceof FormGroup) {
        const ShipPcsValue = parseFloat(row.get('ShipPcs')?.value);
        const CartonnosValue = parseFloat(row.get('Cartonnos')?.value);
  
        const a = ShipPcsValue - CartonnosValue
        const PendingPcs = parseFloat(a.toFixed(2));
  
        row.patchValue({ PendingPcs});
      }
    })
  }

  delete(index:any){
    this.items.removeAt(index)
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

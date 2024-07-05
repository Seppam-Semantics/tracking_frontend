import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-cut-prod-entry',
  templateUrl: './cut-prod-entry.component.html',
  styleUrls: ['./cut-prod-entry.component.css']
})
export class CutProdEntryComponent {

  CutProdEty : FormGroup
  valueExceeded : boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router) {

    this.CutProdEty = new FormGroup({
      CutDate : new FormControl('', Validators.required) ,
      data: this.fb.array([]),
    })

  }

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
}

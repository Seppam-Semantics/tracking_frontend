import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-yarn-header',
  templateUrl: './yarn-header.component.html',
  styleUrls: ['./yarn-header.component.css']
})
export class YarnHeaderComponent implements OnInit{
  total1: any;
  allYarn:any
  yarnSpinnerDropdown: any;
  yarnData: any;
  yarnType: any;
  yarn_Id: any;
  spinftyYarnType:any;
  yarnTypeOrder: any;
  yarnorder_Id: any;
  spinftyOrder: any;
  spinftyReceipt:any
  orderNo: any;
  spinfty: any;
  spinLcNo:any;
  spinftyreceipt: any;
  yarnTypereceipt: any;
  yarnreceipt_Id: any;
  spinLotliNo: any;
  spinreceiptLno: any;
  spinorderliNo: any;
  spinnerLotlcNo: any;
  spinnerorderlcNo: any;
  orderTotal:any;
  buyerName:any;
  buyers: any;
  spinnerreceiptlcNo: any;
  spinnerQualitylcNo: any;
  yarnTypeQuality: any;
  yarnQuality_Id: any;
  qualityreceiptcellan: any;
  entry:boolean = true;
  yarnStatus:any = 'open'
  loading : boolean = false;

  constructor(private fb:FormBuilder, private api: ApiService, private router:Router){}


  ngOnInit(): void {

    this.api.getallSpinfty().subscribe((res)=>{
      this.spinfty = res.buyers
    })

   this.api.getAllYarn().subscribe((res)=>{
    this.allYarn = res.yarn
   })

   this.api.yarnSpinner().subscribe((res)=>{
    this.yarnSpinnerDropdown=res.spinners
   })

   this.api.yarnType().subscribe((res)=>{
    this.yarnType = res.types
   })

   this.getbuyers();
  }

  public getbuyers() {
    this.api.getbuyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }


  newEntryBtn(){
    this.entry = false
  }

  existingEntryBtn(){
    this.router.navigate(['Yarn-Report']);
  }


  Yarn_Entry_1 = new FormGroup({
    spinner : new FormControl(),
    lcDate : new FormControl(),
    lcNo : new FormControl(),
    pi : new FormControl(),
    piDate : new FormControl(),
    lcYarnKgs:new FormControl(),
    lcValue : new FormControl(),
    yarnStatus : new FormControl(),
    data: this.fb.array([]),
    Total10 : new FormControl(),
    Total12 : new FormControl(),
  })

  calculateDiff() {
    let total10 = 0; 
  let total12 = 0;
  this.items.controls.forEach((control: AbstractControl) => {
    const row = control as FormGroup; 
    if (row instanceof FormGroup) {
      const Value10 = parseFloat(row.get('lcYarnKgs')?.value) || 0;
      const Value12 = parseFloat(row.get('yarnValue')?.value) || 0;
      total10 += Value10;
      total12 += Value12;
    }
  });
  this.Yarn_Entry_1.get('lcYarnKgs')?.setValue(total10); 
  this.Yarn_Entry_1.get('lcValue')?.setValue(total12);
  this.Yarn_Entry_1.get('Total10')?.setValue(total10); 
  this.Yarn_Entry_1.get('Total12')?.setValue(total12);

}

calculateDiff5() {
  this.items.controls.forEach((control: AbstractControl) => {
    const row = control as FormGroup;
    if (row instanceof FormGroup) {
      const lcYarnKgs = parseFloat(row.get('lcYarnKgs')?.value);
      const yarnRate = parseFloat(row.get('yarnRate')?.value);

      const yarnValue1 = lcYarnKgs * yarnRate
      const yarnValue = parseFloat(yarnValue1.toFixed(2));

      row.patchValue({ yarnValue});
    }
  });
}


get items() {
  return this.Yarn_Entry_1.get("data") as FormArray;
}

add1button(){
  const row = this.fb.group({
    "yarnType": new FormControl(''),
    "lcYarnKgs": new FormControl(''),
    "yarnRate": new FormControl(''),
    "yarnValue": new FormControl(''),
  });

  row.get('lcYarnKgs')?.valueChanges.subscribe(() => {
    this.calculateDiff();
    this.calculateDiff5()
  });

  row.get('yarnRate')?.valueChanges.subscribe(() => {
    this.calculateDiff();
    this.calculateDiff5()
  });
  row.get('yarnValue')?.valueChanges.subscribe(() => {
    this.calculateDiff();
  });

  this.items.push(row);  
}
  
  Yarn_Entry_Delete(index: number) {
    this.items.removeAt(index);
  }
  


  Yarn_Entry_save(){
    this.loading = true
    this.api.addUpdateYarn(this.Yarn_Entry_1.value).subscribe((res)=>{
      alert(res.message)
      this.loading = false
      if(res.success == true){
        this.router.navigate(['/Yarn-Report']);
      }
    })
  }
}

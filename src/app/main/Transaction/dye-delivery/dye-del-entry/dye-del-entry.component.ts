import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';
@Component({
  selector: 'app-dye-del-entry',
  templateUrl: './dye-del-entry.component.html',
  styleUrls: ['./dye-del-entry.component.css']
})
export class DyeDelEntryComponent {
  DateData:any
  KnitFactoryData:any
  ToDyeFtyData:any
  BuyerData:any
  OrderData:any
  StyleData:any
  ColorData:any
  SizeData:any
  KnitRateData:any
  DyeDeliveryNewPop:boolean=false
  DyeDelivery!:FormGroup

  @ViewChild('inputField') dropdown!: Dropdown;
  logInput(event: any) {
    console.log(event); // Log the selected value of the dropdown
  }

ngOnInit(): void {
  
}
constructor(private fb : FormBuilder){

  this.DyeDelivery = new FormGroup({
    "Date" : new FormControl(''),
    "KnitFactory" : new FormControl(''),
    DyeDeliveryData: this.fb.array([]),
    "RollsGriegeTotal" : new FormControl(),
    "RollsFinishTotal" : new FormControl(),
    "DeliveryGriegeTotal" : new FormControl(),
    "DeliveryFinishTotal" : new FormControl(),
    "DyeTotal" : new FormControl(),
  })
}

get items() {
  return this.DyeDelivery.get("DyeDeliveryData") as FormArray;
}

DyeDeliveryAddButton(){
  
  const row = this.fb.group({
    "Sno": new FormControl(),
    "DyeChallan": new FormControl(),
    "BatchNo": new FormControl(),
    "Buyer": new FormControl(),
    "Order": new FormControl(),
    "Style": new FormControl(),
    "Color": new FormControl(),
    "Size": new FormControl(),
    "noRollsGriege": new FormControl(''),
    "noRollsFinish": new FormControl(''),
    "DeliveryGreigeFab": new FormControl(''),
    "DeliveryFinishFab": new FormControl(''),
    "DyeRate": new FormControl(''),
    "DyeValue": new FormControl(''),

  });
  
  row.get('DyeRate')?.valueChanges.subscribe(() => {
    this.calculate();
  });
  
  this.items.push(row); 
}

DyeDeliveryRemoveButton(index:any){
  this.items.removeAt(index);
}

calculate(){
  let noRollsGriegeSum = 0; 
  let noRollsFinishSum = 0;
  let DelGreigeFabSum = 0;
  let DelFinishFabSum = 0;
  let DyeValueSum = 0;
  this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const noRollsGriege = parseFloat(row.get('noRollsGriege')?.value)|| 0;
        const noRollsFinish = parseFloat(row.get('noRollsFinish')?.value)|| 0;

        const DelGreigeFab = parseFloat(row.get('DeliveryGreigeFab')?.value)|| 0;
        const DelFinishFab = parseFloat(row.get('DeliveryFinishFab')?.value)|| 0;

        const DyeRate = parseFloat(row.get('DyeRate')?.value)|| 0;

        const DyeValuedata = parseFloat(row.get('DyeValue')?.value)|| 0;

        noRollsGriegeSum += noRollsGriege
        noRollsFinishSum += noRollsFinish
        DelGreigeFabSum += DelGreigeFab
        DelFinishFabSum += DelFinishFab
        DyeValueSum += DyeValuedata

        const DyeValue = noRollsFinish * DyeRate

        row.patchValue({ DyeValue});
      }
      this.DyeDelivery.get('RollsGriegeTotal')?.setValue(noRollsGriegeSum); 
      this.DyeDelivery.get('RollsFinishTotal')?.setValue(noRollsFinishSum); 
      this.DyeDelivery.get('DeliveryGriegeTotal')?.setValue(DelGreigeFabSum); 
      this.DyeDelivery.get('DeliveryFinishTotal')?.setValue(DelFinishFabSum); 
      this.DyeDelivery.get('DyeTotal')?.setValue(DyeValueSum); 
    });
}
new(){
  this.DyeDeliveryNewPop = true
}
saveButton(){
  console.log(this.DyeDelivery.value)
}

}

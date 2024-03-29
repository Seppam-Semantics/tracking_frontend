import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-yarn-entry',
  templateUrl: './yarn-entry.component.html',
  styleUrls: ['./yarn-entry.component.css']
})
export class YarnEntryComponent implements OnInit {
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

  constructor(private fb:FormBuilder, private api: ApiService){}


  ngOnInit(): void {
   this.api.getAllYarn().subscribe((res)=>{
    this.allYarn = res.yarn
   })

   this.api.yarnSpinnerDropdown().subscribe((res)=>{
    this.yarnSpinnerDropdown=res.spinners
   })
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
    console.log(this.Yarn_Entry_1.value)

    this.api.addUpdateYarn(this.Yarn_Entry_1.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }
  
// <!-----------------------------Lot Check------------------------------------------------------------------------>


getYarnTypeData(){
  this.api.gettingYarnType(this.spinftyYarnType).subscribe((res)=>{
    this.yarnData = res.knit;
    for(let id of this.yarnData){   
      this.api.getSingleYarnData(id.id).subscribe((res)=>{
        this.yarnType = res.yarn_lc_lines
        this.yarn_Id = res.yarn_lc_lines[0].yarnId
        console.log(this.yarn_Id)

        this.LotCheck.controls['yarnId'].setValue(this.yarn_Id);
      })
    }
  })
}


LotCheck = this.fb.group({
  yarnId: [],
  data: this.fb.array([]),
})

get LotCheckItems() {
  return this.LotCheck.get("data") as FormArray;
}

LotCheckAddButton(){
  const LotCheckDetails = this.fb.group({
    yarnType : new FormControl(),
    lotNo : new FormControl(),
    sampleDate : new FormControl(),
    resultDate : new FormControl(),
    checkResults : new FormControl(),
    acceptRejectStatus : new FormControl()
  });
  
  this.LotCheckItems.push(LotCheckDetails);  
  }
  

LotCheck_Button(){
  console.log(this.LotCheck.value)
  this.api.addUpdateYarnCheck(this.LotCheck.value).subscribe((res)=>{
    alert(res.message)
  })
}

// <!------------------------------------Order Allocation----------------------------------------------------------------->

getOrderAllocationData(){
  this.api.gettingYarnType(this.spinftyOrder).subscribe((res)=>{
    this.yarnData = res.knit;
    for(let id of this.yarnData){   
      this.api.getSingleYarnData(id.id).subscribe((res)=>{
        this.yarnTypeOrder = res.yarn_lot_check
        this.yarnorder_Id = res.yarn_lot_check[0].yarnId
        console.log(this.yarnorder_Id)

        this.OrderAllocation.controls['yarnId'].setValue(this.yarnorder_Id);
      })
    }
  })
}


OrderAllocation = this.fb.group({
  yarnId: [],
  data: this.fb.array([]),
})

OrderAllocationAddButton(){
const Row2 = this.fb.group({
  lcNo: new FormControl(''),
  yarnType: new FormControl(''),
  utilisationOrderNo: new FormControl(''),
  colour: new FormControl(''),
  lotNo: new FormControl(''),
  allocatedYarnKgs: new FormControl(''),
  unallocatedYarnKgs: new FormControl('')
});

this.items2.push(Row2);  
}

get items2() {
  return this.OrderAllocation.get("data") as FormArray;
}

OrderAllocationDelete(index: number) {
  this.items2.removeAt(index);
}

OrderAllocationSave(){
  console.log(this.OrderAllocation.value)

  this.api.addUpdateOrderAllocation(this.OrderAllocation.value).subscribe((res)=>{
    alert(res.message)
  })
}


// <!-------------------------- Receipt --------------------------------------------------------------------------->

Receipt = new FormGroup({
  11: new FormControl(''),
  22: new FormControl(''),
  33: new FormControl(''),
  44: new FormControl(''),
  55: new FormControl(''),
  66: new FormControl(''),
  77: new FormControl(''),
  88: new FormControl(''),
 
  data3: this.fb.array([]),
})
get items3() {
  return this.Receipt.get("data3") as FormArray;
}
ReceiptAddButton(){
  const Row3 = this.fb.group({
    1: new FormControl(''),
    2: new FormControl(''),
    3: new FormControl(''),
    4: new FormControl(''),
    5: new FormControl(''),
    6: new FormControl(''),
    7: new FormControl(''),
  });
  
  this.items3.push(Row3);  
  }

  ReceiptDelete(index: number) {
    this.items3.removeAt(index);
  }
  
  
// <!----------------------------------------------------------------------------------------------------->
Yarn_QC = new FormGroup({
  111: new FormControl(''),
  222: new FormControl(''),
  333: new FormControl(''),
  444: new FormControl(''),
  555: new FormControl(''),
  666: new FormControl(''),
  777: new FormControl(''),
  888: new FormControl(''), 
  data4: this.fb.array([]),

})
get items4() {
  return this.Yarn_QC.get("data4") as FormArray;
}
YarnQCAddButton(){
  const Row4 = this.fb.group({
    1: new FormControl(''),
    2: new FormControl(''),
    3: new FormControl(''),
    });
  
  this.items4.push(Row4);  
  }

  YarnQCDelete(index: number) {
    this.items4.removeAt(index);
  }
// <!----------------------------------------------------------------------------------------------------->


}

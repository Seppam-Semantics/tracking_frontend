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

  constructor(private fb:FormBuilder, private api: ApiService){}


  ngOnInit(): void {

    this.api.getallSpinfty().subscribe((res)=>{
      this.spinfty = res.buyers
    })

   this.api.getAllYarn().subscribe((res)=>{
    this.allYarn = res.yarn
   })

   this.api.yarnSpinnerDropdown().subscribe((res)=>{
    this.yarnSpinnerDropdown=res.spinners
   })

   this.getbuyers();
  }

  public getbuyers() {
    this.api.getbuyers().subscribe((res) => {
      this.buyers = res.buyers;
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


getYarnLcNo(){
  this.api.yarnLcNo(this.spinftyYarnType).subscribe((res)=>{
    this.spinnerLotlcNo = res.lcNo
  })
}

getYarnTypeData(){
  this.api.gettingYarnType(this.spinftyYarnType, this.spinLotliNo).subscribe((res)=>{
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

getYarnorderLcNo(){
  this.api.yarnLcNo(this.spinftyOrder).subscribe((res)=>{
    this.spinnerorderlcNo = res.lcNo
  })
}

getOrderAllocationData(){
  this.api.gettingYarnType(this.spinftyOrder, this.spinorderliNo).subscribe((res)=>{
    this.yarnData = res.knit;
    for(let id of this.yarnData){   
      this.api.getSingleYarnData(id.id).subscribe((res)=>{
        this.yarnTypeOrder = res.yarn_lc_lines
        this.yarnorder_Id = res.yarn[0].id
        console.log(this.yarnorder_Id)
        this.OrderAllocation.controls['yarnId'].setValue(this.yarnorder_Id);
      })
    }
  })
}

getorders() {
  this.api.getorders(this.buyerName).subscribe((res) => {
    this.orderNo = res.orders
  })
}

getTotal(type:any, index:any){
  console.log(type)
  this.api.yarnTotal(this.yarnorder_Id, type).subscribe((res)=>{
    console.log(res.total)
    this.orderTotal = res.total[0].lctotal
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

getYarnReceiptLcNo(){
  this.api.yarnLcNo(this.Receipt.get('spinftyreceipt')?.value).subscribe((res)=>{
    this.spinnerreceiptlcNo = res.lcNo
    console.log(res)
  })
}

getreceiptData(){
  this.api.gettingYarnType(this.Receipt.get('spinftyreceipt')?.value, this.Receipt.get('spinreceiptLno')?.value).subscribe((res)=>{
    this.yarnData = res.knit;
    for(let id of this.yarnData){   
      this.api.getSingleYarnData(id.id).subscribe((res)=>{
        this.yarnTypereceipt = res.yarn_order_allocations
        this.spinLcNo = res.yarn
        this.yarnreceipt_Id = res.yarn[0].id
        this.receiptForm.controls['yarnId'].setValue(this.yarnreceipt_Id);
      })
    }
  })
}


Receipt = new FormGroup({
  spinftyreceipt:new FormControl(''),
  receiptLc: new FormControl(''),
  receiptYarnType: new FormControl(''),
  yarnOrderId: new FormControl(''),
  receiptOrderColor: new FormControl(''),
  receiptLotNo: new FormControl(''),
  AllocatedYarnTotal: new FormControl(''),
  unallocatedYarnTotal: new FormControl(''),
  data: this.fb.array([]),
})

receiptForm = this.fb.group({
  yarnId:[],
  data: this.fb.array([]),
})

get items3() {
  return this.receiptForm.get("data") as FormArray;
}

ReceiptAddButton(){
  const Row3 = this.fb.group({
    yarnOrderId: new FormControl(this.Receipt.get('yarnOrderId')?.value),
    spinningChallan: new FormControl(''),
    scandexChallan: new FormControl(''),
    receiptDt: new FormControl(''),
    knitFactory: new FormControl(''),
    BagsCtnNos: new FormControl(''),
    receiptYarnKgs: new FormControl(''),
    pendingReceiptKgs: new FormControl(''),
  });
  
  this.items3.push(Row3);  
  }

  ReceiptDelete(index: number) {
    this.items3.removeAt(index);
  }

  receiptSave(){
    console.log(this.receiptForm.value)
    this.api.addUpdateYarnreceipt(this.receiptForm.value).subscribe((res)=>{
      alert(res.message)
    })
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

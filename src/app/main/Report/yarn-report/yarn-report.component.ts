import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-yarn-report',
  templateUrl: './yarn-report.component.html',
  styleUrls: ['./yarn-report.component.css']
})
export class YarnReportComponent implements OnInit {
  AllData: any;
  total1: any;
  allYarn: any
  yarnSpinnerDropdown: any;
  yarnData: any;
  yarnType: any;
  yarn_Id: any;
  spinftyYarnType: any;
  yarnTypeOrder: any;
  yarnorder_Id: any;
  spinftyOrder: any;
  spinftyReceipt: any
  orderNo: any;
  spinfty: any;
  spinLcNo: any;
  spinftyreceipt: any;
  yarnTypereceipt: any;
  yarnreceipt_Id: any;
  spinLotliNo: any;
  spinreceiptLno: any;
  spinorderliNo: any;
  spinnerLotlcNo: any;
  spinnerorderlcNo: any;
  orderTotal: any;
  buyerName: any;
  buyers: any;
  spinnerreceiptlcNo: any;
  yarn: any;
  yarnLcLines: any;
  yarnLcTotal: any;
  yarnLotCheck: any;
  yarnOrderAllocations: any;
  yarnQualityCheck: any;
  yarnReceiptsLines: any;
  yarnLineId: any;
  style: any;
  yarnOrderId: any;
  yarnreceiptId: any;
  indexvalue: any;
  QCindexvalue: any;

  constructor(private fb: FormBuilder, private api: ApiService, private datePipe: DatePipe) { }


  ngOnInit(): void {

    this.api.getAllYarn().subscribe((res) => {
      this.AllData = res.yarn
    })

    this.api.getallSpinfty().subscribe((res) => {
      this.spinfty = res.buyers
    })

    this.api.getAllYarn().subscribe((res) => {
      this.allYarn = res.yarn
    })

    this.api.yarnSpinnerDropdown().subscribe((res) => {
      this.yarnSpinnerDropdown = res.spinners
    })

    this.getbuyers();
  }

  public getbuyers() {
    this.api.getbuyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }



  EditAllData(id:any){
    this.api.getSingleYarnData(id).subscribe((res)=>{
      this.yarn = res.yarn;
      this.yarnLcLines  = res.yarn_lc_lines;
      this.yarnLcTotal = res.yarn_lc_total;
      this.yarnLotCheck = res.yarn_lot_check;
      this.yarnOrderAllocations = res.yarn_order_allocations;
      this.yarnQualityCheck = res.yarn_quality_check;
      this.yarnReceiptsLines = res.yarn_receipts_lines

      const formattedDate1 = this.datePipe.transform(
        this.yarn[0].lcDate,
        'yyyy-MM-dd'
      );
      
      const formattedDate2 = this.datePipe.transform(
        this.yarn[0].piDate,
        'yyyy-MM-dd'
      );

      this.yarnHeader.patchValue({
        id: this.yarn[0].id,
        spinner: this.yarn[0].spinner,
        lcDate: formattedDate1,
        lcNo: this.yarn[0].lcNo,
        pi: this.yarn[0].pi,
        piDate: formattedDate2,
        lcYarnKgs: this.yarnLcTotal[0].lctotal,
        lcValue: this.yarn[0].lcValue,
        yarnStatus: this.yarn[0].yarnStatus

      })
      const receivedData = this.yarnLcLines
  
      const yarnEntryData = this.Yarn_Entry_1.get('data') as FormArray;
      yarnEntryData.clear();
    
      receivedData.forEach((dataItem:any) => {
        const row = this.fb.group({
          id:dataItem.id,
          yarnType: dataItem.yarnType,
          lcYarnKgs: dataItem.lcYarnKgs,
          yarnRate: dataItem.yarnRate,
          yarnValue: dataItem.yarnValue,
        }); 
        yarnEntryData.push(row);
      });
    })
  }

  yarnHeader = this.fb.group({
    id : new FormControl(), 
    spinner: new FormControl(),
    lcDate: new FormControl(),
    lcNo: new FormControl(),
    pi: new FormControl(),
    piDate: new FormControl(),
    lcYarnKgs: new FormControl(),
    lcValue: new FormControl(),
    yarnStatus: new FormControl(),
  })

  Yarn_Entry_1 = new FormGroup({
    data: this.fb.array([]),
    Total10: new FormControl(),
    Total12: new FormControl(),
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
    this.yarnHeader.get('lcYarnKgs')?.setValue(total10);
    this.yarnHeader.get('lcValue')?.setValue(total12);
    this.Yarn_Entry_1.get('Total10')?.setValue(total10);
    this.Yarn_Entry_1.get('Total12')?.setValue(total12);
  }


  get items() {
    return this.Yarn_Entry_1.get("data") as FormArray;
  }

  add1button() {
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



  Yarn_Entry_save() {
    const yarnHeaderData = this.fb.group({
      id : this.yarnHeader.get('id')?.value, 
      spinner: this.yarnHeader.get('spinner')?.value,
      lcDate: this.yarnHeader.get('lcDate')?.value,
      lcNo: this.yarnHeader.get('lcNo')?.value,
      pi: this.yarnHeader.get('pi')?.value,
      piDate: this.yarnHeader.get('piDate')?.value,
      lcYarnKgs: this.yarnHeader.get('lcYarnKgs')?.value,
      lcValue: this.yarnHeader.get('lcValue')?.value,
      yarnStatus: this.yarnHeader.get('yarnStatus')?.value,
      data: this.Yarn_Entry_1.get('data')
    })
    this.api.addUpdateYarn(yarnHeaderData.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

  // <!-----------------------------Lot Check------------------------------------------------------------------------>

  lotcheckaddUpdate(index: number) {
    this.yarnLineId = this.yarnLcLines[index].id;
    this.LotCheck.controls['yarnId'].setValue(this.yarn[0].id);
    const receivedData = this.yarnLotCheck;
  
    const yarnEntryData = this.LotCheck.get('data') as FormArray;
    yarnEntryData.clear();
    
    receivedData.forEach((dataItem: any) => {
      const LotCheckDetails = this.fb.group({
        id: dataItem.id,
        yarnLineId: this.yarnLineId,
        yarnType: dataItem.yarnType,
        lotNo: dataItem.lotNo,
        sampleDate: this.datePipe.transform(dataItem.sampleDate,'yyyy-MM-dd'),
        resultDate: this.datePipe.transform(dataItem.resultDate,'yyyy-MM-dd'),
        checkResults: dataItem.checkResults,
        acceptRejectStatus: dataItem.acceptRejectStatus
      });
      yarnEntryData.push(LotCheckDetails);
    });
  }
  
  LotCheck = this.fb.group({
    yarnId: [],
    data: this.fb.array([])
  });
  
  get LotCheckItems() {
    return this.LotCheck.get("data") as FormArray;
  }
  
  LotCheckAddButton() {
    const LotCheckDetails = this.fb.group({
      id:new FormControl(),
      yarnLineId: new FormControl(this.yarnLineId),
      yarnType: new FormControl(''),
      lotNo: new FormControl(),
      sampleDate: new FormControl(),
      resultDate: new FormControl(),
      checkResults: new FormControl(),
      acceptRejectStatus: new FormControl()
    });
  
    this.LotCheckItems.push(LotCheckDetails);
  }

  lotCheckDelete(index:any){
    this.LotCheckItems.removeAt(index);
  }
  
  LotCheck_Button() {
    this.api.addUpdateYarnCheck(this.LotCheck.value).subscribe((res) => {
      alert(res.message);
    });
  }
  

  // <!------------------------------------Order Allocation----------------------------------------------------------------->

  orderAllotAddUpdate(index:any){
    this.yarnLineId = this.yarnLcLines[index].id;
    this.OrderAllocation.controls['yarnId'].setValue(this.yarn[0].id);

    const receivedData = this.yarnOrderAllocations;
  
    const yarnEntryData = this.OrderAllocation.get('data') as FormArray;
    yarnEntryData.clear();
  
    receivedData.forEach((dataItem: any) => {
      const Row2 = this.fb.group({
        id: dataItem.id,
        yarnLineId: this.yarnLineId,
        yarnType: dataItem.yarnType,
        buyer:dataItem.buyer,
        utilisationOrderNo: dataItem.utilisationOrderNo,
        style:dataItem.style,
        colour: dataItem.colour,
        lotNo: dataItem.lotNo,
        allocatedYarnKgs: dataItem.allocatedYarnKgs,
        unallocatedYarnKgs:dataItem.unallocatedYarnKgs
      });
      yarnEntryData.push(Row2);
    });
    this.getbuyers()
  }

  getorders(buyer:any) {
    this.buyerName = buyer
    this.api.getorders(buyer).subscribe((res) => {
      this.orderNo = res.orders
    })
  }
  getstyle(order: any) {
    this.api.getstyle(this.buyerName, order).subscribe((res) => {
      this.style = res.styles;
    })
  }

  getTotal(type: any) {
    this.api.yarnTotal(this.yarnorder_Id, type).subscribe((res) => {
      console.log(res.total)
      this.orderTotal = res.total[0].lctotal
    })
  }

  OrderAllocation = this.fb.group({
    yarnId: [],
    buyer: new FormControl(''),
    data: this.fb.array([]),
  })

  OrderAllocationAddButton() {
    const Row2 = this.fb.group({
      id: new FormControl(),
      yarnLineId: new FormControl(this.yarnLineId),
      lcNo: new FormControl(''),
      yarnType: new FormControl(''),
      utilisationOrderNo: new FormControl(''),
      style: new FormControl(''),
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

  OrderAllocationSave() {
    console.log(this.OrderAllocation.value)
    this.api.addUpdateOrderAllocation(this.OrderAllocation.value).subscribe((res) => {
      alert(res.message)
    })
  }


  // <!-------------------------- Receipt --------------------------------------------------------------------------->

  orderId(index:any){
    this.yarnOrderId = this.yarnOrderAllocations[index].id

    this.receiptForm.controls['yarnId'].setValue(this.yarn[0].id);

    const receivedData = this.yarnReceiptsLines;
  
    const yarnEntryData = this.receiptForm.get('data') as FormArray;
    yarnEntryData.clear();
  
    receivedData.forEach((dataItem: any) => {
      const Row3 = this.fb.group({
        id: dataItem.id,
        yarnOrderId: this.yarnOrderId,
        spinningChallan: dataItem.spinningChallan,
        scandexChallan:dataItem.scandexChallan,
        receiptDt: this.datePipe.transform(dataItem.receiptDt,'yyyy-MM-dd'),
        knitFactory:dataItem.knitFactory,
        BagsCtnNos: dataItem.BagsCtnNos,
        receiptYarnKgs: dataItem.receiptYarnKgs,
        pendingReceiptKgs: dataItem.pendingReceiptKgs
      });
      yarnEntryData.push(Row3);
    });
  }

  receiptForm = this.fb.group({
    yarnId: [],
    data: this.fb.array([]),
  })

  get items3() {
    return this.receiptForm.get("data") as FormArray;
  }

  ReceiptAddButton() {
    const Row3 = this.fb.group({
      id:new FormControl(),
      yarnOrderId: new FormControl(this.yarnOrderId),
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

  receiptSave() {
    console.log(this.receiptForm.value)
    this.api.addUpdateYarnreceipt(this.receiptForm.value).subscribe((res) => {
      alert(res.message)
    })
  }

  // <!----------------------------------------------------------------------------------------------------->

  receiptId(index:any){
    this.QCindexvalue = index
    this.yarnreceiptId = this.yarnReceiptsLines[index].id

    this.Yarn_QC.controls['yarnId'].setValue(this.yarn[0].id);

    const receivedData = this.yarnQualityCheck;
  
    const yarnEntryData = this.Yarn_QC.get('data') as FormArray;
    yarnEntryData.clear();
  
    receivedData.forEach((dataItem: any) => {
      const Row4 = this.fb.group({
        id: dataItem.id,
        yarnReceiptId: this.yarnreceiptId,
        checkDate: this.datePipe.transform(dataItem.checkDate,'yyyy-MM-dd'),
        checkResults:dataItem.checkResults,
        yarnAcceptRejectStatus: dataItem.yarnAcceptRejectStatus
      });
      yarnEntryData.push(Row4);
    });
  }

  Yarn_QC = this.fb.group({
    yarnId:[],
    data: this.fb.array([]),

  })
  get items4() {
    return this.Yarn_QC.get("data") as FormArray;
  }
  YarnQCAddButton() {
    const Row4 = this.fb.group({
      id:new FormControl(),
      yarnReceiptId:new FormControl(this.yarnreceiptId),
      checkDate: new FormControl(''),
      checkResults: new FormControl(''),
      yarnAcceptRejectStatus: new FormControl(''),
    });

    this.items4.push(Row4);
  }

  YarnQCDelete(index: number) {
    this.items4.removeAt(index);
  }

  yarnQcSave(){
    console.log(this.Yarn_QC.value)
    this.api.addUpdateYarnQuality(this.Yarn_QC.value).subscribe((res)=>{
      alert(res.message)
      this.receiptId(this.QCindexvalue)
    })
  }

  // <!----------------------------------------------------------------------------------------------------->
}

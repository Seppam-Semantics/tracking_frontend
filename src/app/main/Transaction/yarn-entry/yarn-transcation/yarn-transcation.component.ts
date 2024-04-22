import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-yarn-transcation',
  templateUrl: './yarn-transcation.component.html',
  styleUrls: ['./yarn-transcation.component.css']
})
export class YarnTranscationComponent implements OnInit {
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
  spinStatus: any;
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
  singleId: any;
  yarnlotcheckLotNo: any;
  receiptDetails: any;
  knitFty: any;
  allyarnType: any;
  lineDetails: any;
  unallocatedYarnKgs: any;
  lotlineDetails: any;
  colorlist: any;
  orderNumber: any;
  yarnId: any;
  yarnKg: any;
  orderDetails: any;
  lotYarnType: any;
  Receipttest: any;
  lotCheckModal: boolean = false;
  orderAllocationModal: boolean = false;
  receiptModal: boolean = false;
  yarnQcModal: boolean = false;
  yarnLinedelete: any;
  ReceivedDataReceipt: any;
  ReceipReceivedDataId: any;

  constructor(private fb: FormBuilder, private api: ApiService, private datePipe: DatePipe) { }


  ngOnInit(): void {
    this.singleId = sessionStorage.getItem('singleData');

    this.api.getAllYarn().subscribe((res) => {
      this.allYarn = res.yarn
    })

    this.api.yarnSpinner().subscribe((res) => {
      this.yarnSpinnerDropdown = res.spinners
    })

    this.api.knitfty_name().subscribe((res) => {
      this.knitFty = res.factorys
    })

    this.api.yarnType().subscribe((res) => {
      this.allyarnType = res.types
    })

    this.getbuyers();

    this.EditAllData(this.singleId);
  }



  public getbuyers() {
    this.api.getbuyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }



  EditAllData(id: any) {
    this.api.getSingleYarnData(id).subscribe((res) => {
      this.yarn = res.yarn;
      this.yarnLcLines = res.yarn_lc_lines;
      this.yarnLcTotal = res.yarn_lc_total;
      this.yarnLotCheck = res.yarn_lot_check;
      this.yarnOrderAllocations = res.yarn_order_allocations;
      this.yarnQualityCheck = res.yarn_quality_check;
      this.yarnReceiptsLines = res.yarn_receipts_lines
      this.yarnlotcheckLotNo = res.lotNo
      this.yarnId = this.yarn[0].id

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

      receivedData.forEach((dataItem: any) => {
        const row = this.fb.group({
          id: dataItem.id,
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
    id: new FormControl(),
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

  })

  calculateDiff() {
    let LCYarnKgsTotal = 0;
    let LCValueTotal = 0;
    this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const LCYarnKgsValue = parseFloat(row.get('lcYarnKgs')?.value) || 0;
        const LCValueValue = parseFloat(row.get('yarnValue')?.value) || 0;
        LCYarnKgsTotal += LCYarnKgsValue;
        LCValueTotal += LCValueValue;
        
      }
    });
    this.yarnHeader.get('lcYarnKgs')?.setValue(LCYarnKgsTotal);
    this.yarnHeader.get('lcValue')?.setValue(LCValueTotal);
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

  add1button() {
    const row = this.fb.group({
      "id": new FormControl(''),
      "yarnType": new FormControl(''),
      "lcYarnKgs": new FormControl(''),
      "yarnRate": new FormControl(''),
      "yarnValue": new FormControl(''),
    });

    row.get('lcYarnKgs')?.valueChanges.subscribe(() => {
      this.calculateDiff5();
      this.calculateDiff();
    });

    row.get('yarnRate')?.valueChanges.subscribe(() => {
      this.calculateDiff5();
    });

    this.items.push(row);
  }

  Yarn_Entry_Delete(index: number) {

    let text = "Press Ok to delete the details";
    if (confirm(text) == true) {
      const yarnLinedelete = this.yarnLcLines[0].id;
      const yarnDataId = this.yarn[0].id
      console.log(yarnLinedelete, yarnDataId)
      this.api.YarnEntryDelete(yarnLinedelete, yarnDataId).subscribe((res) => {
        alert(res.message)
      })
    } else {
      alert("Cancelled");
    }
  }




  Yarn_Entry_save() {
    const yarnHeaderData = this.fb.group({
      id: this.yarnId,
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
    const yarnDataId = this.yarn[0].id

    this.api.yarnLineData(yarnDataId, this.yarnLineId).subscribe((res) => {
      this.lotYarnType = res.data[0]
    })

    this.api.lcDetailsForlot(yarnDataId, this.yarnLineId).subscribe((res) => {
      this.lotlineDetails = res.lcData

      const receivedData = this.lotlineDetails;

      const yarnEntryData = this.LotCheck.get('data') as FormArray;
      yarnEntryData.clear();

      receivedData.forEach((dataItem: any) => {
        const LotCheckDetails = this.fb.group({
          id: dataItem.id,
          yarnLineId: this.yarnLineId,
          yarnType: this.lotYarnType.yarnType,
          lotNo: dataItem.lotNo,
          sampleDate: this.datePipe.transform(dataItem.sampleDate, 'yyyy-MM-dd'),
          resultDate: this.datePipe.transform(dataItem.resultDate, 'yyyy-MM-dd'),
          checkResults: dataItem.checkResults,
          acceptRejectStatus: dataItem.acceptRejectStatus
        });
        yarnEntryData.push(LotCheckDetails);
      });
    })
    this.lotCheckModal = true;
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
      id: new FormControl(),
      yarnLineId: new FormControl(this.yarnLineId),
      yarnType: new FormControl(this.lotYarnType.yarnType),
      lotNo: new FormControl(),
      sampleDate: new FormControl(),
      resultDate: new FormControl(),
      checkResults: new FormControl(),
      acceptRejectStatus: new FormControl()
    });

    this.LotCheckItems.push(LotCheckDetails);
  }

  lotCheckDelete(index: any) {
    const yarnlotcheckdetails = this.lotlineDetails[index]?.id
    if(yarnlotcheckdetails){
    let text = "Press Ok to delete the details";
    if (confirm(text) == true) {
      const yarnDataId = this.yarn[0].id
      const yarnLineId = this.yarnLcLines[0].id;
      const yarnlotcheckdetails = this.lotlineDetails[index].id
      console.log(this.yarnLineId, yarnDataId, yarnlotcheckdetails)
      this.api.lotCheckDetailsDelete(yarnLineId, yarnDataId, yarnlotcheckdetails).subscribe((res) => {
        alert(res.message)

      })

    } else {
    alert("cancel!!!")
    }
  }else{
    this.LotCheckItems.removeAt(index)
  }
}

  LotCheck_Button() {
    this.api.addUpdateYarnCheck(this.LotCheck.value).subscribe((res) => {
      alert(res.message);
      window.location.reload()
    });
  }


  // <!------------------------------------Order Allocation----------------------------------------------------------------->

  orderAllotAddUpdate(index: any) {
    this.yarnLineId = this.yarnLcLines[index].id;
    this.OrderAllocation.controls['yarnId'].setValue(this.yarn[0].id);
    const yarnDataId = this.yarn[0].id
    this.api.yarnLineData(yarnDataId, this.yarnLineId).subscribe((res) => {
      this.yarnKg = res.data[0].lcYarnKgs
      this.lineDetails = res.data
    })

    this.api.lcDetailsForOrder(yarnDataId, this.yarnLineId).subscribe((res) => {
      this.orderDetails = res.lcData

      const receivedData = this.orderDetails;

      const yarnEntryData = this.OrderAllocation.get('data') as FormArray;
      yarnEntryData.clear();

      receivedData.forEach((dataItem: any) => {
        this.unallocatedYarnKgs = this.lineDetails[0].lcYarnKgs - dataItem.allocatedYarnKgs;

        const Row2 = this.fb.group({
          id: dataItem.id,
          yarnLineId: this.yarnLineId,
          yarnType: dataItem.yarnType,
          buyer: dataItem.buyer,
          utilisationOrderNo: dataItem.utilisationOrderNo,
          style: dataItem.style,
          colour: dataItem.colour,
          lotNo: dataItem.lotNo,
          allocatedYarnKgs: dataItem.allocatedYarnKgs,
          unallocatedYarnKgs: dataItem.unallocatedYarnKgs
        });
        yarnEntryData.push(Row2);
      });
    })
    this.getbuyers()
    this.orderAllocationModal = true;
  }

  getorders(buyer: any) {
    this.buyerName = buyer
    this.api.getorders(buyer).subscribe((res) => {
      this.orderNo = res.orders
    })
  }
  getstyle(order: any) {
    this.orderNumber = order
    this.api.getstyle(this.buyerName, order).subscribe((res) => {
      this.style = res.styles;
    })
  }

  getcolor(style: any) {
    this.api.getcolor(this.buyerName, this.orderNumber, style).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  getTotal(type: any) {
    this.api.yarnTotal(this.yarnorder_Id, type).subscribe((res) => {
      this.orderTotal = res.total[0].lctotal
    })
  }

  OrderAllocation = this.fb.group({
    yarnId: [],
    data: this.fb.array([]),
  })

  OrderAllocationAddButton() {
    const Row2 = this.fb.group({
      id: new FormControl(),
      yarnLineId: new FormControl(this.yarnLineId),
      lcNo: new FormControl(''),
      yarnType: new FormControl(this.lineDetails[0].yarnType),
      buyer: new FormControl(''),
      utilisationOrderNo: new FormControl(''),
      style: new FormControl(''),
      colour: new FormControl(''),
      lotNo: new FormControl(''),
      allocatedYarnKgs: new FormControl(''),
      unallocatedYarnKgs: new FormControl('')
    });

    Row2.get('allocatedYarnKgs')?.valueChanges.subscribe(() => {
      this.calculateDiff2();
    });

    this.items2.push(Row2);
  }

  calculateDiff2() {
    let lastUnallocatedYarnKgsArray: number[] = [this.yarnKg];
    let lastAllocatedYarnKgsControl: number[] = [];

    (this.OrderAllocation.get('data') as FormArray).controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const controls = Object.keys(row.controls);

        const lastControlName = controls[controls.length - 1];
        const AllocatedYarnKgs = controls[controls.length - 2];

        const lastControl = row.get(lastControlName);
        const AllocatedYarnKgsControl = row.get(AllocatedYarnKgs);

        let lastUnallocatedYarnKg = 0;
        let AllocatedYarnKgsvalue = 0;
        if (lastControl && AllocatedYarnKgsControl instanceof FormControl) {
          lastUnallocatedYarnKg = parseFloat(lastControl.value) || 0;
          AllocatedYarnKgsvalue = parseFloat(AllocatedYarnKgsControl.value) || 0;
        }
        lastUnallocatedYarnKgsArray.push(lastUnallocatedYarnKg);
        lastAllocatedYarnKgsControl.push(AllocatedYarnKgsvalue);


        const lastunallocatedYarnKgs = lastUnallocatedYarnKgsArray[lastUnallocatedYarnKgsArray.length - 2];
        const lastallocatedYarnKgs = lastAllocatedYarnKgsControl[lastAllocatedYarnKgsControl.length - 1];
        const unallocatedYarnKgs = lastunallocatedYarnKgs - lastallocatedYarnKgs;
        row.patchValue({ unallocatedYarnKgs });
      }
    });
  }


  get items2() {
    return this.OrderAllocation.get("data") as FormArray;
  }

  OrderAllocationDelete(index: number) {
    const orderid = this.orderDetails[index]?.id
if(orderid){
    let text = "Press Ok to delete the details";
    if (confirm(text) == true) {
      const yarnDataId = this.yarn[0].id
      const yarnLineId = this.yarnLcLines[0].id;
      const orderid = this.orderDetails[index].id
      this.api.OrderAllocationDeleteDetails(yarnDataId, yarnLineId, orderid).subscribe((res) => {
        alert(res.message)
      })
    } else {
      alert("Cancelled");
    }
  }else{
    this.items2.removeAt(index)
  }
}


  OrderAllocationSave() {
    this.api.addUpdateOrderAllocation(this.OrderAllocation.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }


  // <!-------------------------- Receipt --------------------------------------------------------------------------->

  orderId(index: any) {
    this.yarnOrderId = this.yarnOrderAllocations[index].id
    this.Receipttest = this.yarnOrderAllocations[index].allocatedYarnKgs
    this.receiptForm.controls['yarnId'].setValue(this.yarn[0].id);
    const yarnDataId = this.yarn[0].id
    this.api.lcDetailsForReceipt(yarnDataId, this.yarnOrderId).subscribe((res) => {
      const receivedData = res.lcData;
      this.ReceivedDataReceipt = res.lcData;

      const yarnEntryData = this.receiptForm.get('data') as FormArray;
      yarnEntryData.clear();

      receivedData.forEach((dataItem: any) => {
        const Row3 = this.fb.group({
          id: dataItem.id,
          yarnOrderId: this.yarnOrderId,
          spinningChallan: dataItem.spinningChallan,
          scandexChallan: dataItem.scandexChallan,
          receiptDt: this.datePipe.transform(dataItem.receiptDt, 'yyyy-MM-dd'),
          knitFactory: dataItem.knitFactory,
          BagsCtnNos: dataItem.BagsCtnNos,
          receiptYarnKgs: dataItem.receiptYarnKgs,
          pendingReceiptKgs: dataItem.pendingReceiptKgs ? dataItem.pendingReceiptKgs : this.Receipttest - dataItem.receiptYarnKgs
        });
        yarnEntryData.push(Row3);
      });
    })
    this.receiptModal = true
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
      id: new FormControl(),
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

    Row3.get('receiptYarnKgs')?.valueChanges.subscribe(() => {
      this.calculateDiff3();
    });
  }
  calculateDiff3() {
    let lastPendingReceipts: number[] = [this.Receipttest];
    let lastAllocatedYarnKgsControl: number[] = [];

    (this.receiptForm.get('data') as FormArray).controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const controls = Object.keys(row.controls);

        const lastControlName = controls[controls.length - 1];
        const AllocatedYarnKgs = controls[controls.length - 2];

        const lastControl = row.get(lastControlName);
        const AllocatedYarnKgsControl = row.get(AllocatedYarnKgs);

        let lastUnallocatedYarnKg = 0;
        let AllocatedYarnKgsvalue = 0;
        if (lastControl && AllocatedYarnKgsControl instanceof FormControl) {
          lastUnallocatedYarnKg = parseFloat(lastControl.value) || 0;
          AllocatedYarnKgsvalue = parseFloat(AllocatedYarnKgsControl.value) || 0;
        }
        lastPendingReceipts.push(lastUnallocatedYarnKg);
        lastAllocatedYarnKgsControl.push(AllocatedYarnKgsvalue);


        const lastunallocatedYarnKgs = lastPendingReceipts[lastPendingReceipts.length - 2];
        const lastallocatedYarnKgs = lastAllocatedYarnKgsControl[lastAllocatedYarnKgsControl.length - 1];
        const pendingReceiptKgs = lastunallocatedYarnKgs - lastallocatedYarnKgs;
        row.patchValue({ pendingReceiptKgs });
      }
    });
  }

  ReceiptDelete(index: number) {
    const ReceiptdetailsId = this.ReceivedDataReceipt[index]?.id
    if (parseInt(ReceiptdetailsId)) {
      let text = "Press Ok to delete the details";
      if (confirm(text) == true) {
        const yarnDataId = this.yarn[0].id
        const yarnOrderId = this.yarnOrderAllocations[0].id
        const ReceiptdetailsId = this.ReceivedDataReceipt[index].id
        
        this.api.ReceiptdetailsDelete(yarnDataId, yarnOrderId, ReceiptdetailsId).subscribe((res) => {
          alert(res.message)
        })
      } else {
        alert("Cancelled");
      }
    } else {
      this.items3.removeAt(index);
    }
  }

  receiptSave() {
    this.api.addUpdateYarnreceipt(this.receiptForm.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

  // <!----------------------------------------------------------------------------------------------------->

  receiptId(index: any) {
    this.QCindexvalue = index
    this.yarnreceiptId = this.yarnReceiptsLines[index].id
    const yarnId = this.yarn[0].id
    this.api.receiptDetailsForQc(yarnId, this.yarnreceiptId).subscribe((res) => {
      this.receiptDetails = res.receipt

      this.Yarn_QC.controls['yarnId'].setValue(this.yarn[0].id);

      const receivedData = res.yarnQc;
      this.ReceipReceivedDataId = res.yarnQc

      const yarnEntryData = this.Yarn_QC.get('data') as FormArray;
      yarnEntryData.clear();

      receivedData.forEach((dataItem: any) => {
        const Row4 = this.fb.group({
          id: dataItem.id,
          yarnReceiptId: this.yarnreceiptId,
          checkDate: this.datePipe.transform(dataItem.checkDate, 'yyyy-MM-dd'),
          checkResults: dataItem.checkResults,
          yarnAcceptRejectStatus: dataItem.yarnAcceptRejectStatus
        });
        yarnEntryData.push(Row4);
      });
    })
    this.yarnQcModal = true;
  }

  Yarn_QC = this.fb.group({
    yarnId: [],
    data: this.fb.array([]),

  })
  get items4() {
    return this.Yarn_QC.get("data") as FormArray;
  }
  YarnQCAddButton() {
    const Row4 = this.fb.group({
      id: new FormControl(),
      yarnReceiptId: new FormControl(this.yarnreceiptId),
      checkDate: new FormControl(''),
      checkResults: new FormControl(''),
      yarnAcceptRejectStatus: new FormControl(''),
    });

    this.items4.push(Row4);
  }

  YarnQCDelete(index: number) {
    const ReceipDataId = this.ReceipReceivedDataId[index]?.id

    if(ReceipDataId){
    let text = "Press Ok to delete the details";
    if (confirm(text) == true) {
      const yarnId = this.yarn[0].id
      const yarnreceiptId = this.yarnReceiptsLines[0].id
      const ReceipDataId = this.ReceipReceivedDataId[index].id
      this.api.YarnQCDeleteDetails(yarnId, yarnreceiptId, ReceipDataId).subscribe((res) => {
        alert(res.message)
      })
    } else {
      alert("Cancelled");
    }
  }else{
    this.items4.removeAt(index)
  }
}

  yarnQcSave() {
    this.api.addUpdateYarnQuality(this.Yarn_QC.value).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }

}

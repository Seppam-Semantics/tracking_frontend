import { DatePipe, DatePipeConfig } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-yarn-receipt',
  templateUrl: './yarn-receipt.component.html',
  styleUrls: ['./yarn-receipt.component.css']
})
export class YarnReceiptComponent implements OnInit{
  yarnOrderId: any;
  yarnOrderAllocations: any;
  Receipttest: any;
  yarn: any;
  ReceivedDataReceipt: any;
  receiptModal : boolean = false;
  loading4 : boolean = false;
  yarnreceiptId: any;
  QCindexvalue: any;
  yarnReceiptsLines: any;
  receiptDetails: any;
  ReceipReceivedDataId: any;
  yarnQcModal : boolean = false;
  loading5 : boolean = false;
  allYarn: any;
  factory : any;
  lcNo : any;
  yarnType : any;
  buyer : any;
  orderNo : any;
  style : any;
  color : any;
  lotNo : any;
  factorylist: any;
  lcNolist: any;
  yarntypelist: any;
  buyerslist: any;
  orderslist: any;
  styleslist: any;
  colorslist: any;
  lotNoslist: any;


  constructor(private api : ApiService, private fb : FormBuilder, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.api.getAllYarn().subscribe((res) => {
      this.allYarn = res.yarn
    })
    this.api.getYarnFactory().subscribe((res)=>{
      this.factorylist = res.yarnFactory
    })
  }

  getLcNo(factory : any){
    this.api.get_LcNo(factory).subscribe((res)=>{
      this.lcNolist = res.yarnlcno
    })
  }

  getyarnType(){
    this.api.get_yarnType(this.factory, this.lcNo).subscribe((res)=>{
      this.yarntypelist = res.yarnType
    })
  }

  getyarnBuyers(){
    this.api.get_yarn_buyer(this.factory, this.lcNo, this.yarnType).subscribe((res)=>{
      this.buyerslist=res.buyers
    })
  }

  getyarnorders(){
    this.api.get_yarn_order(this.factory, this.lcNo, this.yarnType, this.buyer).subscribe((res)=>{
      this.orderslist=res.orderNo
    })
  }

  getyarnstyles(){
    this.api.get_yarn_style(this.factory, this.lcNo, this.yarnType, this.buyer, this.orderNo).subscribe((res)=>{
      this.styleslist=res.styles
    })
  }

  getyarncolors(){
    this.api.get_yarn_color(this.factory, this.lcNo, this.yarnType, this.buyer, this.orderNo, this.style).subscribe((res)=>{
      this.colorslist=res.colors
    })
  }

  getyarnlotNos(){
    this.api.get_yarn_lotNo(this.factory, this.lcNo, this.yarnType, this.buyer, this.orderNo, this.style, this.color).subscribe((res)=>{
      this.lotNoslist=res.lotNos
    })
  }


  orderId() {
    this.api.getYarnReceipt(this.factory, this.lcNo, this.yarnType, this.buyer, this.orderNo, this.style, this.color, this.lotNo).subscribe((res)=>{
      // console.log(res)
      this.yarn = res.yarnId

    this.yarnOrderId = res.yarn_order[0].id
    this.Receipttest = res.yarn_order[0].allocatedYarnKgs
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
  })
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
    // const ReceiptdetailsId = this.ReceivedDataReceipt[index]?.id
    // if (parseInt(ReceiptdetailsId)) {
    //   let text = "Press Ok to delete the details";
    //   if (confirm(text) == true) {
    //     const yarnDataId = this.yarn[0].id
    //     const yarnOrderId = this.yarnOrderAllocations[0].id
    //     const ReceiptdetailsId = this.ReceivedDataReceipt[index].id
        
    //     this.api.ReceiptdetailsDelete(yarnDataId, yarnOrderId, ReceiptdetailsId).subscribe((res) => {
    //       alert(res.message)
    //     })
    //   } else {
    //     alert("Cancelled");
    //   }
    // } else {
    //   this.items3.removeAt(index);
    // }
    this.items3.removeAt(index);
  }

  receiptSave() {
    this.loading4=true;
    this.api.addUpdateYarnreceipt(this.receiptForm.value).subscribe((res) => {
      alert(res.message)
      this.loading4=false;
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
  //   const ReceipDataId = this.ReceipReceivedDataId[index]?.id

  //   if(ReceipDataId){
  //   let text = "Press Ok to delete the details";
  //   if (confirm(text) == true) {
  //     const yarnId = this.yarn[0].id
  //     const yarnreceiptId = this.yarnReceiptsLines[0].id
  //     const ReceipDataId = this.ReceipReceivedDataId[index].id
  //     this.api.YarnQCDeleteDetails(yarnId, yarnreceiptId, ReceipDataId).subscribe((res) => {
  //       alert(res.message)
  //     })
  //   } else {
  //     alert("Cancelled");
  //   }
  // }else{
  //   this.items4.removeAt(index)
  // }
  this.items4.removeAt(index)
}

  yarnQcSave() {
    this.loading5=true;
    this.api.addUpdateYarnQuality(this.Yarn_QC.value).subscribe((res) => {
      alert(res.message)
      this.loading5=false;
      window.location.reload()
    })
  }

}

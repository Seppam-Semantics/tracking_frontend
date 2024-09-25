import { DatePipe, DatePipeConfig } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdown } from 'primeng/dropdown';
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
  ftyName: any;
  spinChallan : any;
  scandexChallan : any;
  receiptDate : any;


  constructor(private api : ApiService, private fb : FormBuilder, private datePipe: DatePipe, private router : Router){}

  ngOnInit(): void {
    this.api.getAllYarn().subscribe((res) => {
      this.allYarn = res.yarn
    })
    this.api.getYarnFactory().subscribe((res)=>{
      this.factorylist = res.yarnFactory
    })

    this.factoryName()
  }


  factoryName() {
    this.api.KnitFty_master_Fillter_Data().subscribe((res)=>{
      this.ftyName = res.knitFty
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

  getyarnBuyers(index : any){
    const formArray = this.receiptForm.get('data') as FormArray;
    const currentRow = formArray.at(index);
    const yarn = currentRow.get('yarnType')?.value
    this.api.get_yarn_buyer(this.factory, this.lcNo, yarn).subscribe((res)=>{
      this.buyerslist=res.buyers
    })
  }

  getyarnorders(index : any){
    const formArray = this.receiptForm.get('data') as FormArray;
    const currentRow = formArray.at(index);
    const yarn = currentRow.get('yarnType')?.value;
    const buyer = currentRow.get('buyer')?.value;
    this.api.get_yarn_order(this.factory, this.lcNo, yarn, buyer).subscribe((res)=>{
      this.orderslist=res.orderNo
    })

    // this.api.orderForReceipt(this.factory, this.lcNo, yarn, buyer).subscribe((res)=>{
    //   this.orderslist=res.orderNo
    // })
  }

  getyarnstyles(index : any){
    const formArray = this.receiptForm.get('data') as FormArray;
    const currentRow = formArray.at(index);
    const yarn = currentRow.get('yarnType')?.value;
    const buyer = currentRow.get('buyer')?.value;
    const order = currentRow.get('orderNo')?.value;
    this.api.get_yarn_style(this.factory, this.lcNo, yarn, buyer, order).subscribe((res)=>{
      this.styleslist=res.styles
    })
  }

  getyarncolors(index : any){
    const formArray = this.receiptForm.get('data') as FormArray;
    const currentRow = formArray.at(index);
    const yarn = currentRow.get('yarnType')?.value;
    const buyer = currentRow.get('buyer')?.value;
    const order = currentRow.get('orderNo')?.value;
    const style = currentRow.get('style')?.value;
    this.api.get_yarn_color(this.factory, this.lcNo, yarn, buyer, order, style).subscribe((res)=>{
      this.colorslist=res.colors
    })
  }

  getyarnlotNos(index : any){
    const formArray = this.receiptForm.get('data') as FormArray;
    const currentRow = formArray.at(index);
    const yarn = currentRow.get('yarnType')?.value;
    const buyer = currentRow.get('buyer')?.value;
    const order = currentRow.get('orderNo')?.value;
    const style = currentRow.get('style')?.value;
    const color = currentRow.get('color')?.value;
    this.api.get_yarn_lotNo(this.factory, this.lcNo, yarn, buyer, order, style, color).subscribe((res)=>{
      this.lotNoslist=res.lotNos
    })
  }


  orderId(index : any) {
    const formArray = this.receiptForm.get('data') as FormArray;
    const currentRow = formArray.at(index);
    const yarn = currentRow.get('yarnType')?.value;
    const buyer = currentRow.get('buyer')?.value;
    const order = currentRow.get('orderNo')?.value;
    const style = currentRow.get('style')?.value;
    const color = currentRow.get('color')?.value;
    const lotNo = currentRow.get('lotNo')?.value;

    this.api.getYarnReceipt(this.factory, this.lcNo, yarn, buyer, order, style, color, lotNo).subscribe((res)=>{
    this.yarn = res.yarnId;
    this.yarnOrderId = res.yarn_order[0].id;
    this.Receipttest = res.yarn_order[0].allocatedYarnKgs;
    this.receiptForm.controls['yarnId'].setValue(this.yarn[0].id);
    const yarnDataId = this.yarn[0].id;

    this.api.lcDetailsForReceipt(yarnDataId, this.yarnOrderId).subscribe((res) => {
      const receivedData = res.lcData;
      this.ReceivedDataReceipt = res.lcData;

        currentRow.patchValue({
          id: receivedData[0]?.id ?? 0,
          yarnOrderId: this.yarnOrderId,
          yarnType : yarn,
          buyer : buyer,
          orderNo : order,
          style : style,
          color : color,
          lotNo : lotNo,
          allocatedKg : this.Receipttest,
          knitFactory: receivedData[0]?.knitFactory ?? '',
          BagsCtnNos: receivedData[0]?.BagsCtnNos ?? 0, 
          receiptYarnKgs: receivedData[0]?.receiptYarnKgs ?? 0,
          pendingReceiptKgs: receivedData[0]?.pendingReceiptKgs ? receivedData[0]?.pendingReceiptKgs : this.Receipttest - (receivedData[0]?.receiptYarnKgs ?? 0),
          spinningChallan : this.spinChallan,
          scandexChallan : this.scandexChallan,
          receiptDt : this.receiptDate
        });
    })
  })
  }

  pendingKg(index : any){
    const formArray = this.receiptForm.get('data') as FormArray;
    const currentRow = formArray.at(index);
    const yarn = currentRow.get('yarnType')?.value;
    const buyer = currentRow.get('buyer')?.value;
    const order = currentRow.get('orderNo')?.value;
    const style = currentRow.get('style')?.value;
    const color = currentRow.get('color')?.value;
    const lotNo = currentRow.get('lotNo')?.value;

    this.api.getYarnReceipt(this.factory, this.lcNo, yarn, buyer, order, style, color, lotNo).subscribe((res)=>{
    this.yarn = res.yarnId;
    this.yarnOrderId = res.yarn_order[0].id;
    this.Receipttest = res.yarn_order[0].allocatedYarnKgs;
    this.receiptForm.controls['yarnId'].setValue(this.yarn[0].id);
    const yarnDataId = this.yarn[0].id;

    const difference = this.Receipttest - (currentRow.get('receiptYarnKgs')?.value)
    currentRow.get('pendingReceiptKgs')?.setValue(difference)
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
      yarnType : new FormControl(''),
      buyer : new FormControl(''),
      orderNo : new FormControl(''),
      style : new FormControl(''),
      color : new FormControl(''),
      lotNo : new FormControl(''),
      allocatedKg : new FormControl(''),
      knitFactory : new FormControl(''),
      BagsCtnNos : new FormControl(''),
      receiptYarnKgs : new FormControl(''),
      pendingReceiptKgs : new FormControl(''),
      receiptDt : new FormControl(''),
      spinningChallan : new FormControl(''),
      scandexChallan : new FormControl('')
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
    // console.log(this.receiptForm.value)
    this.loading4=true;
    this.api.addUpdateYarnreceipt(this.receiptForm.value).subscribe((res) => {
      if(res.success){
        alert(res.message)
      this.loading4=false;
      window.location.reload()
      }
      else{
        alert(res.message)
      }
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


  @ViewChildren('yarn_type') yarn_type!: QueryList<Dropdown>;
  yarnlist(index: any) {
    if (this.yarn_type) {
      setTimeout(() => {
        const dropdownArray = this.yarn_type.toArray();
        if (dropdownArray[index]) {
          dropdownArray[index].show();
        }
      });
    } else { }
  }


  @ViewChildren('buyername') buyername!: QueryList<Dropdown>;
buyerlist(index: any) {
  if (this.buyername) {
    setTimeout(() => {
      const dropdownArray = this.buyername.toArray();
      if (dropdownArray[index]) {
        dropdownArray[index].show();
      }
    });
  } else { }
}

@ViewChildren('ordernumber') ordernumber!: QueryList<Dropdown>;
orderNoslist(index: any) {
  if (this.ordernumber) {
    setTimeout(() => {
      const dropdownArray = this.ordernumber.toArray();
      if (dropdownArray[index]) {
        dropdownArray[index].show();
      }
    });
  } else { }
}

@ViewChildren('styles') styles!: QueryList<Dropdown>;
stylelist(index: any) {
  if (this.styles) {
    setTimeout(() => {
      const dropdownArray = this.styles.toArray();
      if (dropdownArray[index]) {
        dropdownArray[index].show();
      }
    });
  } else { }
}

@ViewChildren('colors') colors!: QueryList<Dropdown>;
colorlist(index: any) {
  if (this.colors) {
    setTimeout(() => {
      const dropdownArray = this.colors.toArray();
      if (dropdownArray[index]) {
        dropdownArray[index].show();
      }
    });
  } else { }
}

@ViewChildren('lotNos') lotNos!: QueryList<Dropdown>;
lotNolist(index: any) {
  if (this.lotNos) {
    setTimeout(() => {
      const dropdownArray = this.lotNos.toArray();
      if (dropdownArray[index]) {
        dropdownArray[index].show();
      }
    });
  } else { }
}

@ViewChildren('knitFact') knitFact!: QueryList<Dropdown>;
knitFactorylist(index: any) {
  if (this.knitFact) {
    setTimeout(() => {
      const dropdownArray = this.knitFact.toArray();
      if (dropdownArray[index]) {
        dropdownArray[index].show();
      }
    });
  } else { }
}

back(){
  this.router.navigate(['/main/yarnReceiptReport']);
}

}

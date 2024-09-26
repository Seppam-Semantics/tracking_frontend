import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-yarn-receipt-report',
  templateUrl: './yarn-receipt-report.component.html',
  styleUrls: ['./yarn-receipt-report.component.css']
})
export class YarnReceiptReportComponent implements OnInit {
  data: any;
  factory : string = '';
  lcNo : string = '';
  ftyName: any;
  lcNolist: any;
  yarnfty: any;
  visible : boolean = false;
  yarnreceiptupdateform !: FormGroup;
  spinChallan: any;
  scandexChallan: any;
  receiptDate: any;
  singleReceiptDate: any;
  receiptId: any;
  toleranceValid : Boolean = false
  valueExceeded : boolean = false


  constructor(private router : Router, private api : ApiService, private fb : FormBuilder){
    this.yarnreceiptupdateform = this.fb.group({
      id : new FormControl(),
      yarnId : new FormControl(),
      factory : new FormControl(''),
      lcNo : new FormControl(''),
      yarnOrderId : new FormControl(),
      buyer : new FormControl(''),
      orderNo : new FormControl(''),
      style : new FormControl(''),
      colour : new FormControl(''),
      yarnType : new FormControl(''),
      allocatedKg : new FormControl(''),
      spinningChallan : new FormControl(''),
      scandexChallan : new FormControl(''), 
      receiptDt : new FormControl(''), 
      knitFactory : new FormControl(''), 
      BagsCtnNos : new FormControl(''), 
      receiptYarnKgs : new FormControl(''), 
      pendingReceiptKgs : new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.yarnReceiptFilter()
    this.factoryName()
    this.yarnFactory()
  }

  yarnFactory(){
     this.api.getYarnFactory().subscribe((res)=>{
        this.yarnfty = res.yarnFactory;
      })
  }

  factoryName() {
    this.api.KnitFty_master_Fillter_Data().subscribe((res)=>{
      this.ftyName = res.knitFty
    })
  }

  getLcNo(){
    this.api.get_LcNo(this.factory).subscribe((res)=>{
      this.lcNolist = res.yarnlcno
    })
  }

  yarnReceiptFilter(){
    this.api.getYarnReceiptReport(this.factory, this.lcNo).subscribe((res)=>{
      this.data = res.receipt
    })
  }

  newReceiptEntry(){
    this.router.navigate(['/main/yarn-receipt']);
  }

  edit(id : any){
    this.receiptId = id;
    this.api.getSingleYarnReceipt(id).subscribe((res)=>{
      if(res.success){
      this.visible = true
      this.singleReceiptDate = res.receipt[0]
      this.yarnreceiptupdateform.patchValue({
        id : res.receipt[0].id,
        yarnId : res.receipt[0].yarnId,
        factory : res.receipt[0].spinner,
        lcNo : res.receipt[0].lcNo,
        yarnOrderId : res.receipt[0].yarnOrderId,
        buyer : res.receipt[0].buyer,
        orderNo : res.receipt[0].utilisationOrderNo,
        style : res.receipt[0].style,
        colour : res.receipt[0].colour,
        yarnType : res.receipt[0].yarnType,
        allocatedKg : res.receipt[0].allocatedYarnKgs,
        spinningChallan : res.receipt[0].spinningChallan,
        scandexChallan : res.receipt[0].scandexChallan, 
        receiptDt : res.receipt[0].receiptDt, 
        knitFactory : res.receipt[0].knitFactory, 
        BagsCtnNos : res.receipt[0].BagsCtnNos, 
        receiptYarnKgs : res.receipt[0].receiptYarnKgs, 
        pendingReceiptKgs : res.receipt[0]?.pendingReceiptKgs ?? 0
      })
      if(res.receipt[0]?.pendingReceiptKgs == 0){
        this.yarnreceiptupdateform.get('pendingReceiptKgs')?.setValue(0)
      }
      }
    })
  }

  pending(receipt : any){
    const allocated = this.yarnreceiptupdateform.get('allocatedKg')?.value ?? 0
    const pending = allocated - receipt

    if(pending < 0){
      this.toleranceValid = true
    }
    else{
      this.yarnreceiptupdateform.get('pendingReceiptKgs')?.setValue(pending);
      this.toleranceValid = false
    }
    this.validlity()
  }

  validlity(){
    if(this.toleranceValid === true){
      this.valueExceeded = true;
    }
    else{
      this.valueExceeded = false;
    }
  }

  receiptupdate(){
    // console.log(this.yarnreceiptupdateform.value)
    if(this.yarnreceiptupdateform.valid){
      this.api.updateYarnReceipt(this.receiptId, this.yarnreceiptupdateform.value).subscribe((res)=>{
        alert(res.message)
      })
    }
    else{
      alert("Pending Value should not less than zero(0)")
    }
  }

}

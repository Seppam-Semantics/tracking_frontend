import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dye-batch-entry',
  templateUrl: './dye-batch-entry.component.html',
  styleUrls: ['./dye-batch-entry.component.css']
})
export class DyeBatchEntryComponent implements OnInit{
factoryname: any;
formArray!: FormArray;
dye_Entery!:FormGroup
fabricdetails: any

ordernumber:any
buyers: any;
buyerName: any
order: any;
ordernumbers:any
stylelist: any;
styleslist:any
colorlist: any;
colorslist:any
sizelist: any;
sizeslist:any
buyer: any;
orderNo:any;
style:any;
color:any;
size:any;
inputValue:any;
data: any;
fabrictype_dropdown: any;

constructor(private fb : FormBuilder , private api : ApiService , private router : Router){

  this.dye_Entery = new FormGroup({
    "id" : new FormControl(),
    "dyeFactory" : new FormControl(''),
  
    'buyer': new FormControl(''),
    'orderNo': new FormControl(''),
    "style": new FormControl(''),
    "color": new FormControl(''),
    
    "fabricType": new FormControl(''),
    "softner": new FormControl(''),
    "silicon": new FormControl(''),
    "enzyme": new FormControl(''),
    
    "batchNo": new FormControl(''),
    
    "batchRemarks": new FormControl(''),
  
    "batch_batchMakeDate": new FormControl(null),
    "batch_batchRollsSLCheck": new FormControl(''),
    
    "dyeing_loadDatetime": new FormControl(),
    "dyeing_unloadingDateTime": new FormControl(),
    "dyeing_totalRunTime": new FormControl(''),
    "dyeing_receipeChart": new FormControl(''),
    
    "shade_lapDipOriginalQTX": new FormControl(''),
    "shade_masterBatchCheck": new FormControl(''),
    "shade_dyeUnloadShadeCheck": new FormControl(''),
    "shade_shadeSubmissionDate": new FormControl(),
    "shade_shadeApprovalDate": new FormControl(),
    "shade_firstBatchNotOkReason": new FormControl(''),
    
    "squeezer_squeezerDateTime": new FormControl(),
    "squeezer_rpmValue": new FormControl(''),
    "squeezer_trolleyPlate": new FormControl(''),
    "squeezer_overfeedValue": new FormControl(''),
    "squeezer_padderPressureValue": new FormControl(''),
    "squeezer_shape": new FormControl(''),
    "squeezer_backAngle": new FormControl(''),
    
    "dryer_dryerDatetime": new FormControl(),
    "dryer_temperatureValue": new FormControl(''),
    "dryer_rpmValue": new FormControl(''),
    "dryer_overfeedValue": new FormControl(''),
    
    "calendar_rpmValue": new FormControl(''),
    "calendar_steamHighLow": new FormControl(''),
    
    "slitting_slittingDatetime": new FormControl(),
    "slitting_DTwister": new FormControl(''),
    "slitting_trolleyPlate": new FormControl(''),
    
    "stenter_stenterDatetime": new FormControl(),
    "stenter_temperatureValue": new FormControl(''),
    "stenter_overfeedValue": new FormControl(''),
    "stenter_diasettingValue": new FormControl(''),
    "stenter_softnerSiliconUsage": new FormControl(''),
    
    "compact_openCompactDatetime": new FormControl(),
    "compact_rpmValue": new FormControl(''),
    "compact_overfeedValue":new FormControl(''),
    "compact_diasettingValue": new FormControl(''),
    "compact_steamHighLow":new FormControl(''),
    
    "tubtex_tubtexDatetime": new FormControl(),
    "tubtex_yarnLot":new FormControl(''),
    "tubtex_overfeedValue": new FormControl(''),
    "tubtex_steamHighLow": new FormControl(''),
    "tubtex_rollerKnifeSetting":new FormControl(''),
    "tubtex_sideLoosePileCheck": new FormControl(''),
    "tubtex_diaGSMCheck": new FormControl(''),
    "tubtex_shadeLightBoxDataColor": new FormControl(''),
    
    "finalbatch_shrinkageTwistingReport":new FormControl(''),
    "finalbatch_GSMReport": new FormControl(''),
    "finalbatch_rollRollShadeCheck": new FormControl(''),
    "finalbatch_rubbingReportWetDry":new FormControl(''),
    "finalbatch_phReportInhouseCheck":new FormControl(''),
    "finalbatch_phenolicYellowingTest":new FormControl(''),
    "finalbatch_qcInspectionReport": new FormControl(''),
    "finalbatch_batchRollsWeight": new FormControl(''),
    "finalbatch_finishRollsWeight":new FormControl(''),
    "finalbatch_processLoss": new FormControl(''),
    "finalbatch_fabricDeliveryDatetime": new FormControl(),
    data: this.fb.array([]),
    "GriegeTotal" : new FormControl(''),
    "FinishTotal" : new FormControl(''),
    "differenceTotal" : new FormControl(''),
    "PLTotal" : new FormControl(''),
    
  })
  
}


//============================================================================================
ngOnInit(): void {
  this.getbuyers()
  this.api.dye_factory_name().subscribe((res)=>{
    this.factoryname=res.factorys
  })

  this.api.dye_fabrictype_dropdown().subscribe((res)=>{
    this.fabrictype_dropdown=res.buyers
  })
 
}



get items() {
  return this.dye_Entery.get('data') as FormArray
}


add() {
  const row = this.fb.group({
    size: new FormControl(''),
    woId:new FormControl(),
    griegerolls: new FormControl(''),    
    griege: new FormControl(''),
    finishrolls: new FormControl(''),
    finish: new FormControl(''),
    diff: new FormControl(''),
    PL: new FormControl(''),
  });

  row.get('griege')?.valueChanges.subscribe(() => {
    this.calculateDiff();
    this.calculateGriegeTotal();
  });

  row.get('finish')?.valueChanges.subscribe(() => {
    this.calculateDiff();
    this.calculateGriegeTotal();
  });

  this.items.push(row);
}

calculateDiff() {
  this.items.controls.forEach((control: AbstractControl) => {
    const row = control as FormGroup;
    if (row instanceof FormGroup) {
      const griegeValue = parseFloat(row.get('griege')?.value) || 0;
      const finishValue = parseFloat(row.get('finish')?.value) || 0;
      const diff = griegeValue - finishValue;
      const PLs = diff / griegeValue * 100;
      const PL = parseFloat(PLs.toFixed(2));

      row.patchValue({ diff, PL });
    }
  });
}

calculateGriegeTotal() {
  let total1 = 0;
  let total2 = 0;
  let total3 = 0;
  let total4 = 0;
  this.items.controls.forEach((control: AbstractControl) => {
    const row = control as FormGroup;
    if (row instanceof FormGroup) {
      const griegeValue = parseFloat(row.get('griege')?.value) || 0;
      total1 += griegeValue;

      const FinishTotal = parseFloat(row.get('finish')?.value) || 0;
      total2 += FinishTotal;

      const DiffTotal = parseFloat(row.get('diff')?.value) || 0;
      total3 += DiffTotal;

      const PLTotal = parseFloat(row.get('PL')?.value) || 0;
      total4 += PLTotal;
    }
  });
  this.dye_Entery.get('GriegeTotal')?.setValue(total1);
  this.dye_Entery.get('FinishTotal')?.setValue(total2);
  this.dye_Entery.get('differenceTotal')?.setValue(total3);
  this.dye_Entery.get('PLTotal')?.setValue(total4);
}
removeSize(index:any){
this.items.removeAt(index)
}

dyesubmit() {
  console.log(this.dye_Entery.value)
  this.api.post_dyereport_entry(this.dye_Entery.value).subscribe((res)=>{
    alert(res.message)    
    if(res.success== true){
      this.router.navigate(['/main/Dye-Report'])    
    }
  })
}

//==============================================================================



//=====================================================================================================
public getbuyers() {
  this.api.getbuyersData().subscribe((res) => {
    this.buyers = res.buyers;
  })
}

getorders(buyer: any) {
  this.api.getordersData(buyer).subscribe((res) => {
    this.order = res.orders
  })
}

getstyle(buyer: any, orderNo: any) {
  this.api.getstyleData(buyer, orderNo).subscribe((res) => {
    this.stylelist = res.styles;
  })
}

getcolor(buyer: any, orderNo: any, style: any) {
  this.api.getcolorData(buyer, orderNo, style).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

getsize(buyer: any, orderNo: any, style: any, color: any) {
  this.api.getsizeData(buyer, orderNo, style, color).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

loadworkorder(buyer: any, orderNo: string = '', style: string ='', color: string = '', size: string ='') {
  this.api.getwodetails(buyer, orderNo, style, color, size).subscribe((res) => {
    this.data = res.workorders;
  });
}

getwoId(size: any, index: number){
    this.api.getwodetails(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      console.log(woId);
      const formArray = this.dye_Entery.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('woId')?.setValue(woId);
    });
}

woByBuyer(){
  this.getorders(this.buyerName);
  this.loadworkorder(this.buyerName);
}
wobyOrder(){
  this.getstyle(this.buyerName, this.ordernumbers)
    this.loadworkorder(this.buyerName, this.ordernumbers);
}
wobystyle(){
  this.getcolor(this.buyerName, this.ordernumbers, this.styleslist)
    this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist);
}
wobycolor(){
  this.getsize(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist)
  this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist);
}
wobysize(){
  this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist, this.sizeslist);
}

clearAll(){
  this.buyerName = ''
  this.ordernumbers = ''
  this.styleslist = ''
  this.colorslist = ''
  this.sizeslist = ''
}

//=====================================================================================================

}

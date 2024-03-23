import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dye-batch-report',
  templateUrl: './dye-batch-report.component.html',
  styleUrls: ['./dye-batch-report.component.css']
})
export class DyeBatchReportComponent implements OnInit{
dyebatch_alldata: any;
formArray!: FormArray;
dye_Entery!:FormGroup
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
buyers:any;
data:any;
  factoryname: any;
  fabrictype_dropdown: any;
  singledataid: any;
  dye_batch_data_1: any;
  dye_batch_data_2: any;

ngOnInit(): void {
  this.getbuyers()
 this.dye_Entery = new FormGroup({
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
  
    "batch_batchMakeDate": new FormControl(''),
    "batch_batchRollsSLCheck": new FormControl(''),
    
    "dyeing_loadDatetime": new FormControl(''),
    "dyeing_unloadingDateTime": new FormControl(''),
    "dyeing_totalRunTime": new FormControl(''),
    "dyeing_receipeChart": new FormControl(''),
    
    "shade_lapDipOriginalQTX": new FormControl(''),
    "shade_masterBatchCheck": new FormControl(''),
    "shade_dyeUnloadShadeCheck": new FormControl(''),
    "shade_shadeSubmissionDate": new FormControl(''),
    "shade_shadeApprovalDate": new FormControl(''),
    "shade_firstBatchNotOkReason": new FormControl(''),
    
    "squeezer_squeezerDateTime": new FormControl(''),
    "squeezer_rpmValue": new FormControl(''),
    "squeezer_trolleyPlate": new FormControl(''),
    "squeezer_overfeedValue": new FormControl(''),
    "squeezer_padderPressureValue": new FormControl(''),
    "squeezer_shape": new FormControl(''),
    "squeezer_backAngle": new FormControl(''),
    
    "dryer_dryerDatetime": new FormControl(''),
    "dryer_temperatureValue": new FormControl(''),
    "dryer_rpmValue": new FormControl(''),
    "dryer_overfeedValue": new FormControl(''),
    
    "calendar_rpmValue": new FormControl(''),
    "calendar_steamHighLow": new FormControl(''),
    
    "slitting_slittingDatetime": new FormControl(''),
    "slitting_DTwister": new FormControl(''),
    "slitting_trolleyPlate": new FormControl(''),
    
    "stenter_stenterDatetime": new FormControl(''),
    "stenter_temperatureValue": new FormControl(''),
    "stenter_overfeedValue": new FormControl(''),
    "stenter_diasettingValue": new FormControl(''),
    "stenter_softnerSiliconUsage": new FormControl(''),
    
    "compact_openCompactDatetime": new FormControl(''),
    "compact_rpmValue": new FormControl(''),
    "compact_overfeedValue":new FormControl(''),
    "compact_diasettingValue": new FormControl(''),
    "compact_steamHighLow":new FormControl(''),
    
    "tubtex_tubtexDatetime": new FormControl(''),
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
    "finalbatch_fabricDeliveryDatetime": new FormControl(''),
    data: this.fb.array([])
    
  })
  for (let i = 0; i < 6; i++) {
    this.add();
  }
}




constructor(private api : ApiService ,private fb : FormBuilder ){
  this.api.dye_batch_all_data_().subscribe((res)=>{
    this.dyebatch_alldata = res.workorder
  })
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
  const newGroup = this.fb.group({
    size: new FormControl(''),
    griege: new FormControl(''),
    finish: new FormControl(''),
    diff: new FormControl(''),
    PL: new FormControl(''),
  });
  this.items.push(newGroup);
}

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

getid(id:any){
  this.singledataid = id
  this.api.dye_batch_single_data(this.singledataid).subscribe((res)=>{
    this.dye_batch_data_1 = res.headerData[0]
    this.dye_batch_data_2 = res.lineData
  })

  this.dye_Entery.patchValue({
    "dyeFactory" : this.dye_batch_data_1.dyeFactory,

    'buyer': this.dye_batch_data_1.buyer,
    'orderNo': this.dye_batch_data_1.orderNo,
    "style": this.dye_batch_data_1.style,
    "color": this.dye_batch_data_1.color,
    
    "fabricType": this.dye_batch_data_1.fabricType,
    "softner": this.dye_batch_data_1.softner,
    "silicon": this.dye_batch_data_1.silicon,
    "enzyme": this.dye_batch_data_1.enzyme,
    
    "batchNo": this.dye_batch_data_1.batchNo,

    "batchRemarks": this.dye_batch_data_1.batchRemarks,
    
    "batch_batchMakeDate": this.dye_batch_data_1.batch_batchMakeDate,
    "batch_batchRollsSLCheck": this.dye_batch_data_1.batch_batchRollsSLCheck,
    
    "dyeing_loadDatetime": this.dye_batch_data_1.dyeing_loadDatetime,
    "dyeing_unloadingDateTime": this.dye_batch_data_1.dyeing_unloadingDateTime,
    "dyeing_totalRunTime": this.dye_batch_data_1.dyeing_totalRunTime,
    "dyeing_receipeChart": this.dye_batch_data_1.dyeing_receipeChart,
    
    "shade_lapDipOriginalQTX": this.dye_batch_data_1.shade_lapDipOriginalQTX,
    "shade_masterBatchCheck": this.dye_batch_data_1.shade_masterBatchCheck,
    "shade_dyeUnloadShadeCheck": this.dye_batch_data_1.shade_dyeUnloadShadeCheck,
    "shade_shadeSubmissionDate": this.dye_batch_data_1.shade_shadeSubmissionDate,
    "shade_shadeApprovalDate": this.dye_batch_data_1.shade_shadeApprovalDate,
    "shade_firstBatchNotOkReason": this.dye_batch_data_1.shade_firstBatchNotOkReason,
    
    "squeezer_squeezerDateTime": this.dye_batch_data_1.squeezer_squeezerDateTime,
    "squeezer_rpmValue": this.dye_batch_data_1.squeezer_rpmValue,
    "squeezer_trolleyPlate": this.dye_batch_data_1.squeezer_trolleyPlate,
    "squeezer_overfeedValue": this.dye_batch_data_1.squeezer_overfeedValue,
    "squeezer_padderPressureValue": this.dye_batch_data_1.squeezer_padderPressureValue,
    "squeezer_shape": this.dye_batch_data_1.squeezer_shape,
    "squeezer_backAngle": this.dye_batch_data_1.squeezer_backAngle,
    
    "dryer_dryerDatetime": this.dye_batch_data_1.dryer_dryerDatetime,
    "dryer_temperatureValue": this.dye_batch_data_1.dryer_temperatureValue,
    "dryer_rpmValue": this.dye_batch_data_1.dryer_rpmValue,
    "dryer_overfeedValue": this.dye_batch_data_1.dryer_overfeedValue,
    
    "calendar_rpmValue": this.dye_batch_data_1.calendar_rpmValue,
    "calendar_steamHighLow": this.dye_batch_data_1.calendar_steamHighLow,
    
    "slitting_slittingDatetime": this.dye_batch_data_1.slitting_slittingDatetime,
    "slitting_DTwister": this.dye_batch_data_1.slitting_DTwister,
    "slitting_trolleyPlate": this.dye_batch_data_1.slitting_trolleyPlate,
    
    "stenter_stenterDatetime": this.dye_batch_data_1.stenter_stenterDatetime,
    "stenter_temperatureValue": this.dye_batch_data_1.stenter_temperatureValue,
    "stenter_overfeedValue": this.dye_batch_data_1.stenter_overfeedValue,
    "stenter_diasettingValue": this.dye_batch_data_1.stenter_diasettingValue,
    "stenter_softnerSiliconUsage": this.dye_batch_data_1.stenter_softnerSiliconUsage,
    
    "compact_openCompactDatetime": this.dye_batch_data_1.compact_openCompactDatetime,
    "compact_rpmValue": this.dye_batch_data_1.compact_rpmValue,
    "compact_overfeedValue": this.dye_batch_data_1.compact_overfeedValue,
    "compact_diasettingValue": this.dye_batch_data_1.compact_diasettingValue,
    "compact_steamHighLow": this.dye_batch_data_1.compact_steamHighLow,
    
    "tubtex_tubtexDatetime": this.dye_batch_data_1.tubtex_tubtexDatetime,
    "tubtex_yarnLot": this.dye_batch_data_1.tubtex_yarnLot,
    "tubtex_overfeedValue": this.dye_batch_data_1.tubtex_overfeedValue,
    "tubtex_steamHighLow": this.dye_batch_data_1.tubtex_steamHighLow,
    "tubtex_rollerKnifeSetting": this.dye_batch_data_1.tubtex_rollerKnifeSetting,
    "tubtex_sideLoosePileCheck": this.dye_batch_data_1.tubtex_sideLoosePileCheck,
    "tubtex_diaGSMCheck": this.dye_batch_data_1.tubtex_diaGSMCheck,
    "tubtex_shadeLightBoxDataColor": this.dye_batch_data_1.tubtex_shadeLightBoxDataColor,
    
    "finalbatch_shrinkageTwistingReport": this.dye_batch_data_1.finalbatch_shrinkageTwistingReport,
    "finalbatch_GSMReport": this.dye_batch_data_1.finalbatch_GSMReport,
    "finalbatch_rollRollShadeCheck": this.dye_batch_data_1.finalbatch_rollRollShadeCheck,
    "finalbatch_rubbingReportWetDry": this.dye_batch_data_1.finalbatch_rubbingReportWetDry,
    "finalbatch_phReportInhouseCheck": this.dye_batch_data_1.finalbatch_phReportInhouseCheck,
    "finalbatch_phenolicYellowingTest": this.dye_batch_data_1.finalbatch_phenolicYellowingTest,
    "finalbatch_qcInspectionReport": this.dye_batch_data_1.finalbatch_qcInspectionReport,
    "finalbatch_batchRollsWeight": this.dye_batch_data_1.finalbatch_batchRollsWeight,
    "finalbatch_finishRollsWeight": this.dye_batch_data_1.finalbatch_finishRollsWeight,
    "finalbatch_processLoss": this.dye_batch_data_1.finalbatch_processLoss,
    "finalbatch_fabricDeliveryDatetime":this.dye_batch_data_1.finalbatch_fabricDeliveryDatetime,
  })
}

}

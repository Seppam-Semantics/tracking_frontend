import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dye-batch-report',
  templateUrl: './dye-batch-report.component.html',
  styleUrls: ['./dye-batch-report.component.css']
})
export class DyeBatchReportComponent implements OnInit {
  dyebatch_alldata: any;
  formArray!: FormArray;
  dye_Entery!: FormGroup
  buyerName: any
  order: any;
  ordernumbers: any
  stylelist: any;
  styleslist: any
  colorlist: any;
  colorslist: any
  sizelist: any;
  sizeslist: any
  buyer: any;
  orderNo: any;
  style: any;
  color: any;
  size: any;
  buyers: any;
  data: any;
  factoryname: any;
  fabrictype_dropdown: any;
  singledataid: any;
  dye_batch_data_1: any;
  dye_batch_data_2: any;
  dye_batch_data: any;




  constructor(private api: ApiService, private fb: FormBuilder, private datePipe: DatePipe , private router : Router) {
    this.dye_Entery = new FormGroup({
      "id" : new FormControl(''),
      "dyeFactory": new FormControl(''),

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
      "compact_overfeedValue": new FormControl(''),
      "compact_diasettingValue": new FormControl(''),
      "compact_steamHighLow": new FormControl(''),

      "tubtex_tubtexDatetime": new FormControl(''),
      "tubtex_yarnLot": new FormControl(''),
      "tubtex_overfeedValue": new FormControl(''),
      "tubtex_steamHighLow": new FormControl(''),
      "tubtex_rollerKnifeSetting": new FormControl(''),
      "tubtex_sideLoosePileCheck": new FormControl(''),
      "tubtex_diaGSMCheck": new FormControl(''),
      "tubtex_shadeLightBoxDataColor": new FormControl(''),

      "finalbatch_shrinkageTwistingReport": new FormControl(''),
      "finalbatch_GSMReport": new FormControl(''),
      "finalbatch_rollRollShadeCheck": new FormControl(''),
      "finalbatch_rubbingReportWetDry": new FormControl(''),
      "finalbatch_phReportInhouseCheck": new FormControl(''),
      "finalbatch_phenolicYellowingTest": new FormControl(''),
      "finalbatch_qcInspectionReport": new FormControl(''),
      "finalbatch_batchRollsWeight": new FormControl(''),
      "finalbatch_finishRollsWeight": new FormControl(''),
      "finalbatch_processLoss": new FormControl(''),
      "finalbatch_fabricDeliveryDatetime": new FormControl(''),
      GriegeTotal : new FormControl(''),
      FinishTotal : new FormControl(''),
      differenceTotal : new FormControl(''),
      PLTotal : new FormControl(''),
      data: this.fb.array([])

    })
    for (let i = 0; i < 6; i++) {
      this.add();
    }
  }

  ngOnInit(): void {

    this.api.dye_factory_name().subscribe((res)=>{
      this.factoryname=res.factorys
    })

    this.api.dyeBatchAllData().subscribe((res) => {
      this.dyebatch_alldata = res.workorders
    })

    this.getbuyers()

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

    newGroup.get('griege')?.valueChanges.subscribe(() => {
      this.calculateDiff();
      this.calculateGriegeTotal();
    });
  
    newGroup.get('finish')?.valueChanges.subscribe(() => {
      this.calculateDiff();
      this.calculateGriegeTotal();
    });
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

  loadworkorder(buyer: any, orderNo: string = '', style: string = '', color: string = '', size: string = '') {
    this.api.getwodetails(buyer, orderNo, style, color, size).subscribe((res) => {
      this.data = res.workorders;
    });
  }

  woByBuyer() {
    this.getorders(this.buyerName);
    this.loadworkorder(this.buyerName);
  }
  wobyOrder() {
    this.getstyle(this.buyerName, this.ordernumbers)
    this.loadworkorder(this.buyerName, this.ordernumbers);
  }
  wobystyle() {
    this.getcolor(this.buyerName, this.ordernumbers, this.styleslist)
    this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist);
  }
  wobycolor() {
    this.getsize(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist)
    this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist);
  }
  wobysize() {
    this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist, this.sizeslist);
  }

  clearAll() {
    this.buyerName = ''
    this.ordernumbers = ''
    this.styleslist = ''
    this.colorslist = ''
    this.sizeslist = ''
  }

  //=====================================================================================================

  getid(id: any) {
    this.singledataid = id
    this.api.dye_batch_single_data(this.singledataid).subscribe((res) => {
      this.dye_batch_data = res
    const formattedDate1 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].batch_batchMakeDate,
    'yyyy-MM-dd'
  );
    const formattedDate2 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].dyeing_loadDatetime,
      'yyyy-MM-dd'
    );
    const formattedDate3 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].dyeing_unloadingDateTime,
      'yyyy-MM-dd'
    );
    const formattedDate4 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].shade_shadeSubmissionDate,
      'yyyy-MM-dd'
    );
    const formattedDate5 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].shade_shadeApprovalDate,
      'yyyy-MM-dd'
    );
    const formattedDate6 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].squeezer_squeezerDateTime,
      'yyyy-MM-dd'
    );
    const formattedDate7 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].dryer_dryerDatetime,
      'yyyy-MM-dd'
    );
    const formattedDate8 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].slitting_slittingDatetime,
      'yyyy-MM-dd'
    );
    const formattedDate9 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].stenter_stenterDatetime,
      'yyyy-MM-dd'
    );
    const formattedDate10 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].compact_openCompactDatetime,
      'yyyy-MM-dd'
    );
    const formattedDate11 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].tubtex_tubtexDatetime,
      'yyyy-MM-dd'
    );
    const formattedDate12 = this.datePipe.transform(
      this.dye_batch_data.headerData[0].finalbatch_fabricDeliveryDatetime,
      'yyyy-MM-dd'
    );

    this.dye_Entery.patchValue({
      "id":this.dye_batch_data.headerData[0].id,
      "dyeFactory": this.dye_batch_data.headerData[0].dyeFactory,

      'buyer': this.dye_batch_data.headerData[0].buyer,
      'orderNo': this.dye_batch_data.headerData[0].orderNo,
      "style": this.dye_batch_data.headerData[0].style,
      "color": this.dye_batch_data.headerData[0].color,

      "fabricType": this.dye_batch_data.headerData[0].fabricType,
      "softner": this.dye_batch_data.headerData[0].softner,
      "silicon": this.dye_batch_data.headerData[0].silicon,
      "enzyme": this.dye_batch_data.headerData[0].enzyme,

      "batchNo": this.dye_batch_data.headerData[0].batchNo,

      "batchRemarks": this.dye_batch_data.headerData[0].batchRemarks,

      "batch_batchMakeDate": formattedDate1,
      "batch_batchRollsSLCheck": this.dye_batch_data.headerData[0].batch_batchRollsSLCheck,

      "dyeing_loadDatetime": formattedDate2,
      "dyeing_unloadingDateTime": formattedDate3,
      "dyeing_totalRunTime": this.dye_batch_data.headerData[0].dyeing_totalRunTime,
      "dyeing_receipeChart": this.dye_batch_data.headerData[0].dyeing_receipeChart,

      "shade_lapDipOriginalQTX": this.dye_batch_data.headerData[0].shade_lapDipOriginalQTX,
      "shade_masterBatchCheck": this.dye_batch_data.headerData[0].shade_masterBatchCheck,
      "shade_dyeUnloadShadeCheck": this.dye_batch_data.headerData[0].shade_dyeUnloadShadeCheck,
      "shade_shadeSubmissionDate": formattedDate4,
      "shade_shadeApprovalDate": formattedDate5,
      "shade_firstBatchNotOkReason": this.dye_batch_data.headerData[0].shade_firstBatchNotOkReason,

      "squeezer_squeezerDateTime": formattedDate6,
      "squeezer_rpmValue": this.dye_batch_data.headerData[0].squeezer_rpmValue,
      "squeezer_trolleyPlate": this.dye_batch_data.headerData[0].squeezer_trolleyPlate,
      "squeezer_overfeedValue": this.dye_batch_data.headerData[0].squeezer_overfeedValue,
      "squeezer_padderPressureValue": this.dye_batch_data.headerData[0].squeezer_padderPressureValue,
      "squeezer_shape": this.dye_batch_data.headerData[0].squeezer_shape,
      "squeezer_backAngle": this.dye_batch_data.headerData[0].squeezer_backAngle,

      "dryer_dryerDatetime": formattedDate7,
      "dryer_temperatureValue": this.dye_batch_data.headerData[0].dryer_temperatureValue,
      "dryer_rpmValue": this.dye_batch_data.headerData[0].dryer_rpmValue,
      "dryer_overfeedValue": this.dye_batch_data.headerData[0].dryer_overfeedValue,

      "calendar_rpmValue": this.dye_batch_data.headerData[0].calendar_rpmValue,
      "calendar_steamHighLow": this.dye_batch_data.headerData[0].calendar_steamHighLow,

      "slitting_slittingDatetime": formattedDate8,
      "slitting_DTwister": this.dye_batch_data.headerData[0].slitting_DTwister,
      "slitting_trolleyPlate": this.dye_batch_data.headerData[0].slitting_trolleyPlate,

      "stenter_stenterDatetime": formattedDate9,
      "stenter_temperatureValue": this.dye_batch_data.headerData[0].stenter_temperatureValue,
      "stenter_overfeedValue": this.dye_batch_data.headerData[0].stenter_overfeedValue,
      "stenter_diasettingValue": this.dye_batch_data.headerData[0].stenter_diasettingValue,
      "stenter_softnerSiliconUsage": this.dye_batch_data.headerData[0].stenter_softnerSiliconUsage,

      "compact_openCompactDatetime": formattedDate10,
      "compact_rpmValue": this.dye_batch_data.headerData[0].compact_rpmValue,
      "compact_overfeedValue": this.dye_batch_data.headerData[0].compact_overfeedValue,
      "compact_diasettingValue": this.dye_batch_data.headerData[0].compact_diasettingValue,
      "compact_steamHighLow": this.dye_batch_data.headerData[0].compact_steamHighLow,

      "tubtex_tubtexDatetime": formattedDate11,
      "tubtex_yarnLot": this.dye_batch_data.headerData[0].tubtex_yarnLot,
      "tubtex_overfeedValue": this.dye_batch_data.headerData[0].tubtex_overfeedValue,
      "tubtex_steamHighLow": this.dye_batch_data.headerData[0].tubtex_steamHighLow,
      "tubtex_rollerKnifeSetting": this.dye_batch_data.headerData[0].tubtex_rollerKnifeSetting,
      "tubtex_sideLoosePileCheck": this.dye_batch_data.headerData[0].tubtex_sideLoosePileCheck,
      "tubtex_diaGSMCheck": this.dye_batch_data.headerData[0].tubtex_diaGSMCheck,
      "tubtex_shadeLightBoxDataColor": this.dye_batch_data.headerData[0].tubtex_shadeLightBoxDataColor,

      "finalbatch_shrinkageTwistingReport": this.dye_batch_data.headerData[0].finalbatch_shrinkageTwistingReport,
      "finalbatch_GSMReport": this.dye_batch_data.headerData[0].finalbatch_GSMReport,
      "finalbatch_rollRollShadeCheck": this.dye_batch_data.headerData[0].finalbatch_rollRollShadeCheck,
      "finalbatch_rubbingReportWetDry": this.dye_batch_data.headerData[0].finalbatch_rubbingReportWetDry,
      "finalbatch_phReportInhouseCheck": this.dye_batch_data.headerData[0].finalbatch_phReportInhouseCheck,
      "finalbatch_phenolicYellowingTest": this.dye_batch_data.headerData[0].finalbatch_phenolicYellowingTest,
      "finalbatch_qcInspectionReport": this.dye_batch_data.headerData[0].finalbatch_qcInspectionReport,
      "finalbatch_batchRollsWeight": this.dye_batch_data.headerData[0].finalbatch_batchRollsWeight,
      "finalbatch_finishRollsWeight": this.dye_batch_data.headerData[0].finalbatch_finishRollsWeight,
      "finalbatch_processLoss": this.dye_batch_data.headerData[0].finalbatch_processLoss,
      "finalbatch_fabricDeliveryDatetime": formattedDate12,
    })

    const formControls = [];
    formControls.push(
      this.fb.group({
        size: [''],
        griege: [''],
        finish: [''],
        difference: [''],
        PL: [''],
      })
    );

    const dataControl = this.dye_Entery.get('data') as FormArray;
    if (!dataControl.controls.length) { 
      const formControls = this.dye_batch_data.lineData.map((lineItem: any) => {
        return this.fb.group({
          size: [lineItem.size],
          griege: [lineItem.griege],
          finish: [lineItem.finish],
          difference: [lineItem.difference],
          PL: [lineItem.PL],
        });
      });
    
      this.dye_Entery.setControl('data', this.fb.array(formControls));
    } else {
      this.dye_batch_data.lineData.forEach((lineItem: any, i: number) => {
        this.items.at(i).patchValue({
          size: lineItem.size,
          griege: lineItem.griege,
          finish: lineItem.finish,
          difference: lineItem.difference,
          PL: lineItem.PL,
        });
      });
    
    }
  })
  };

  delect(id:any){
    this.api.DyeBatchDelect(id).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }

  update(){
    this.api.post_dyereport_entry(this.dye_Entery.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }
  DyeBatchButton(){
    this.router.navigate(['/DyeBatchEntry'])
  }
}
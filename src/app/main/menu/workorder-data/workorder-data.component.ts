import { Component, NgModule, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api.service';
import * as xls from 'xlsx'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-workorder-data',
  templateUrl: './workorder-data.component.html',
  styleUrls: ['./workorder-data.component.css']
})
export class WorkorderDataComponent implements OnInit {
  Buyer_Value: any;
  buyersDta: any;
  orderNoDta: any;
  Order_Value: any;
  styleDta: any;
  style_Value: any;
  colorDta: any;
  color_Value: any;
  sizeDta: string = '';
  size_Value: any;
  sizeid: any;
  fsizeDta: any;
  fsize_Value: any;
  fabricstypedta: any;
  fabdiaDta: any;
  fabGsmDta: any;
  fabdia_Value: any;
  FabGsm_Value: any;
  spinftydta: any;
  knitFtydta: any;
  dyeFtydta: any;
  yarntypedta: any;
  finishfabConsumptionDta: any;
  poid: any;
  polineId: any;
  BuyerCrationPopup: boolean = true;
  GSize: any;
  GSizeFBC: any;
  fabricTypeFBC: any;
  fabricGSMFBC: any;
  yarnTypeFBC: any;
  FSizeFBC: any;
  finishDiaFBC: any;
  rejloss: any;
  PODetailsLossValue: any;
  DyeProcessLossValue: any;
  sizeDtaid: any;
  SizeIdDta: any;
  fabrictypeId_Value: any;
  dyetypedta: any;
  dyeTypeFBC: any;
  dyetypeId_Value: any;
  styleIdDta: any;
  DyeTypeLossDta: any;
  fabTypeLossDta: any;
  FSizeFBCId: any;
  fabricTypeFBCId: any;
  fabricGSMFBCId: any;
  yarnTypeFBCId: any;
  finishDiaFBCId: any;
  dyeTypeFBCId: any;
  SpinFty_Id: any;
  SpinFty_Name: any;
  SpinFtyId_Value: any;
  KnitFty_Name: any;
  KnitFtyId_Value: any;
  DyeinFty_Name: any;
  DyeinFtyId_Value: any;
  data: any;
  concatSizeDta: any;
  FsizeidId_Value: any;


  ngOnInit(): void {
    this.buyerdata()

    this.api.fabric_type_BO().subscribe((res) => {
      this.fabricstypedta = res.fabricstype
    })

    this.api.Spin_Fty_BO().subscribe((res) => {
      this.spinftydta = res.SpinFty

    })

    this.api.Knit_Fty_BO().subscribe((res) => {
      this.knitFtydta = res.knitFty

    })

    this.api.Dyein_Fty_BO().subscribe((res) => {
      this.dyeFtydta = res.dyeFty
    })

    this.api.yarn_type_BO().subscribe((res) => {
      this.yarntypedta = res.yarntype
    })

    this.api.dye_Type_BO().subscribe((res) => {
      this.dyetypedta = res.dyeType
    })
  }

  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) { }

  buyervalue() {
    // const formArray = this.buyerorderform.get('data') as FormArray;
    // const row = formArray.at(index);
    // this.Buyer_Value = row.get('Buyer')?.value;

    this.buyerdata()

  }
  ordervalue(index: any) {
    // this.Order_Value = event.target.value
    const formArray = this.buyerorderform.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = this.buyerorderform.get('Buyer')?.value;
    this.Order_Value = this.buyerorderform.get('OrderNo')?.value;
    this.orderdata()
  }

  buyerdata() {
    this.Buyer_Value = this.buyerorderform.get('Buyer')?.value;
    this.api.Buyer_to_order(this.Buyer_Value).subscribe((res) => {
      this.buyersDta = res.buyers
      this.orderNoDta = res.orderNo
    })
  }

  orderdata() {

    this.Buyer_Value = this.buyerorderform.get('Buyer')?.value;
    this.Order_Value = this.buyerorderform.get('OrderNo')?.value;
    this.api.order_to_style(this.Buyer_Value, this.Order_Value).subscribe((res) => {
      this.styleDta = res.style
    })
  }

  stylevalue(index: any) {
    const formArray = this.buyerorderform.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = this.buyerorderform.get('Buyer')?.value;
    this.Order_Value = this.buyerorderform.get('OrderNo')?.value;
    this.style_Value = row.get('Style')?.value;

    this.styledata()
  }

  styledata() {
    this.api.style_to_color(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
      this.colorDta = res.color
    })
    this.api.Gsize_BO(this.style_Value).subscribe((res) => {
      this.concatSizeDta = res.Gsize
      // console.log(this.concatSizeDta)
    })
  }

  colorvalue(index: any) {
    const formArray = this.buyerorderform.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = this.buyerorderform.get('Buyer')?.value;
    this.Order_Value = this.buyerorderform.get('OrderNo')?.value;
    this.style_Value = row.get('Style')?.value;
    this.color_Value = row.get('Color')?.value;

    this.colordata()
    // this.color_Value = event.target.value
    this.RejTypeLoss(index)
    this.colorprocessloss(index)
  }


  colordata() {
    // this.api.color_to_size(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
    //   this.sizeDta = res.size
    // })

  }

  SpinFtyIdvalue(event: any, index: any) {
    this.SpinFty_Name = event.target.value

    const selectedFabric = this.spinftydta.find((SpinFty: { SpinFtyName: any; }) => SpinFty.SpinFtyName === this.SpinFty_Name);

    if (selectedFabric) {
      this.SpinFtyId_Value = selectedFabric.id;

      const formArray = this.buyerorderform.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('SpinFtyId')?.setValue(this.SpinFtyId_Value);
    } else {
      console.error('No matching fabric type found for the selected value');
    }
  }

  KnitFtyIdvalue(event: any, index: any) {
    this.KnitFty_Name = event.target.value
    const selectedFabric = this.knitFtydta.find((knitFty: { knitFty: any; }) => knitFty.knitFty === this.KnitFty_Name);
    if (selectedFabric) {
      this.KnitFtyId_Value = selectedFabric.id;
      const formArray = this.buyerorderform.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('KnitFtyId')?.setValue(this.KnitFtyId_Value);

    } else {
      console.error('No matching fabric type found for the selected value');
    }
  }

  DyeinFtyIdvalue(event: any, index: any) {
    this.DyeinFty_Name = event.target.value
    const selectedFabric = this.dyeFtydta.find((DyeinFty: { dyeFty: any; }) => DyeinFty.dyeFty === this.DyeinFty_Name);
    if (selectedFabric) {
      this.DyeinFtyId_Value = selectedFabric.id;

      const formArray = this.buyerorderform.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('DyeinFtyId')?.setValue(this.DyeinFtyId_Value);

    } else {
      console.error('No matching fabric type found for the selected value');
    }
  }

  RejTypeLoss(index: any) {
    this.api.RejTypeLoss_BO(this.color_Value).subscribe((res) => {
      this.rejloss = res.Colorlosses[0].losses

      const formArray = this.buyerorderform.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('rejlosses')?.setValue(this.rejloss);
    })
  }

  PODetailsLoss(index: any) {

    this.api.PODetailsLoss_BO(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, this.sizeDta).subscribe((res) => {

      this.PODetailsLossValue = res.Colorlosses[0].popl
      const formArray = this.buyerorderform.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('PODetailsLoss')?.setValue(this.PODetailsLossValue);
    })
  }

  colorprocessloss(index: any) {
    this.api.ColorLoss_BO(this.color_Value).subscribe((res) => {
      this.DyeProcessLossValue = res.DyeProcessLoss[0].DyeProcessLoss
    })
  }


  fsizedata(index: any , event:any) {
    this.fsize_Value = event.target.value

    this.api.Fsize_to_Gsize(this.style_Value,this.fsize_Value).subscribe((res) => {
      this.sizeDta = res.Gsize[0]?.size;
      const formArray = this.buyerorderform.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('Size')?.setValue(this.sizeDta);
      this.fsizevalue(index, this.sizeDta)
    })

  }


  fsizevalue(index: any, size : any) {
    // this.fsize_Value = event.target.value
    const formArray = this.buyerorderform.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = this.buyerorderform.get('Buyer')?.value;
    this.Order_Value = this.buyerorderform.get('OrderNo')?.value;
    this.style_Value = row.get('Style')?.value;
    this.color_Value = row.get('Color')?.value;
    this.size_Value = size
    this.sizedata(index)
    this.PODetailsLoss(index)
  }

  sizevalue(index: any) {
    // this.sizedata(index)
    // this.PODetailsLoss(index)
  }

  sizedata(index : any) {
    // console.log(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, this.size_Value)
    this.api.size_to_id(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, this.size_Value).subscribe((res) => {

      this.polineId = res.sizeId[0]?.id ? res.sizeId[0]?.id : ''
  
      this.poid = res.sizeId[0]?.orderId ? res.sizeId[0]?.orderId : ''
      this.FSizeFBC = res.sizeId[0]?.concatSize ? res.sizeId[0]?.concatSize : ''
      this.FSizeFBCId = res.sizeId[0]?.concatSizeId
      this.fabricTypeFBC = res.sizeId[0]?.fabricType ? res.sizeId[0]?.fabricType : ''
      this.fabricTypeFBCId = res.sizeId[0]?.fabricTypeId ? res.sizeId[0]?.fabricTypeId : ''
      this.fabricGSMFBC = res.sizeId[0]?.fabricGSM ? res.sizeId[0]?.fabricGSM : ''
      this.fabricGSMFBCId = res.sizeId[0]?.fabricGSMId ? res.sizeId[0]?.fabricGSMId : ''
      this.yarnTypeFBC = res.sizeId[0]?.yarnType ? res.sizeId[0]?.yarnType : ''
      this.yarnTypeFBCId = res.sizeId[0]?.yarnTypeId ? res.sizeId[0]?.yarnTypeId : ''
      this.finishDiaFBC = res.sizeId[0]?.finishDia ? res.sizeId[0]?.finishDia : ''
      this.finishDiaFBCId = res.sizeId[0]?.finishDiaId ? res.sizeId[0]?.finishDiaId : ''
      this.styleIdDta = res.sizeId[0]?.styleId ? res.sizeId[0]?.styleId : ''
      this.dyeTypeFBC = res.sizeId[0]?.dyeType ? res.sizeId[0]?.dyeType : ''
      this.dyeTypeFBCId = res.sizeId[0]?.dyeTypeId ? res.sizeId[0]?.dyeTypeId : ''



      this.api.DyeTypeMaster_BO(this.styleIdDta, this.dyeTypeFBCId).subscribe((res) => {
        this.DyeTypeLossDta = res.DyeTypeLoss[0].dyepl
      })

      this.api.fabricType_BO(this.styleIdDta, this.fabricTypeFBCId).subscribe((res) => {
        this.fabTypeLossDta = res.FabricTypeLoss[0].fabpl
      })

      const formArray = this.buyerorderform.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('polineId')?.setValue(this.polineId);
      row.get('poid')?.setValue(this.poid);
      // row.get('FSize')?.setValue(this.FSizeFBC);
      row.get('FabType')?.setValue(this.fabricTypeFBC);
      row.get('fabricTypeId')?.setValue(this.fabricTypeFBCId)
      row.get('FabGsm')?.setValue(this.fabricGSMFBC);
      row.get('YarnType')?.setValue(this.yarnTypeFBC);
      row.get('YarnTypeId')?.setValue(this.yarnTypeFBCId)
      row.get('FabDia')?.setValue(this.finishDiaFBC);
      row.get('dyetype')?.setValue(this.dyeTypeFBC);
      row.get('dyeTypeId')?.setValue(this.fabricTypeFBCId)
      row.get('DyeTypeMaster')?.setValue(this.DyeTypeLossDta);
      row.get('fabricType')?.setValue(this.fabTypeLossDta);
      row.get('SizeId')?.setValue(this.FSizeFBCId);
      row.get('FabDiaId')?.setValue(this.finishDiaFBCId);

    })

    this.api.f_size_BO(this.style_Value, this.size_Value).subscribe((res) => {
      this.fsizeDta = res.fsize
      this.fabdiaDta = res.FabDia
      this.fabGsmDta = res.FabGsm

      this.finishfabConsumptionDta = res.finishfabConsumption[0].finishfabConsumption ? res.finishfabConsumption[0].finishfabConsumption : ''
      const formArray = this.buyerorderform.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('FabricConsumption')?.setValue(this.finishfabConsumptionDta);
    })

  }


  fabdiavalue(event: any) {
    this.fabdia_Value = event.target.value
  }

  FabGsmvalue(event: any) {
    this.FabGsm_Value = event.target.value
  }

  calculateDiff() {
    this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const OrderPcsValue = parseFloat(row.get('OrderPcs')?.value) || 0;


        const FinishKg1 = (this.finishDiaFBC - this.finishfabConsumptionDta) * OrderPcsValue / (100 - (this.rejloss) - (this.PODetailsLossValue));
        const FinishKg2 = FinishKg1 / (100 - this.DyeProcessLossValue - this.DyeTypeLossDta - this.fabTypeLossDta)

        const FinishKg = parseFloat(FinishKg1.toFixed(2));
        const GreigeKg = parseFloat(FinishKg2.toFixed(2));
        const YarnKg = parseFloat(FinishKg2.toFixed(2));
        row.patchValue({ FinishKg, GreigeKg, YarnKg });
      }
    });
  }

  buyerorderform = new FormGroup({
    data: this.fb.array([]),
    Buyer: new FormControl(''),
    OrderNo: new FormControl(''),
  })
  get items() {
    return this.buyerorderform.get("data") as FormArray;
  }
  add1button() {
    const row = this.fb.group({
      "id": [''],
      "poid": [''],
      "polineId": [''],
      "Style": [''],
      "Color": [''],
      "Size": [''],
      "FSize": [''],
      "SizeId": ['', Validators.required],
      "FabType": [''],
      "fabricTypeId": [''],
      "FabDia": [''],
      "FabDiaId": ['', Validators.required],
      "FabGsm": [''],
      "FabGsmId": [0],
      "YarnKg": [''],
      "GreigeKg": [''],
      "YarnType": [''],
      "YarnTypeId": ['', Validators.required],
      "FinishKg": [''],
      "KnitSL": [''],
      "SpinFty": [''],
      "SpinFtyId": ['', Validators.required],
      "KnitFty": [''],
      "KnitFtyId": ['', Validators.required],
      "DyeinFty": [''],
      "DyeinFtyId": ['', Validators.required],

      "dyetype": [''],
      "dyeTypeId": ['', Validators.required],

      "OrderPcs": [''],
      "OrderFOBRate": [''],
      "KnitRate": [''],
      "DyeRate": [''],


    });
    this.items.push(row);

    row.get('OrderPcs')?.valueChanges.subscribe(() => {
      this.calculateDiff();
    });
  }

  save() {
    // console.log(this.buyerorderform.value)
    if (this.buyerorderform.valid) {
      this.api.postworkorder(this.buyerorderform.value).subscribe((res) => {
        if (res.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/main/FabricRollData'])
        }
        else {
          alert("Error while saving...!!!")
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Size Id Missing"
      });
    }
  }
  FBReport() {
    this.router.navigate(['/main/FBReport'])
  }
  Delete(index: number) {
    this.items.removeAt(index);
  }
}
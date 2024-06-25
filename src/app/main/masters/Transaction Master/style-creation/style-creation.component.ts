import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-style-creation',
  templateUrl: './style-creation.component.html',
  styleUrls: ['./style-creation.component.css']
})
export class StyleCreationComponent implements OnInit {
  Stylecreation: boolean = false;

  Styleediting: boolean = false;

  Stylecreate!: FormGroup

  Styleedit!: FormGroup
  buyerDrop: any;
  allData: any;
  datalist: any;
  allData2: any;
  buyerId: any;
  selectedBuyer: any = [];
  buyerName: any;
  Id: any;
  BuyerName: any;
  Buyer: any;
  factorynamevalue: any;
  Buyernamevalue: any;
  buyerid: any;
  styleFillterData: any;
  all: any;
  Yarntypenamevalue: any
  allfabricType: any;
  allyarnType: any;
  fabricTypenamevalue: any
  dyeTypenamevalue: any
  alldyeType: any;
  dyeTypeid: any;
  fabricstypeid: any;
  yarnTypeid: any;
  ngOnInit(): void {

    this.api.Drop_Buyer_master().subscribe((res) => {
      this.buyerDrop = res.buyer;
    })

    this.api.style_master_AllData().subscribe((res) => {
      this.all = res.style
    })
    this.stylefilter()

    this.api.yarnType_master_AllData().subscribe((res) => {
      this.allyarnType = res.yarnType
    })


    this.api.fabrictype_master_AllData().subscribe((res) => {
      this.allfabricType = res.fabricType
    })

    this.api.dyetype_master_AllData().subscribe((res) => {
      this.alldyeType = res.DyeType
    })

  }

  stylefilter() {
    this.api.style_master_Fillter_Data(this.styleFillterData).subscribe((res) => {
      this.allData2 = res.styles

    })
  }
  constructor(private fb: FormBuilder, private api: ApiService) {

    this.Stylecreate = this.fb.group({
      id: new FormControl(''),
      style: new FormControl(''),
      stylecode: new FormControl(''),
      styletype: new FormControl(''),
      utility: new FormControl(''),
      buyer: new FormControl(''),
      buyerId: new FormControl(''),
      brand: new FormControl(''),

      yarnType: new FormControl(''),
      yarnTypeId: new FormControl(''),
      fabricType: new FormControl(''),
      fabricTypeId: new FormControl(''),
      dyeType: new FormControl(''),
      dyeTypeId: new FormControl(''),
      packingType: new FormControl(''),
      fabricGSM: new FormControl('')
    })


    this.Styleedit = this.fb.group({
      id: new FormControl(''),
      style: new FormControl(''),
      stylecode: new FormControl(''),
      styletype: new FormControl(''),
      utility: new FormControl(''),
      buyer: new FormControl(''),
      buyerId: new FormControl(''),
      brand: new FormControl(''),

      yarnType: new FormControl(''),
      yarnTypeId: new FormControl(''),
      fabricType: new FormControl(''),
      fabricTypeId: new FormControl(''),
      dyeType: new FormControl(''),
      dyeTypeId: new FormControl(''),
      packingType: new FormControl(''),
      fabricGSM: new FormControl(''),
    })
  }
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;


  edit(id: any) {
    this.api.style_master_SingleData(id).subscribe((res) => {
      this.datalist = res.styles
      this.Styleedit.patchValue({
        id: this.datalist[0].id,
        style: this.datalist[0].style,
        stylecode: this.datalist[0].style_code,
        styletype: this.datalist[0].style_type,
        utility: this.datalist[0].utility,
        buyer: this.datalist[0].buyer,
        brand: this.datalist[0].brand,
        buyerId: this.datalist[0].buyer_id,
        yarnType: this.datalist[0].yarnType,
        yarnTypeId: this.datalist[0].yarnTypeId,
        fabricType: this.datalist[0].fabricType,
        fabricTypeId: this.datalist[0].fabricTypeId,
        dyeType: this.datalist[0].dyeType,
        dyeTypeId: this.datalist[0].dyeTypeId,
        packingType: this.datalist[0].packingType,
        fabricGSM: this.datalist[0].fabricGSM,
      })
    })
  }

  getbuyerId() {
    this.api.BuyerId(this.Buyernamevalue).subscribe((res) => {
      this.buyerid = res.buyer[0].id

      this.Stylecreate.patchValue({
        buyerId: this.buyerid
      })
      this.Styleedit.patchValue({
        buyerId: this.buyerid
      })
    })
  }

  getyarntypeId() {
    this.api.yarnTypeId(this.Yarntypenamevalue).subscribe((res) => {
      this.yarnTypeid = res.yarnType[0].id
      this.Stylecreate.patchValue({
        yarnTypeId: this.yarnTypeid
      })
      this.Styleedit.patchValue({
        yarnTypeId: this.yarnTypeid
      })
    })
  }

  getfabrictypeId() {
    this.api.fabrictypeId(this.fabricTypenamevalue).subscribe((res) => {
      this.fabricstypeid = res.fabricstype[0].id
      this.Stylecreate.patchValue({
        fabricTypeId: this.fabricstypeid
      })
      this.Styleedit.patchValue({
        fabricTypeId: this.fabricstypeid
      })
    })
  }

  getdyetypeId() {
    this.api.DyeTypeId(this.dyeTypenamevalue).subscribe((res) => {
      this.dyeTypeid = res.dyeType[0].id
      this.Stylecreate.patchValue({
        dyeTypeId: this.dyeTypeid
      })
      this.Styleedit.patchValue({
        dyeTypeId: this.dyeTypeid
      })
    })
  }



update(){
  this.api.style_master(this.Styleedit.value).subscribe((res) => {
    
    this.stylefilter()
  })

  this.Styleedit.reset()
  this.Styleediting = false
}

delete (id:any) {
  this.api.delete_style_master(id).subscribe((res) => {
    alert(res.message)
    window.location.reload()
  })
}

saveButton(){
  this.api.style_master(this.Stylecreate.value).subscribe((res) => {
  
  })
  this.stylefilter()
  this.Stylecreate.reset()
  this.Stylecreation = false
}
  
  }

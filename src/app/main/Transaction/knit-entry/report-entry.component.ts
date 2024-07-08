import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-entry',
  templateUrl: './report-entry.component.html',
  styleUrls: ['./report-entry.component.css']
})
export class ReportEntryComponent implements OnInit {
  load: FormGroup;
  isChecked: boolean = true;
  yes: any;
  no: any
  fty_name: any;
  buyer: any;
  order: any;
  stylelist: any;
  colorlist: any;
  sizelist: any;
  buyerName: any;
  orderNo: any;
  style: any;
  color: any;
  ftyname:any
  size: any;
  woId: any[] = [];
  loading: boolean = false;
  factorynamevalue : any;
  factory: any;
  knitDetails: any;
  valueExceeded : boolean = false;
  toleranceValid: boolean[] = [];

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.load = this.fb.group({
      id: new FormControl(''),
      date: new FormControl('' , Validators.required),
      factory: new FormControl('' , Validators.required),
      houseKeepingStatus: new FormControl(''),
      gasElecAvailability: new FormControl(''),
      floorLightingStatus: new FormControl(''),
      storageAreaStatus: new FormControl(''),
      status: new FormControl(''),
      allocatedDay: [''],
      data: this.fb.array([])
    });

  }


  ngOnInit() {
    this.factoryname()
  }

  factoryname() {
    this.api.getknitwofty().subscribe((res) => {
      this.fty_name = res.knitfty
    })
  }


  // <!------------------------------------------------------------>
  buyername() {
    this.api.getknitwobuyers(this.factorynamevalue).subscribe((res) => {
      this.buyer = res.buyers
    })
  }
  getBuyerValue(index: any) {
    // this.buyerName = event.target.value;
    const formArray = this.load.get('data') as FormArray;
    const row = formArray.at(index);
    this.buyerName = row.get('buyer')?.value;
    this.getorders()
  }

  getorders() {
    this.api.getknitwoorders(this.factorynamevalue,this.buyerName).subscribe((res) => {
      this.order = res.orders
    })
  }

  getOrderValue(index: any) {
    const formArray = this.load.get('data') as FormArray;
    const row = formArray.at(index);
    this.buyerName = row.get('buyer')?.value;
    this.orderNo = row.get('orderNo')?.value;

    this.getstyle()
  }

  getstyle() {
    this.api.getknitwostyle(this.factorynamevalue,this.buyerName, this.orderNo).subscribe((res) => {
      this.stylelist = res.styles;
    })
  }

  getstylevalue(index: any) {

    const formArray = this.load.get('data') as FormArray;
    const row = formArray.at(index);
    this.buyerName = row.get('buyer')?.value;
    this.orderNo = row.get('orderNo')?.value;
    this.style = row.get('style')?.value;
    this.getcolor()
    // this.style = event.target.value
  }

  getcolor() {
    this.api.getknitwocolor(this.factorynamevalue,this.buyerName, this.orderNo, this.style).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  getcolorvalue(index: any) {

    const formArray = this.load.get('data') as FormArray;
    const row = formArray.at(index);
    this.buyerName = row.get('buyer')?.value;
    this.orderNo = row.get('orderNo')?.value;
    this.style = row.get('style')?.value;
    this.color = row.get('color')?.value;
    
    // this.color = event.target.value
    this.getsize()
  }

  getsize() {
    this.api.getknitwosize(this.factorynamevalue,this.buyerName, this.orderNo, this.style, this.color).subscribe((res) => {
      this.sizelist = res.sizes;
      
    })
  }

  getFactoryName(event:any){
    this.factory = event.target.value;
  }

  getWoId(size: any, index: number) {
    this.api.getwodetails(this.buyerName, this.orderNo, this.style, this.color, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      const formArray = this.load.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('woId')?.setValue(woId);
      console.log(res)
    });
  }

  getknitWoDetails(index:any){
    const KnitEntryData = this.load.get('data') as FormArray;
    const row = KnitEntryData.at(index);
    const factory = this.factory
    const buyer = row.get('buyer')?.value;
    const orderNo = row.get('orderNo')?.value;
    const style = row.get('style')?.value;
    const color = row.get('color')?.value;
    const size = row.get('size')?.value;

    console.log(factory,buyer,orderNo,style,color,size)
    this.api.knitauth(factory,buyer,orderNo,style,color,size).subscribe((res)=>{
      this.knitDetails = res.knitWoDetails
    })
  }

  valid(value:any, i:any){
    const inputValue = value;
    const tolerance = (this.knitDetails[0].knitKg + (this.knitDetails[0].knitKg * 0.05) )
    if(inputValue > tolerance ){
      alert("Allowed value with 5% tolerance is : " + tolerance);
      this.toleranceValid[i] = true
    }
    else{
      this.toleranceValid[i] = false
    }
    this.validlity()
  }

  validlity(){
    if(this.toleranceValid.includes(true)){
      this.valueExceeded = true;
    }
    else{
      this.valueExceeded = false;
    }
  }

  // <!------------------------------------------------------------>




  get items() {
    return this.load.get('data') as FormArray;
  }

  add() {

    const row = this.fb.group({
          "buyer": ['' , Validators.required],
          "orderNo": ['' , Validators.required],
          "style": ['' , Validators.required],
          "color": ['' , Validators.required],
          "size": ['' , Validators.required],
          "woId": [],
          "knitMachineno": [''],
          "yarnLot": [''],
          "dayProductionKgs": [''],
          "noOfRollsProduced": ['', Validators.required],
          "noOfRollsChecked": [''],
          "knittingSL": [''],
          "machineRPM": [''],
          "oilSystem": [''],
          "yarnTension": [''],
          "needleQuality": [''],
          "sinkerQuality": [''],
          "movingFan": [''],
          "allStopMotion": [''],
          "takeupRollerTension": [''],
          "remarks": ['']
        });
        this.items.push(row);

  }

  save() {
    if (this.load.valid) {
      this.loading = true;
      this.api.knit_entry(this.load.value).subscribe((res) => {
        alert(res.message)
        this.loading = false;
        this.router.navigate(['/main/Knit-Report'])
      })
    } else {
      alert('Please fill No.Rolls Produced fields and Date fields // Entry should more then 0.');
    }
  }


}
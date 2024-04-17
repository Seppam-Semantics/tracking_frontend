import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-entry',
  templateUrl: './report-entry.component.html',
  styleUrls: ['./report-entry.component.css']
})
export class ReportEntryComponent implements OnInit  {
load:FormGroup;
isChecked: boolean = true;
yes:any;
no:any
  fty_name: any;
  buyer: any;
  order: any;
  stylelist: any;
  colorlist: any;
  sizelist: any;
  buyerName : any;
  orderNo:any;
  style:any;
  color:any;
  size:any;
  woId: any[]=[];
  constructor(private fb: FormBuilder , private api : ApiService , private router : Router) {
    this.load = this.fb.group({
      id:new FormControl(0),
      date: new FormControl(''),
      factory : new FormControl('', Validators.required),
      houseKeepingStatus: new FormControl(''),
      gasElecAvailability : new FormControl(''),
      floorLightingStatus : new FormControl(''),
      storageAreaStatus : new FormControl(''),
      allocatedDay: [''],
      data: this.fb.array([])
    });

    }


  ngOnInit() {  
    this.factoryname()
    this.buyername()
  }

    factoryname(){
      this.api.knitfty_name().subscribe((res)=>{
        this.fty_name=res.factorys
      })
    }


// <!------------------------------------------------------------>
    buyername(){
      this.api.getbuyers().subscribe((res)=>{
        this.buyer = res.buyers
      })
    }
    getBuyerValue(event: any) {
      this.buyerName = event.target.value;
    }

    getorders() {
      this.api.getorders(this.buyerName).subscribe((res) => {
        this.order = res.orders
      })
    }
    
    getOrderValue(event:any){
      this.orderNo = event.target.value
    }

    getstyle() {
      this.api.getstyle(this.buyerName, this.orderNo).subscribe((res) => {
        this.stylelist = res.styles;
      })
    }
  
    getstylevalue(event:any){
      this.style = event.target.value
    }

    getcolor() {
      this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
        this.colorlist = res.colors;
      })
    }

    getcolorvalue(event:any){
      this.color = event.target.value
    }
  
    getsize() {
      this.api.getsize(this.buyerName, this.orderNo, this.style, this.color).subscribe((res) => {
        this.sizelist = res.sizes;
      })
    }

    getWoId(size: any, index: number) {
      this.api.getwodetails(this.buyerName, this.orderNo, this.style, this.color, size ).subscribe((res) => {
        const woId = res.workorders[0].id;
        console.log(woId);
        const formArray = this.load.get('data') as FormArray;
        const row = formArray.at(index);
        row.get('woId')?.setValue(woId);
      });
    }
  // <!------------------------------------------------------------>


  

  get items() {
    return this.load.get('data') as FormArray;
  }
  
  add() {
    const numberOfEntries = parseInt(this.load.get('allocatedDay')?.value);
    const formControls = [];
    for (let i = 0; i < numberOfEntries; i++) {
      formControls.push(
        this.fb.group({
          "id": [i+1],
          "buyer": [''],
          "orderNo": [''],
          "style": [''],
          "color": [''],
          "size": [''],
          "woId":[],
          "knitMachineno": [''],
          "yarnLot": [''],
          "dayProductionKgs": [''],
          "noOfRollsProduced": [''],
          "noOfRollsChecked": [''],
          "knittingSL": [''],
          "machineRPM": [''],
          "oilSystem": [''],
          "yarnTension": [''],
          "needleQuality": [''],
          "sinkerQuality": [''],
          "movingFan": [''],
          "allStopMotion": [''],
          "takeupRollerTension":[''],
          "remarks":['']
        })
      );
    }
    this.load.setControl('data', this.fb.array(formControls));
  }

save(){
  console.log(this.load.value)
  this.api.knit_entry(this.load.value).subscribe((res)=>{
  alert(res.message)
  window.location.reload()
})
}


}
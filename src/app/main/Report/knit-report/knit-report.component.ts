import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'


@Component({
  selector: 'app-knit-report',
  templateUrl: './knit-report.component.html',
  styleUrls: ['./knit-report.component.css']
})


export class KnitReportComponent implements OnInit {
  dataSource: any[] = []
  data: any = [];
  fabricdetails: any
  ordernumber: any
  buyers: any;
  buyerName: any
  order: any;
  ordernumbers: any
  stylelist: any;
  styleslist: any
  colorlist: any;
  colorslist: any
  sizelist: any;
  sizeslist: any
  workorderhide: boolean = true;
  workorderId: any;
  WoNumber: any;
  fabdetails: any;
  rollnnumber: any;
  wodetails: any;
  fabid: any;
  AllWoDetails: any[] = [];
  LoadingTotal: boolean = false;
  totalcount: any;
  totalvalues: any;
  woupdateid: any;
  factorydata: any;
  factoryvalue: any =''
  ftyName: any;
  knitdate: string = '';
  ftydate: any = ''
  ktyid: any;
  ktydata: any;
  Ftydata: any;
  knitdetails: any;
  fileName = "Fabricrolldata.xlsx"
  fileName2 = "Workorder-data.xlsx"

  // ---------------------------

  load: FormGroup;
  isChecked: boolean = true;
  yes: any;
  no: any
  fty_name: any;
  buyer: any;
  orderNo: any;
  style: any;
  color: any;
  size: any;
  knitdetails2: any;
  allDetailsModal : boolean = false;
  editpopup: boolean = false;
  date: any;


  onCheckboxChange11(event: any) {
    const ischecked = event.target.checked;
    this.load.controls['houseKeepingStatus'].setValue(ischecked ? 'active' : 'inactive');
  }

  onCheckboxChange22(event: any) {
    const ischecked = event.target.checked
    this.load.controls['gasElecAvailability'].setValue(ischecked ? 'active' : 'inactive');
  }

  onCheckboxChange33(event: any) {
    const ischecked = event.target.checked
    this.load.controls['floorLightingStatus'].setValue(ischecked ? 'active' : 'inactive');
  }

  onCheckboxChange44(event: any) {
    const ischecked = event.target.checked
    this.load.controls['storageAreaStatus'].setValue(ischecked ? 'active' : 'inactive');
  }
  // ---------------------------
  constructor(private api: ApiService, private fb: FormBuilder, private datePipe: DatePipe, private router: Router) {
    this.load = this.fb.group({
      id: new FormControl(),
      date: new FormControl(''),
      factory: new FormControl(''),
      houseKeepingStatus: new FormControl(''),
      gasElecAvailability: new FormControl(''),
      floorLightingStatus: new FormControl(''),
      storageAreaStatus: new FormControl(''),
      allocatedDay: [''],
      data: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.factoryName();
    this.allknitDetails();
    this.buyername()
    this.knitDate()
  }

  knitDate(){
    this.api.knitDate().subscribe((res)=>{
      this.date=res.date
      console.log(res)
    })
  }

  factoryName() {
    this.api.knitfty_name().subscribe((res) => {
      this.ftyName = res.factorys
    })
  }

  allknitDetails() {
    this.api.getallfty_details().subscribe((res) => {
      this.data = res.workorders
    })
  }

  factory() {
    console.log(this.knitdate)
    if(this.factoryvalue != '' && this.knitdate == ''){
      this.loadknitdetails(this.factoryvalue)
    }
    if(this.factoryvalue == '' && this.knitdate != ''){
      this.loadknitdetails('',this.knitdate)
    }
    if(this.factoryvalue && this.knitdate){
      this.loadknitdetails(this.factoryvalue,this.knitdate)
    }
  }


  loadknitdetails(factory: string= '', date: string='') {
    console.log(date)
    this.api.ftydetailsFilter(factory, date).subscribe((res) => {
      this.data = res.knit;
    });
  }

  factory_date() {
    this.loadknitdetails(this.factoryvalue, this.knitdate)
  }


  loadftydetails(buyer: any, orderNo: string = '', style: string = '', color: string = '', size: string = '') {
    this.api.knitDetailsFilter(buyer, orderNo, style, color, size).subscribe((res) => {
      this.knitdetails = res.knit;
    });
  }

  woByBuyer() {
    this.loadftydetails(this.buyerName);
  }

  wobyOrder() {
    this.loadftydetails(this.buyerName, this.ordernumbers);
  }

  wobystyle() {
    this.loadftydetails(this.buyerName, this.ordernumbers, this.styleslist);
  }

  wobycolor() {
    this.loadftydetails(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist);
  }

  wobysize() {
    this.loadftydetails(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist, this.sizeslist);
  }


  buyername() {
    this.api.getbuyers().subscribe((res) => {
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

  getOrderValue(event: any) {
    this.orderNo = event.target.value
  }

  getstyle() {
    this.api.getstyle(this.buyerName, this.orderNo).subscribe((res) => {
      this.stylelist = res.styles;
    })
  }

  getstylevalue(event: any) {
    this.style = event.target.value
  }

  getcolor() {
    this.api.getcolor(this.buyerName, this.orderNo, this.style).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  getcolorvalue(event: any) {
    this.color = event.target.value
  }

  getsize() {
    this.api.getsize(this.buyerName, this.orderNo, this.style, this.color).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }


  clearAll() {
    this.buyerName = ''
    this.ordernumbers = ''
    this.styleslist = ''
    this.colorslist = ''
    this.sizeslist = ''
  }

  exportexcel2() {
    let data = document.getElementById("table-data2");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName2);
  }

  exportexcel() {
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  check(id: any) {
    this.allDetailsModal = true;
    this.ktyid = id
    this.api.getsingleknit_details(id).subscribe((res) => {
      this.knitdetails = res.lineData
      this.knitdetails2 = res.headerData
    })
  }



  edit(id: any) {
    this.editpopup = true;
    this.ktyid = id;
    this.api.getsingleknit_details(this.ktyid).subscribe((res) => {
      this.ktydata = res;

      this.load.patchValue({
        date: this.datePipe.transform(this.ktydata.headerData[0].date, 'yyyy-MM-dd'),
        id: this.ktyid,
        factory: this.ktydata.headerData[0].factory,
        houseKeepingStatus: this.ktydata.headerData[0].houseKeepingStatus,
        gasElecAvailability: this.ktydata.headerData[0].gasElecAvailability,
        floorLightingStatus: this.ktydata.headerData[0].floorLightingStatus,
        storageAreaStatus: this.ktydata.headerData[0].storageAreaStatus,
        allocatedDay: this.ktydata.headerData[0].allocatedDay,
      });

      const numberOfEntries = this.ktydata.headerData[0].allocatedDay;

      const formControls = [];
      for (let i = 0; i < numberOfEntries; i++) {
        formControls.push(
          this.fb.group({
            id: [],
            knitId: [i + 1],
            buyer: [''],
            orderNo: [''],
            style: [''],
            color: [''],
            size: [''],
            woId: [],
            knitMachineno: [''],
            yarnLot: [''],
            dayProductionKgs: [''],
            noOfRollsProduced: [''],
            noOfRollsChecked: [''],
            knittingSL: [''],
            machineRPM: [''],
            oilSystem: [''],
            yarnTension: [''],
            needleQuality: [''],
            sinkerQuality: [''],
            movingFan: [''],
            allStopMotion: [''],
            takeupRollerTension: [''],
            remarks: [''],
          })
        );
      }

      const dataControl = this.load.get('data') as FormArray;
      this.load.setControl('data', this.fb.array(formControls));

       dataControl.clear();
       formControls.forEach((control) => {
        dataControl.push(this.fb.group(control));
       });
      this.ktydata.lineData.forEach((lineItem: any, i: any) => {
        this.items.at(i).patchValue({
          id: lineItem?.id,
          knitId: lineItem?.knitId,
          buyer: lineItem?.buyer || '',
          orderNo: lineItem?.orderNo || '',
          style: lineItem?.style || '',
          color: lineItem?.color || '',
          size: lineItem?.size || '',
          woId: lineItem?.woId || '',
          knitMachineno: lineItem?.knitMachineno || '',
          yarnLot: lineItem?.yarnLot || '',
          dayProductionKgs: lineItem?.dayProductionKgs || '',
          noOfRollsProduced: lineItem?.noOfRollsProduced || '',
          noOfRollsChecked: lineItem?.noOfRollsChecked || '',
          knittingSL: lineItem?.knittingSL || '',
          machineRPM: lineItem?.machineRPM || '',
          oilSystem: lineItem?.oilSystem || '',
          yarnTension: lineItem?.yarnTension || '',
          needleQuality: lineItem?.needleQuality || '',
          sinkerQuality: lineItem?.sinkerQuality || '',
          movingFan: lineItem?.movingFan || '',
          allStopMotion: lineItem?.allStopMotion || '',
          takeupRollerTension: lineItem?.takeupRollerTension || '',
          remarks: lineItem?.remarks || '',
        });
      });
    });
  }




  deleteKnit(id: any) {
    this.api.deleteKnitDetails(id).subscribe((res) => {
      alert(res.message)
      window.location.reload()
    })
  }


  //----------------------------------------------------------------------------------------------

  get items() {
    return this.load.get('data') as FormArray;
  }

  add() {
    const numberOfEntries = parseInt(this.load.get('allocatedDay')?.value);
    const formControls = [];
    for (let i = 0; i < numberOfEntries; i++) {
      formControls.push(
        this.fb.group({
          "id": [],
          "knitId": [i + 1],
          "buyer": [''],
          "orderNo": [''],
          "style": [''],
          "color": [''],
          "size": [''],
          "woId": [],
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
          "takeupRollerTension": [''],
          "remarks": ['']
        })
      );
    }
    this.load.setControl('data', this.fb.array(formControls));
  }

  save() {
    this.api.updateKnitEntry(this.load.value).subscribe((res) => {
      alert(res.message)
      this.editpopup = false;
    })
  }
  Report() {
    this.router.navigate(['/main/ReportEntry']);
  }

}
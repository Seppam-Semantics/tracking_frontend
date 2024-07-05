import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
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
  factoryvalue: any = ''
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
  allDetailsModal: boolean = false;
  editpopup: boolean = false;
  date: any;
  orderName: any;
  ordervalue: any
  ktydatalineData: any;
  knitDetails: any;
  valueExceeded: boolean = false;

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
    this.knitDate()
    this.OrderName()
  }

  knitDate() {
    this.api.knitDate().subscribe((res) => {
      this.date = res.date
    })
  }

  factoryName() {
    this.api.knitfty_name().subscribe((res) => {
      this.ftyName = res.factorys
    })
  }
  OrderName() {
    this.api.knitfty_order().subscribe((res) => {
      this.orderName = res.order
    })
  }



  allknitDetails() {
    this.api.getallfty_details().subscribe((res) => {
      this.data = res.workorders
      // console.log(this.data)
    })
  }

  colorjson(data: any): any {
    return JSON.parse(data);
  }

  factory() {
    // console.log(this.ordervalue);

    // if(this.factoryvalue != '' && this.knitdate == ''){
    //   this.loadknitdetails(this.factoryvalue)
    // }
    // if(this.factoryvalue == '' && this.knitdate != ''){
    //   this.loadknitdetails('',this.knitdate)
    // }
    // if(this.factoryvalue == '' && this.knitdate != '' && this.ordervalue != ''){
    //   this.loadknitdetails('','',this.ordervalue)
    // }
    // if(this.factoryvalue && this.knitdate && this.ordervalue){
    this.loadknitdetails('', '', JSON.stringify(this.ordervalue))
    // }
  }


  loadknitdetails(factory: string = '', date: string = '', Order: any) {
    this.api.ftydetailsFilter(factory, date, Order).subscribe((res) => {
      this.data = res.knit;
      // console.log(res)
    });
  }

  // factory_date() {
  //   this.loadknitdetails(this.factoryvalue, this.knitdate)
  // }


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
    const factory = this.ktydata.headerData[0].factory
    this.loadftydetails(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist, this.sizeslist);
  }




  clearAll() {
    this.buyerName = ''
    this.ordernumbers = ''
    this.styleslist = ''
    this.colorslist = ''
    this.sizeslist = ''
  }

  exportexcel2() {

    Swal.fire({
      title: "Are you sure?",
      text: "You Want To Download Report!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Download it!"
    }).then((result) => {
      if (result.isConfirmed) {

        let data = document.getElementById("table-data2");
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, this.fileName2);

        Swal.fire({
          title: "Good job!",
          text: "Your Download Compleated !!!",
          icon: "success"
        });
      }
    });
  }

  exportexcel() {


    Swal.fire({
      title: "Are you sure?",
      text: "You Want To Download Report!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Download it!"
    }).then((result) => {
      if (result.isConfirmed) {

        let data = document.getElementById("table-data");
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, this.fileName);

        Swal.fire({
          title: "Good job!",
          text: "Your Download Compleated !!!",
          icon: "success"
        });
      }
    });
  }

  check(id: any) {
    this.allDetailsModal = true;
    this.ktyid = id
    this.api.getsingleknit_details(id).subscribe((res) => {
      this.knitdetails = res.lineData
      this.knitdetails2 = res.headerData
    })
  }

  KnitFactoryInventory() {
    this.router.navigate(['/main/knit-factory-inventory'])
  }
  Dayknit() {
    this.router.navigate(['/main/Day-Knit'])
  }

  edit(id: any) {
    this.editpopup = true;
    this.ktyid = id;
    // console.log(this.ktyid)
    this.api.getsingleknit_details(this.ktyid).subscribe((res) => {
      this.ktydata = res;
      this.ktydatalineData = res.lineData
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


      const KnitEntryData = this.load.get('data') as FormArray;
      KnitEntryData.clear();

      const formControls: FormGroup[] = [];
      this.ktydatalineData.forEach((dataItem: any) => {
        formControls.push(
          this.fb.group({
            id: dataItem.id,
            knitId: dataItem.knitId,
            buyer: dataItem.buyer,
            orderNo: dataItem.orderNo,
            style: dataItem.style,
            color: dataItem.color,
            size: dataItem.size,
            woId: dataItem.woId,
            knitMachineno: dataItem.knitMachineno,
            yarnLot: dataItem.yarnLot,
            dayProductionKgs: dataItem.dayProductionKgs,
            noOfRollsProduced: dataItem.noOfRollsProduced,
            noOfRollsChecked: dataItem.noOfRollsChecked,
            knittingSL: dataItem.knittingSL,
            machineRPM: dataItem.machineRPM,
            oilSystem: dataItem.oilSystem,
            yarnTension: dataItem.yarnTension,
            needleQuality: dataItem.needleQuality,
            sinkerQuality: dataItem.sinkerQuality,
            movingFan: dataItem.movingFan,
            allStopMotion: dataItem.allStopMotion,
            takeupRollerTension: dataItem.takeupRollerTension,
            remarks: dataItem.remarks
          })

        );
      });
      this.load.setControl('data', this.fb.array(formControls));
    });
  }

  getknitWoDetails(index:any){
    const KnitEntryData = this.load.get('data') as FormArray;
    const row = KnitEntryData.at(index);
    const factory = this.ktydata.headerData[0].factory;
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

  valid(value:any){
    const inputValue = value;
    if(inputValue > (this.knitDetails[0].knitKg + (this.knitDetails[0].knitKg * 0.05) ) ){
      this.valueExceeded = true;
      alert("Value exceeded");
    }
    else{
      this.valueExceeded = false;
    }
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
    const row = this.fb.group({
      "id": [''],
      "knitId": [''],
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

    this.items.push(row);
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
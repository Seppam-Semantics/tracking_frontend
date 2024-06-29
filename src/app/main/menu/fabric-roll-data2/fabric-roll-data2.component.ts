import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'
import { ToastModule } from 'primeng/toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 

@Component({
  selector: 'app-fabric-roll2-data',
  templateUrl: './fabric-roll-data2.component.html',
  styleUrls: ['./fabric-roll-data2.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class FabricRollData2Component implements OnInit {
  dataSource: any[] = []
  data: any[] = [];
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
  entry1: any
  entry2: any
  entry3: any
  entry4: any
  entry5: any
  entry6: any
  entry7: any
  entry1total: any;
  entry2total: any;
  entry3total: any;
  entry4total: any;
  entry5total: any;
  entry6total: any;
  entry7total: any;
  LoadingTotal: boolean = false;
  totalcount: any;
  totalvalues: any;
  woupdateid: any;
  fabentrydata: any;
  fabentryentry: any;
  Woupdate: any;
  fabentrydata7: any;
  fabentrydata6: any;
  fabentrydata1: any;
  fabentrydata2: any;
  fabentrydata3: any;
  fabentrydata4: any;
  fabentrydata5: any;
  dataIndex: any;
  newfabEntry: any[] = []
  visible: boolean = false;
  visibleEntry: boolean = false;
  FabricBookingReport: boolean = false;
  status: any;
  woBuyervalue: any;
  woorderNovalue: any;
  data2: any[] = [];
  data3: any[] = [];
  woorderNovalue2: any;
  woBuyervalue2: any;
  headerData: any;
  headerstylevalue: any;
  headerdatavalue: any;

  // <!--------------------------------------------->

  Buyer_Value: any;
  buyersDta: any;
  orderNoDta: any;
  Order_Value: any;
  styleDta: any;
  style_Value: any;
  colorDta: any;
  color_Value: any;
  sizeDta: any;
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
  buyerorderform : FormGroup
  // <!------------------------------------------------------------>

  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) { 
    this.buyerorderform = this.fb.group({
      data: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getbuyers();
    this.loadworkorder()

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


  getstyle(orderNo: any) {
    this.api.getstyleData(orderNo).subscribe((res) => {
      this.stylelist = res.styles;
    })
    this.loadworkorderdetails(orderNo)
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

  loadworkorder(buyer: string = '', orderNo: string = '', style: string = '', color: string = '', size: string = '') {
    this.api.getwodetails(buyer, orderNo, style, color, size).subscribe((res) => {
      this.data = res.workorders;
    });
  }

  loadworkorderdetails(orderNo: string, style: string = '', color: string = '', size: string = '') {
    this.api.getwolinedetails(orderNo, style, color, size).subscribe((res) => {
      this.data2 = res.workorders;
      this.woBuyervalue = res.workorders[0].buyer
      this.woorderNovalue = res.workorders[0].orderNo
    });
  }

  loadworkorderdetails2(orderNo: string, style: string = '', color: string = '', size: string = '') {
    this.api.getwolinedetails(orderNo, style, color, size).subscribe((res) => {
      this.data3 = res.workorders;
      this.woBuyervalue2 = res.workorders[0].buyer
      this.woorderNovalue2 = res.workorders[0].orderNo


      const EntryData = this.buyerorderform.get('data') as FormArray;
      EntryData.clear();
      this.data3.forEach((dataItem: any) => {
        const Details = this.fb.group({
          "id": [dataItem.id],
          "poid": [dataItem.poid],
          "polineId": [dataItem.polineId],
          "Buyer": [dataItem.buyer],
          "OrderNo": [dataItem.orderNo],
          "Style": [dataItem.style],
          "Color": [dataItem.color],
          "Size": [dataItem.size],
          "FSize": [dataItem.FSize],
          "SizeId": [dataItem.sizeid , Validators.required],
          "FabType": [dataItem.fabType],
          "fabricTypeId": [dataItem.fabricTypeId],
          "FabDia": [dataItem.fabDia],
          "FabDiaId": [dataItem.fabdiaId],
          "FabGsm": [dataItem.fabGsm],
          "FabGsmId": [0],
          "YarnKg": [dataItem.yarnKg],
          "GreigeKg": [dataItem.greigeKg],
          "YarnType": [dataItem.yarnType],
          "YarnTypeId": [dataItem.yarnTypeId],
          "FinishKg": [dataItem.finishKg],
          "KnitSL": [dataItem.knitSL],
          "SpinFty": [dataItem.spinFty],
          "SpinFtyId": [dataItem.spinFtyId],
          "KnitFty": [dataItem.knitFty],
          "KnitFtyId": [dataItem.knitFtyId],
          "DyeinFty": [dataItem.dyeinFty],
          "DyeinFtyId": [dataItem.dyeinFtyId],

          "dyetype": [dataItem.dyetype],
          "dyeTypeId": [dataItem.dyeTypeId],
          "OrderPcs": [dataItem.orderPcs],
          "OrderFOBRate": [dataItem.orderFOBRate],
          "KnitRate": [dataItem.knitRate],
          "DyeRate": [dataItem.dyeRate],

          "status": [dataItem.status],
        });
        EntryData.push(Details);
      });




    });
  }

  woByBuyer() {
    this.getorders(this.buyerName);
    this.loadworkorder(this.buyerName);
  }
  wobyOrder() {
    this.getstyle(this.ordernumbers)
    this.loadworkorder(this.buyerName, this.ordernumbers);
  }

  woLineDetails(orderNo: any) {
    this.visibleEntry = true
   
    this.loadworkorderdetails(JSON.stringify(orderNo))
  console.log(this.data2)
  }

  wobystyle() {
    this.getcolor(this.buyerName, this.ordernumbers, this.styleslist)
    this.loadworkorderdetails(this.ordernumbers, this.styleslist);
  }
  wobycolor() {
    this.getsize(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist)
    this.loadworkorderdetails(this.ordernumbers, this.styleslist, this.colorslist);
  }
  wobysize() {
    this.loadworkorderdetails(this.ordernumbers, this.styleslist, this.colorslist, this.sizeslist);
  }

  clearAll() {
    this.buyerName = ''
    this.ordernumbers = ''
    this.styleslist = ''
    this.colorslist = ''
    this.sizeslist = ''
  }
  fileName2 = "Workorder-data.xlsx"
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

        let data2 = document.getElementById("table-data2");
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data2);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet2');
        XLSX.writeFile(wb, this.fileName2);


        Swal.fire({
          title: "Good job!",
          text: "Your Download Compleated !!!",
          icon: "success"
        });
      }
    });

  }

  tableData: any[] = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    // Add more data as needed
  ];


  downloadPDF(): void {
  }


  fileName1 = "Fabricrolldata.xlsx"
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

        // let data = document.getElementById("table-data");
        // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
        // const wb: XLSX.WorkBook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // XLSX.writeFile(wb, this.fileName1);

        // const element = document.getElementById('print');
        // html2canvas(element!).then(canvas => {
        //   const imgData = canvas.toDataURL('image/png');
        //   const pdf = new jsPDF('p', 'mm', 'a5');
        //   const imgProps = pdf.getImageProperties(imgData);
        //   const pdfWidth = pdf.internal.pageSize.getWidth();
        //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        //   pdf.save('Fabric-Entry-Report.pdf');  
        // });

        const doc = new jsPDF({
          orientation: 'landscape'
       });
       const options = {
         styles: {
           fontSize: 6,
         },
         margin: { top: 1 ,left : 1},
         tableWidth: 'auto'
       };
   
       const data = this.data2.map(row => [row.buyer , row.orderNo , row.style , row.color , row.size , row.FSize , row.fabDia , row.fabGsm , row.knitSL
         ,row.yarnType,row.fabType,row.dyetype,row.spinFty,row.knitFty,row.dyeinFty,row.orderPcs,row.orderFOBRate,row.knitRate,row.dyeRate,row.yarnKg,row.greigeKg,row.finishKg
       ]);
       (doc as any).autoTable({
         head: [["buyer","orderNo" , "style", "color","size","FSize","fabDia","fabGsm","knitSL",
           "yarnType","fabType","dyetype","spinFty","knitFty","dyeinFty","orderPcs","orderFOBRate","knitRate","dyeRate","yarnKg","greigeKg","finishKg"]],
         body: data , 
         ...options
       });
       doc.save('Fabricrolldata.pdf');
   


        Swal.fire({
          title: "Good job!",
          text: "Your Download Compleated !!!",
          icon: "success"
        });
      }
    });
  }

  check(id: any) {
    this.api.getsingleFabricroll(id).subscribe((res) => {
      this.fabentrydata1 = res.entry1;
      this.fabentrydata2 = res.entry2;
      this.fabentrydata3 = res.entry3;
      this.fabentrydata4 = res.entry4;
      this.fabentrydata5 = res.entry5;
      this.fabentrydata6 = res.entry6;
      this.fabentrydata7 = res.entry7;

      const fabEntryArray = [this.fabentrydata1, this.fabentrydata2, this.fabentrydata3, this.fabentrydata4, this.fabentrydata5, this.fabentrydata6, this.fabentrydata7];

      let maxIndex = 0;
      for (let i = 1; i < fabEntryArray.length; i++) {
        if (fabEntryArray[i].length > fabEntryArray[maxIndex].length) {
          maxIndex = i;
        }
      }

      this.dataIndex = maxIndex;
      this.newfabEntry = Array.from({ length: fabEntryArray[this.dataIndex].length }, (_, i) => i + 1);
    });
  }

  getMaxIndex(): number {
    let maxLength = 0;
    let maxIndex = 0;
    for (let i = 0; i < this.fabentryentry.length; i++) {
      if (this.fabentryentry[i].length > maxLength) {
        maxLength = this.fabentryentry[i].length;
        maxIndex = i;
      }
    }
    return maxIndex;
  }

  generateArray(maxIndex: number): number[] {
    return Array.from({ length: maxIndex }, (_, index) => index + 1);
  }

  edit(orderNo: any) {

    this.loadworkorderdetails2(JSON.stringify(orderNo))
    this.visible = true;
  }

  Report(id: any, i: any) {

    const a = this.data[i]

    this.FabricBookingReport = true
    this.api.fabbooking(a).subscribe((res) => {
      this.headerData = res.head
      this.headerdatavalue = res.data
      console.log(res)
    })
  }

  parseHeaders(data: any): any[] {
    if (data) {
      try {
        const fixedHeadersData = data.headers?.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
          .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');
        const fixedPoheadData = data.pohead?.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
          .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');

        const parsedData1 = fixedHeadersData ? JSON.parse(fixedHeadersData) : {};
        const parsedData2 = fixedPoheadData ? JSON.parse(fixedPoheadData) : {};

        return parsedData1.map((item1: any, index: any) => {
          const item2 = parsedData2[index] || {};
          return { ...item1, ...item2 };
        });

      } catch (error) {
        console.error('Error parsing data:', error);
        return [];
      }
    }
    return [];
  }
  parseheaders3(data: any): any {
    if (data && data.greige_fabric) {
      let fixedgreige_fabricData = data.greige_fabric.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
        .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');
      try {
        const parsedData3 = JSON.parse(fixedgreige_fabricData);
        return parsedData3;
      } catch (error) {
        console.error('Error parsing order_allocation data:', error);
        return;
      }
    }
    return;
  }

  parseheaders4(data: any): any {
    if (data && data.garment_break_down) {
      let fixedgarment_break_downData = data.garment_break_down.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
        .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');
      try {
        const parsedData4 = JSON.parse(fixedgarment_break_downData);
        return parsedData4;
      } catch (error) {
        console.error('Error parsing order_allocation data:', error);
        return;
      }
    }
    return;
  }

  parseheaders5(data: any): any {
    if (data && data.finish_fabric) {
      let fixedfinish_fabricData = data.finish_fabric.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
        .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');
      try {
        const parsedData5 = JSON.parse(fixedfinish_fabricData);
        return parsedData5;
      } catch (error) {
        console.error('Error parsing order_allocation data:', error);
        return;
      }
    }
    return;
  }

  parseheaders6(data: any): any {
    if (data && data.greige_fabric) {
      let fixedgreige_fabricData = data.greige_fabric.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
        .replace(/:\s*([^,\}\[]+)\s*(?=[,\}])/g, ': "$1"');
      try {
        const parsedData5 = JSON.parse(fixedgreige_fabricData);
        return parsedData5;
      } catch (error) {
        console.error('Error parsing order_allocation data:', error);
        return;
      }
    }
    return;
  }

  woupdatesubmit() {
    if (this.buyerorderform.valid) {
        this.api.postworkorder(this.buyerorderform.value.data).subscribe((res) => {
            alert(res.message);
            this.visible = false;
            this.woByBuyer();
            this.loadworkorder();
        });
    } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Missing SizeId",
        });
    }
}

  delete(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.api.Workorderdelect(id).subscribe((res) => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          this.loadworkorder()
        })
      }
    });
  }
  knite() {
    this.router.navigate(['/main/Knit-Report'])
  }
  Dye() {
    this.router.navigate(['/main/Dye-Report'])
  }
  yarn() {
    this.router.navigate(['/main/Yarn-Report'])
  }
  fabricEntry() {
    this.router.navigate(['/main/WorkorderData'])
  }

  FBReport() {
    this.router.navigate(['/main/FBReport'])
  }

  workorder() {
    this.router.navigate(['/main/WorkorderData'])
  }
  Upload() {
    this.router.navigate(['/main/WorkorderData'])
  }

  fabricreport(data: any) {
    sessionStorage.setItem('FabricEntrybuyer', data.buyer)
    sessionStorage.setItem('FabricEntrystyle', data.style)
    sessionStorage.setItem('FabricEntrycolor', data.color)
    sessionStorage.setItem('FabricEntrysize', data.size)
    sessionStorage.setItem('FabricEntryorderNo', data.orderNo)

    this.router.navigate(["/main/fabricroll1"])
  }



  // <!------------------------------------------------------------->

  buyervalue(index: any) {
    const formArray = this.buyerorderform.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('Buyer')?.value;
    this.buyerdata()
  }

  ordervalue(index: any) {
    // this.Order_Value = event.target.value
    const formArray = this.buyerorderform.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('Buyer')?.value;
    this.Order_Value = row.get('OrderNo')?.value;

    this.orderdata()
  }
  buyerdata() {
    this.api.Buyer_to_order(this.Buyer_Value).subscribe((res) => {
      this.buyersDta = res.buyers
      this.orderNoDta = res.orderNo
    })
  }

  orderdata() {
    this.api.order_to_style(this.Buyer_Value, this.Order_Value).subscribe((res) => {
      this.styleDta = res.style
    })
  }

  stylevalue(index: any) {
    const formArray = this.buyerorderform.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('Buyer')?.value;
    this.Order_Value = row.get('OrderNo')?.value;
    this.style_Value = row.get('Style')?.value;

    this.styledata()
  }

  styledata() {
    this.api.style_to_color(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
      this.colorDta = res.color
    })
  }

  colorvalue(index: any) {
    const formArray = this.buyerorderform.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('Buyer')?.value;
    this.Order_Value = row.get('OrderNo')?.value;
    this.style_Value = row.get('Style')?.value;
    this.color_Value = row.get('Color')?.value;

    this.colordata()
    // this.color_Value = event.target.value
    this.RejTypeLoss(index)
    this.colorprocessloss(index)
  }

  colordata() {
    this.api.color_to_size(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
      this.sizeDta = res.size
    })
  }

  sizevalue(index: any) {

    const formArray = this.buyerorderform.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('Buyer')?.value;
    this.Order_Value = row.get('OrderNo')?.value;
    this.style_Value = row.get('Style')?.value;
    this.color_Value = row.get('Color')?.value;
    this.size_Value = row.get('Size')?.value;

    // this.size_Value = event.target.value
    this.sizedata(index)
    this.PODetailsLoss(index)
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

    this.api.PODetailsLoss_BO(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, this.size_Value).subscribe((res) => {

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

  sizedata(index: any) {
    this.api.size_to_id(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, this.size_Value).subscribe((res) => {

      this.polineId = res.sizeId[0]?.id

      this.poid = res.sizeId[0]?.orderId
      this.FSizeFBC = res.sizeId[0]?.concatSize
      this.FSizeFBCId = res.sizeId[0]?.concatSizeId
      this.fabricTypeFBC = res.sizeId[0]?.fabricType
      this.fabricTypeFBCId = res.sizeId[0]?.fabricTypeId
      this.fabricGSMFBC = res.sizeId[0]?.fabricGSM
      this.fabricGSMFBCId = res.sizeId[0]?.fabricGSMId
      this.yarnTypeFBC = res.sizeId[0]?.yarnType
      this.yarnTypeFBCId = res.sizeId[0]?.yarnTypeId
      this.finishDiaFBC = res.sizeId[0]?.finishDia
      this.finishDiaFBCId = res.sizeId[0]?.finishDiaId
      this.styleIdDta = res.sizeId[0]?.styleId
      this.dyeTypeFBC = res.sizeId[0]?.dyeType
      this.dyeTypeFBCId = res.sizeId[0]?.dyeTypeId



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
      row.get('FSize')?.setValue(this.FSizeFBC);
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

      this.finishfabConsumptionDta = res.finishfabConsumption[0].finishfabConsumption
      const formArray = this.buyerorderform.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('FabricConsumption')?.setValue(this.finishfabConsumptionDta);
    })
  }

  fsizevalue(event: any) {
    this.fsize_Value = event.target.value
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


  get items() {
    return this.buyerorderform.get("data") as FormArray;
  }
  add1button() {
    const row = this.fb.group({
      "id": [''],
      "poid": [''],
      "polineId": [''],
      "Buyer": [''],
      "OrderNo": [''],
      "Style": [''],
      "Color": [''],
      "Size": [''],
      "FSize": [''],
      "SizeId": ['' , Validators.required],
      "FabType": [''],
      "fabricTypeId": [''],
      "FabDia": [''],
      "FabDiaId": [''],
      "FabGsm": [''],
      "FabGsmId": [''],
      "YarnKg": [''],
      "GreigeKg": [''],
      "YarnType": [''],
      "YarnTypeId": [''],
      "FinishKg": [''],
      "KnitSL": [''],
      "SpinFty": [''],
      "SpinFtyId": [''],
      "KnitFty": [''],
      "KnitFtyId": [''],
      "DyeinFty": [''],
      "DyeinFtyId": [''],

      "dyetype": [''],
      "dyeTypeId": [''],

      "OrderPcs": [''],
      "OrderFOBRate":[''],
      "KnitRate": [''],
      "DyeRate": ['']


    });
    this.items.push(row);

    row.get('OrderPcs')?.valueChanges.subscribe(() => {
      this.calculateDiff();
    });
  }

  save() {

    this.api.postworkorder(this.buyerorderform.value.data).subscribe((res) => {
      if (res.success) {
        alert("Your work order details have been saved....!!!!")
        window.location.reload();
      }
      else {
        alert("Error while saving...!!!")
      }
    })
  }

  Delete(index: number) {
    this.items.removeAt(index);
  }


}

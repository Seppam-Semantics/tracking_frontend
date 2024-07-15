import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css']
})
export class InvoiceListingComponent {

  InvoiceEty : FormGroup
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  filterDate1 : any
  filterDate2 : any
  Buyer_Value: any;
  buyersDta: any;
  orderNoDta: any;
  Order_Value: any;
  styleDta: any;
  style_Value: any;
  colorDta: any;
  color_Value: any;
  sizeDta: any;
  buyers: any;
  order: any;
  stylelist: any;
  colorlist: any;
  sizelist: any;
  cutting: any;
  cuttinglist: any;
  sewingPacklist: any;
  invoicelist: any;
  invoicelinedata: any;
  invoiceheaderdata: any;
  buyervalue:any
  orderNovalue:any
  buyerslist: any;
  OrderNolist: any;
  headerId: any;

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router , private datePipe: DatePipe) { 


    this.InvoiceEty = new FormGroup({
      "id": new FormControl(''),
      "buyer" : new FormControl(''),
      "invoice"  : new FormControl(''),
      "notes" : new FormControl(''),
      "invoiceDate" : new FormControl(''),
      data: this.fb.array([]),

    })

  }

  
  ngOnInit(): void {
    this.api.shipping_buyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  
  this.api.invoice().subscribe((res)=>{
    this.invoicelist = res.invoice;
  })
  this.api.invoiceBuyer().subscribe((res) => {
    this.buyerslist = res.buyer;
  })

  this.api.invoiceOrderNo().subscribe((res) => {
    this.OrderNolist = res.orderNo;
  })

  }


  new(){ this.router.navigate(['main/InvoiceEntry'])}

  date(){
    this.api.invoice('','',this.filterDate1 , this.filterDate2).subscribe((res)=>{
      this.invoicelist = res.invoice
    })
  }

  buyer(){
    this.api.invoice(this.buyervalue,'','' , '').subscribe((res)=>{
      this.invoicelist = res.invoice
    })
  }

  Order(){
    this.api.invoice('',this.orderNovalue,'' , '').subscribe((res)=>{
      this.invoicelist = res.invoice
    })
  }
  
        //-------------------------------------------------------------------------------------------------------

getBuyerValue() {
  // this.buyerName = event.target.value;
  // const formArray = this.InvoiceEty.get('data') as FormArray;
  // const row = formArray.at(index);
  this.Buyer_Value = this.InvoiceEty.get('buyer')?.value;
  this.getorders()
}

getorders() {
  this.api.shipping_buyersorders(this.Buyer_Value).subscribe((res) => {
    this.order = res.orders
  })
}

ordervalue(index:any) {
  // this.Order_Value = event.target.value
  const formArray = this.InvoiceEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value =  this.InvoiceEty.get('buyer')?.value;
  this.Order_Value =  row.get('orderNo')?.value;
  this.orderdata()
}

orderdata() {
  this.api.shipping_ordersstyles(this.Buyer_Value, this.Order_Value).subscribe((res) => {
    this.stylelist = res.styles;
  })
}
stylevalue(index: any) {
  const formArray = this.InvoiceEty.get('data') as FormArray;
  const row = formArray.at(index);
  // this.Buyer_Value = row.get('buyer')?.value;
  // this.Order_Value = row.get('orderNo')?.value;
  this.Buyer_Value =  this.InvoiceEty.get('buyer')?.value;
  this.Order_Value =  row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;

  this.styledata()
}

styledata() {
  this.api.shipping_stylescolors(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

colorvalue(index: any) {
  const formArray = this.InvoiceEty.get('data') as FormArray;
  const row = formArray.at(index);
  // this.Buyer_Value = row.get('buyer')?.value;
  // this.Order_Value = row.get('orderNo')?.value;
  this.Buyer_Value =  this.InvoiceEty.get('buyer')?.value;
  this.Order_Value =  row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;
  this.color_Value = row.get('color')?.value;

  this.colordata()

}

colordata() {
  this.api.shipping_colorssizes(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

getwoId(size: any, index: number){
  this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const woId = res.workorders[0].id;
    // const fabGsm = res.workorders[0].fabGsm;
    // const fabType = res.workorders[0].fabType;
    // const orderPcs = res.workorders[0].orderPcs;


    
    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('woId')?.setValue(woId);
    // row.get('fabGSM')?.setValue(fabGsm);
    // row.get('orderPcs')?.setValue(orderPcs);
    // row.get('fabtype')?.setValue(fabType);
  });

  this.api.getcutdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const cuttingId = res.cutting[0].id;
    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('cutId')?.setValue(cuttingId);
  });

  this.api.getsewinputfilterdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const SewinputEtyId = res.sewinginput[0].id;

    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('inputId')?.setValue(SewinputEtyId);
  });

  this.api.getsewoutputdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const SewoutputEtyId = res.sewingoutput[0].id;

    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('outputId')?.setValue(SewoutputEtyId);
  });


  this.api.getsewingpackingdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
  
    const PackingEtyId = res.sewingpacking[0].id;
    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('packId')?.setValue(PackingEtyId);
  });


  this.api.getshippingdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
  
    const shippingEtyId = res.shipping[0].id;
    const fabGsm = res.shipping[0].fabGSM;
    const fabType = res.shipping[0].fabtype;
    const shipPcs = res.shipping[0].shipPcs;

    const formArray = this.InvoiceEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('shipId')?.setValue(shippingEtyId);
    row.get('fabGSM')?.setValue(fabGsm);
    row.get('shipPcs')?.setValue(shipPcs);
    row.get('fabtype')?.setValue(fabType);
  });
}

//-------------------------------------------------------------------------------------------------------




  get items() {
    return this.InvoiceEty.get("data") as FormArray
  }

  InvoiceEtyAddButton() {

    const row = this.fb.group({
      "id" : [''],
      "headId" : [this.headerId],
      "fabtype" : [''],
      "fabGSM" : [''],
      "orderNo" : [''],
      "style" : [''],
      "color" : [''],
      "size" : [''],
      "woId" : [''],
      "cutId" : [''],
      "inputId" : [''],
      "outputId" : [''],
      "packId" : [''],
      "shipId" : [''],
      "shipPcs" : [''],
      "fobRate" : [''],
      "valueUSD" : [''],
      "remarks" : ['']
    });
    this.items.push(row);    
  }

  delete(index:any){
    this.items.removeAt(index)
  }

  
  exportexcel(){ 
    Swal.fire({
      title: "Are you sure?",
      text: "You Want To Download Report!!!",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Download Pdf",
      denyButtonText: `Download Excel`
    }).then((result) => {
  
      if (result.isConfirmed) {
        
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
   
       const data = this.invoicelist.map((data:any) => [
        data.invoiceDate,
        data.invoice,

        data.buyer,
        data.totalshipPcs,
        data.totalvalue,
       ]);
       (doc as any).autoTable({
         head: [[

          "invoiceDate",
          "invoice",
  
          "buyer",
          "totalshipPcs",
          "totalvalue"
         ]],
         body: data , 
         ...options ,
           theme: 'grid'
       });
       doc.save('InvoiceReport.pdf');
  
  
        Swal.fire({
          title: "Good job!",
          text: "Your PDF Download Compleated !!!",
          icon: "success"
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        let data = document.getElementById("table-data");
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, "InvoiceReport");
      
      
        Swal.fire({
          title: "Good job!",
          text: "Your Excel Download Compleated !!!",
          icon: "success"
        });
      
      }
    });
  }

  edit(id:any){ 
    this.editview = true;
    this.headerId = id
    this.api.invoiceId(id).subscribe((res)=>{

    this.invoicelinedata = res.invoice_line

    this.invoiceheaderdata = res.invoice_head[0]
    this.InvoiceEty.patchValue({       
      invoiceDate : this.datePipe.transform(this.invoiceheaderdata.invoiceDate, 'yyyy-dd-MM')
    })
    this.InvoiceEty.patchValue({
      "id" : this.invoiceheaderdata.id,
      "buyer" : this.invoiceheaderdata.buyer,
      "invoice"  : this.invoiceheaderdata.invoice,
      "notes" : this.invoiceheaderdata.id
      // "invoiceDate" : this.invoiceheaderdata.invoiceDate
    })

    const CutProdEty = this.InvoiceEty.get('data') as FormArray;
    CutProdEty.clear();
 
    const formControls: FormGroup[] = [];
    this.invoicelinedata.forEach((dataItem: any) => {
      formControls.push(
        this.fb.group({
          "id" : dataItem.id,
          "headId" : dataItem.headId,
          "fabtype" : dataItem.fabtype,
          "fabGSM" : dataItem.fabGSM,
          "orderNo" : dataItem.orderNo,
          "style" : dataItem.style,
          "color" : dataItem.color,
          "size" : dataItem.size,
          "woId" : dataItem.woId,
          "cutId" : dataItem.cutId,
          "inputId" : dataItem.inputId,
          "outputId" : dataItem.outputId,
          "packId" : dataItem.packId,
          "shipId" : dataItem.shipId,
          "shipPcs" : dataItem.shipPcs,
          "fobRate" : dataItem.fobRate,
          "valueUSD" : dataItem.valueUSD,
          "remarks" : dataItem.remarks
        })
      );
    });
 
    this.InvoiceEty.setControl('data', this.fb.array(formControls));
  })
  }

  Entry(){ }

  update(){

 if (this.InvoiceEty.valid) {
   this.api.invoicePost(this.InvoiceEty.value).subscribe((res) => {
     if (res.success) {
       Swal.fire({
         position: "top-end",
         icon: "success",
         title: res.message,
         showConfirmButton: false,
         timer: 1500
       });
       this.router.navigate(['main/InvoiceListing'])
       this.editview = false;
       this.api.invoice().subscribe((res)=>{
        this.invoicelist = res.invoice;
      })
     }
     else {
       alert("Error while saving...!!!")
     }
   })
 } else {
   Swal.fire({
     icon: "error",
     title: "Oops...",
     text: "cutId and woId and InputId Missing"
   });
 }
}
  }


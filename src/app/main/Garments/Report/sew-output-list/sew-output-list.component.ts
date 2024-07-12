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
  selector: 'app-sew-output-list',
  templateUrl: './sew-output-list.component.html',
  styleUrls: ['./sew-output-list.component.css']
})
export class SewOutputListComponent implements OnInit {
  SewoutputEty: FormGroup
  valueExceeded: boolean = false;
  viewEntry: boolean = false;
  editview: boolean = false;
  filterDate1: any
  filterDate2: any
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
  sewoutputlist: any;
  SewoutputDate: any;
  Sewoutputlistpath: any;
  buyerslist: any;
  OrderNolist: any;
  buyervalue : any
  orderNovalue:any

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router , private datePipe: DatePipe) {


    this.SewoutputEty = new FormGroup({
      outputDate: new FormControl('', Validators.required),
      data: this.fb.array([]),
    })

  }

  ngOnInit(): void {
    this.api.sewinput_buyers().subscribe((res) => {
      this.buyers = res.buyers;
    })

    this.api.sewoutput().subscribe((res) => {
      this.sewoutputlist = res.sewOutput
    })
  
    this.api.sewoutputBuyer().subscribe((res) => {
      this.buyerslist = res.buyer;
    })

    this.api.sewoutputOrderNo().subscribe((res) => {
      this.OrderNolist = res.orderNo;
    })
  
  }

  new() { this.router.navigate(['main/SewOutputEntry']) }

  date(){
    this.api.sewoutput('','',this.filterDate1 , this.filterDate2).subscribe((res)=>{
      this.sewoutputlist = res.sewOutput
    })
  }

  buyer(){
    this.api.sewoutput(this.buyervalue,'','' , '').subscribe((res)=>{
      this.sewoutputlist = res.sewOutput
    })
  }

  Order(){
    this.api.sewoutput('',this.orderNovalue,'' , '').subscribe((res)=>{
      this.sewoutputlist = res.sewOutput
    })
  }


  //-------------------------------------------------------------------------------------------------------

  getBuyerValue(index: any) {
    // this.buyerName = event.target.value;
    const formArray = this.SewoutputEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.getorders()
  }

  getorders() {
    this.api.sewinput_buyersorders(this.Buyer_Value).subscribe((res) => {
      this.order = res.orders
    })
  }

  ordervalue(index: any) {
    // this.Order_Value = event.target.value
    const formArray = this.SewoutputEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderNo')?.value;
    this.orderdata()
  }

  orderdata() {
    this.api.sewinput_ordersstyles(this.Buyer_Value, this.Order_Value).subscribe((res) => {
      this.stylelist = res.styles;
    })
  }
  stylevalue(index: any) {
    const formArray = this.SewoutputEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderNo')?.value;
    this.style_Value = row.get('style')?.value;

    this.styledata()
  }

  styledata() {
    this.api.sewinput_stylescolors(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  colorvalue(index: any) {
    const formArray = this.SewoutputEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderNo')?.value;
    this.style_Value = row.get('style')?.value;
    this.color_Value = row.get('color')?.value;

    this.colordata()

  }

  colordata() {
    this.api.sewinput_colorssizes(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }

  getwoId(size: any, index: number) {
    this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      console.log(woId)
      const formArray = this.SewoutputEty.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('woId')?.setValue(woId);
    });

    this.api.getcutdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
      const cuttingId = res.cutting[0].id;
      console.log(cuttingId)
      const formArray = this.SewoutputEty.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('cutId')?.setValue(cuttingId);
    });

    this.api.getsewinputfilterdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
      const SewoutputEtyId = res.sewinginput[0].id;
      console.log(SewoutputEtyId)
      const formArray = this.SewoutputEty.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('inputId')?.setValue(SewoutputEtyId);
    });
  }

  //-------------------------------------------------------------------------------------------------------


  get items() {
    return this.SewoutputEty.get("data") as FormArray
  }

  SewOutputEtyAddButton() {

    const row = this.fb.group({
      "id": [],
      "buyer": [''],
      "orderNo": [''],
      "style": [''],
      "color": [''],
      "size": [''],
      "woId": [''],
      "cutId": [''],
      "inputId": [''],
      "lineNo": [''],
      "bundleNo": [''],
      "mcUsed": [''],
      "mpUsed": [''],
      "mcHrs": [''],
      "outputPcs": [''],
      "timeperiod": [''],

    });
    this.items.push(row);

  }

  delete(index: any) {
    this.items.removeAt(index)
  }

  update() {
    console.log(this.SewoutputEty.value)
    // this.router.navigate(['main/SewOutputList'])

    if (this.SewoutputEty.valid) {
      this.api.sewoutputPost(this.SewoutputEty.value).subscribe((res) => {
        if (res.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['main/SewOutputList'])
        this.editview = false ;
        
        this.api.sewoutput().subscribe((res) => {
          this.sewoutputlist = res.sewOutput
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



  edit(id: any) {
    this.editview = true;
    this.api.sewoutputId(id).subscribe((res) => {
      console.log(res)
      this.Sewoutputlistpath = res.sewOutput
      this.SewoutputDate = res.sewOutput[0].outputDate
      this.SewoutputEty.patchValue({       
        outputDate : this.datePipe.transform(this.SewoutputDate, 'yyyy-dd-MM')
      })

      const CutProdEty = this.SewoutputEty.get('data') as FormArray;
      CutProdEty.clear();

      const formControls: FormGroup[] = [];
      this.Sewoutputlistpath.forEach((dataItem: any) => {
        formControls.push(
          this.fb.group({
            "id": dataItem.id,
            "buyer": dataItem.buyer,
            "orderNo": dataItem.orderNo,
            "style": dataItem.style,
            "color": dataItem.color,
            "size": dataItem.size,
            "lineNo": dataItem.lineNo,
            "mcUsed": dataItem.mcUsed,
            "mpUsed": dataItem.mpUsed,
            "mcHrs": dataItem.mcHrs,
            "outputPcs": dataItem.outputPcs,
            "timeperiod": dataItem.timeperiod,
            "bundleNo": dataItem.bundleNo,
          })
        );
      });

      this.SewoutputEty.setControl('data', this.fb.array(formControls));
    })
  }

  exportexcel() {

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
   
       const data = this.sewoutputlist.map((data:any) => [
        data.buyer,
        data.orderNo,
        data.style,

        data.color,
        data.size,
        data.lineNo,
        data.mcUsed,
        data.mpUsed,
        data.mcHrs,
        data.outputPcs,
        data.timeperiod,
        data.bundleNo
       ]);
       (doc as any).autoTable({
         head: [[

          "buyer",
          "orderNo",
          "style",
  
          "color",
          "size",
          "lineNo",
          "mcUsed",
          "mpUsed",
          "mcHrs",
          "outputPcs",
          "timeperiod",
          "bundleNo"
         ]],
         body: data , 
         ...options ,
           theme: 'grid'
       });
       doc.save('SewingOutputReport.pdf');
  
  
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
        XLSX.writeFile(wb, "SewingOutputReport");
      
      
        Swal.fire({
          title: "Good job!",
          text: "Your Excel Download Compleated !!!",
          icon: "success"
        });
      
      }
    });
  }


  Entry() { }
  
}

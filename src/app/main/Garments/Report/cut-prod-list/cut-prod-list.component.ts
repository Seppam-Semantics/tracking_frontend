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
  selector: 'app-cut-prod-list',
  templateUrl: './cut-prod-list.component.html',
  styleUrls: ['./cut-prod-list.component.css']
})
export class CutProdListComponent implements OnInit{

  CutProdEty : FormGroup
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  filterDate1 : any
  filterDate2 : any
  cuttinglist: any;
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
  cuttinglistpath: any;
  cuttingDate: any;
  cutDate: any;
  buyerslist: any;
  OrderNolist: any;
  buyervalue:any
  orderNovalue:any


  ngOnInit(): void {
    this.api.cutting().subscribe((res)=>{
      this.cuttinglist = res.cutting
    })

    this.api.getbuyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  
    this.api.CuttingBuyer().subscribe((res) => {
      this.buyerslist = res.buyer;
    })

    this.api.CuttingOrderNo().subscribe((res) => {
      this.OrderNolist = res.orderNo;
    })
    

  
  }

  constructor(private fb: FormBuilder, private api: ApiService , private router : Router , private datePipe: DatePipe) { 


    this.CutProdEty = new FormGroup({
      cutDate : new FormControl() ,
      data: this.fb.array([]),
    })

  }

  new(){ this.router.navigate(['main/CutProdEntry'])}

  get items() {
    return this.CutProdEty.get("data") as FormArray
  }

  CutProdEtyAddButton() {

    const row = this.fb.group({
     "id": [''],
      "buyer": [''],
      "orderNo": [''],
      "style": [''],
      "color": [''],
      "size": [''],
      "woId": ['',Validators.required],
      "batch": [''],
      "rolls": [''],
      "cutPcs": ['']
    });
    this.items.push(row);

  }

  
date(){
  this.api.cutting('','',this.filterDate1 , this.filterDate2).subscribe((res)=>{
    this.cuttinglist = res.cutting
  })
}

buyer(){
  this.api.cutting(this.buyervalue,'','' , '').subscribe((res)=>{
    this.cuttinglist = res.cutting
  })
}

Order(){
  this.api.cutting('',this.orderNovalue,'' , '').subscribe((res)=>{
    this.cuttinglist = res.cutting
  })
}


  getBuyerValue(index: any) {
    // this.buyerName = event.target.value;
    const formArray = this.CutProdEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.getorders()
  }

  getorders() {
    this.api.getorders(this.Buyer_Value).subscribe((res) => {
      this.order = res.orders
    })
  }

  ordervalue(index: any) {
    // this.Order_Value = event.target.value
    const formArray = this.CutProdEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value =  row.get('buyer')?.value;
    this.Order_Value =  row.get('orderNo')?.value;
    this.orderdata()
  }

  orderdata() {
    this.api.getstyle(this.Buyer_Value, this.Order_Value).subscribe((res) => {
      this.stylelist = res.styles;
    })
  }
  stylevalue(index: any) {
    const formArray = this.CutProdEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderNo')?.value;
    this.style_Value = row.get('style')?.value;

    this.styledata()
  }

  styledata() {
    this.api.getcolor(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  colorvalue(index: any) {
    const formArray = this.CutProdEty.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderNo')?.value;
    this.style_Value = row.get('style')?.value;
    this.color_Value = row.get('color')?.value;

    this.colordata()

  }

  colordata() {
    this.api.getsize(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }

  getwoId(size: any, index: number){
    this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
      const woId = res.workorders[0].id;
      const formArray = this.CutProdEty.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('woId')?.setValue(woId);
    });
}



  delete(index:any){
    this.items.removeAt(index)
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
   
       const data = this.cuttinglist.map((row:any) => [
        row.cutDate , 
        row.buyer , 
        row.orderNo , 
        row.style , 
        row.color , 
        row.size,
        row.batch,
        row.rolls ,
        row.cutPcs
       ]);
       (doc as any).autoTable({
         head: [[

          "cutDate" ,
          "buyer",
          "orderNo",
          "style",
          "color",
          "size",
          "batch",
          "rolls",
          "cutPcs"
         ]],
         body: data , 
         ...options ,
           theme: 'grid'
       });
       doc.save('CutProdReport.pdf');
  
  
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
        XLSX.writeFile(wb, "Cut Production Report");
      
      
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
    this.api.cuttingId(id).subscribe((res)=>{
      this.cuttinglistpath = res.cuttinga
      this.cuttingDate = res.cuttinga[0].cutDate
      this.CutProdEty.patchValue({       
        cutDate : this.datePipe.transform(this.cuttingDate, 'yyyy-MM-dd')
      })

      const CutProdEty = this.CutProdEty.get('data') as FormArray;
      CutProdEty.clear();

      const formControls: FormGroup[] = [];
      this.cuttinglistpath.forEach((dataItem: any) => {
        formControls.push(
          this.fb.group({
            "id": dataItem.id,
            "buyer": dataItem.buyer,
            "orderNo": dataItem.orderNo,
            "style": dataItem.style,
            "color": dataItem.color,
            "size": dataItem.size,
            "woId": dataItem.woId,
            "batch": dataItem.batch,
            "rolls": dataItem.rolls,
            "cutPcs": dataItem.cutPcs
          })
        );
      });

      this.CutProdEty.setControl('data', this.fb.array(formControls));

    })
   }

   update(){

    if (this.CutProdEty.valid) {
      this.api.cuttingPost(this.CutProdEty.value).subscribe((res) => {
        if (res.success) {
          
          this.editview = false;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        
          this.api.cutting().subscribe((res)=>{
            this.cuttinglist = res.cutting
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
        text: "Size Id Missing"
      });
    }
   }
  Entry(){ }

}

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
  selector: 'app-sew-input-list',
  templateUrl: './sew-input-list.component.html',
  styleUrls: ['./sew-input-list.component.css']
})
export class SewInputListComponent implements OnInit{
  SewinputEty : FormGroup
  valueExceeded : boolean = false;
  viewEntry : boolean = false;
  editview : boolean = false; 
  filterDate1 : any
  filterDate2 : any
  sewInputlist: any;
  Sewinputlistpath: any;
  SewinputDate: any;

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
  buyerslist: any;
  OrderNolist: any;
  buyervalue:any
  orderNovalue: string | undefined;


  ngOnInit(): void {
    this.api.sewing().subscribe((res)=>{
      this.sewInputlist  = res.sewInput
    })

    this.api.cut_buyers().subscribe((res) => {
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


    this.SewinputEty = new FormGroup({
      inputDate : new FormControl('', Validators.required) ,
      data: this.fb.array([]),
    })

  }

  new(){ this.router.navigate(['main/SewInputEntry'])}

  date(){
    this.api.sewing('','',this.filterDate1 , this.filterDate2).subscribe((res)=>{
      this.sewInputlist = res.sewInput
    })
  }
  
  buyer(){
    this.api.sewing(this.buyervalue,'','' , '').subscribe((res)=>{
      this.sewInputlist = res.sewInput
    })
  }
  
  Order(){
    this.api.sewing('',this.orderNovalue,'' , '').subscribe((res)=>{
      this.sewInputlist = res.sewInput
    })
  }

  //-------------------------------------------------------------------------------------------------------

getBuyerValue(index: any) {
  // this.buyerName = event.target.value;
  const formArray = this.SewinputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.getorders()
}

getorders() {
  this.api.cut_buyersorders(this.Buyer_Value).subscribe((res) => {
    this.order = res.orders
  })
}

ordervalue(index: any) {
  // this.Order_Value = event.target.value
  const formArray = this.SewinputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value =  row.get('buyer')?.value;
  this.Order_Value =  row.get('orderNo')?.value;
  this.orderdata()
}

orderdata() {
  this.api.cut_ordersstyles(this.Buyer_Value, this.Order_Value).subscribe((res) => {
    this.stylelist = res.styles;
  })
}
stylevalue(index: any) {
  const formArray = this.SewinputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.Order_Value = row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;

  this.styledata()
}

styledata() {
  this.api.cut_stylescolors(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

colorvalue(index: any) {
  const formArray = this.SewinputEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.Order_Value = row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;
  this.color_Value = row.get('color')?.value;

  this.colordata()

}

colordata() {
  this.api.cut_colorssizes(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

getwoId(size: any, index: number){
  this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const woId = res.workorders[0].id;
    console.log(res)
    const formArray = this.SewinputEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('woId')?.setValue(woId);
  });

  this.api.getcutdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const cuttingId = res.cutting[0].id;
    console.log(res)
    const formArray = this.SewinputEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('cutId')?.setValue(cuttingId);
  });
}

//-------------------------------------------------------------------------------------------------------


  get items() {
    return this.SewinputEty.get("data") as FormArray
  }

  SewinputEtyAddButton() {

    const row = this.fb.group({
      "id": [''],
      "woId":['',Validators.required],
      "buyer": [''],
      "orderNo": [''],
      "style": [''],
      "color": [''],
      "size": [''],
      "cutId": ['',Validators.required],
      "lineNo": [''],
      "inputPcs": [''],
      "bundleNo": ['']
    });
    this.items.push(row);

  }

  delete(index:any){
    this.items.removeAt(index)
  }


  update(){
    // this.router.navigate(['main/SewInputList'])
      if (this.SewinputEty.valid) {
        this.api.sewingPost(this.SewinputEty.value).subscribe((res) => {
          if (res.success) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: res.message,
              showConfirmButton: false,
              timer: 1500
            });
            this.editview = false;
            this.api.sewing().subscribe((res)=>{
              this.sewInputlist  = res.sewInput
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
          text: "cutId and woId Missing"
        });
      }    

  }

  edit(id:any){ 
    this.editview = true;
    this.api.sewingId(id).subscribe((res)=>{
      console.log(res)
      this.Sewinputlistpath = res.sewInput
      this.SewinputDate = res.sewInput[0].inputDate
      this.SewinputEty.patchValue({       
        inputDate : this.datePipe.transform(this.SewinputDate, 'yyyy-MM-dd')
      })

      const CutProdEty = this.SewinputEty.get('data') as FormArray;
      CutProdEty.clear();

      const formControls: FormGroup[] = [];
      this.Sewinputlistpath.forEach((dataItem: any) => {
        formControls.push(
          this.fb.group({
            "id": dataItem.id,
            "buyer": dataItem.buyer,
            "orderNo": dataItem.orderNo,
            "style": dataItem.style,
            "color": dataItem.color,
            "size": dataItem.size,
            "woId": dataItem.woId,
            "cutId":dataItem.cutId,
            "lineNo": dataItem.lineNo,
            "inputPcs": dataItem.inputPcs,
            "bundleNo": dataItem.bundleNo
          })
        );
      });

      this.SewinputEty.setControl('data', this.fb.array(formControls));

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
   
       const data = this.sewInputlist.map((data:any) => [
        data.inputDate,
        data.buyer,
        data.orderNo,
        data.style,
        data.color,
        data.size,
        data.lineNo,
        data.inputPcs,
        data.bundleNo,
       ]);
       (doc as any).autoTable({
         head: [[

          "inputDate",
          "buyer",
          "orderNo",
          "style",
          "color",
          "size",
          "lineNo",
          "inputPcs",
          "bundleNo"
         ]],
         body: data , 
         ...options ,
           theme: 'grid'
       });
       doc.save('SewingInputReport.pdf');
  
  
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
        XLSX.writeFile(wb, "Sewing Input Report");
      
      
        Swal.fire({
          title: "Good job!",
          text: "Your Excel Download Compleated !!!",
          icon: "success"
        });
      
      }
    });
  }


  Entry(){ }

}

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
  selector: 'app-sewing-packing-list',
  templateUrl: './sewing-packing-list.component.html',
  styleUrls: ['./sewing-packing-list.component.css']
})
export class SewingPackingListComponent {

  SewPkEty : FormGroup
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
  Sewpackinglistpath: any;
  SewpackingDate: any;
  buyerslist: any;
  OrderNolist: any;
  buyervalue:any
  orderNovalue:any
  outputDetails: any;
  toleranceValid: any[] = [];
  size_Value: any;
  constructor(private fb: FormBuilder, private api: ApiService , private router : Router , private datePipe: DatePipe) { 


    this.SewPkEty = new FormGroup({
      packDate : new FormControl('', Validators.required) ,
      data: this.fb.array([]),
    })

  }

  ngOnInit(): void {
    this.api.sewoutput_buyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  
  this.api.sewingpacking().subscribe((res)=>{
    this.sewingPacklist = res.sewingPack
  })

  this.api.sewingpackingBuyer().subscribe((res) => {
    this.buyerslist = res.buyer;
  })

  this.api.sewingpackingOrderNo().subscribe((res) => {
    this.OrderNolist = res.orderNo;
  })
  
  }

  new(){ this.router.navigate(['main/SewingPackingEntry'])}


  date(){
    this.api.sewingpacking('','',this.filterDate1 , this.filterDate2).subscribe((res)=>{
      this.sewingPacklist = res.sewingPack
    })
  }

  buyer(){
    this.api.sewingpacking(this.buyervalue,'','' , '').subscribe((res)=>{
      this.sewingPacklist = res.sewingPack
    })
  }

  Order(){
    this.api.sewingpacking('',this.orderNovalue,'' , '').subscribe((res)=>{
      this.sewingPacklist = res.sewingPack
    })
  }

  
    //-------------------------------------------------------------------------------------------------------

getBuyerValue(index: any) {
  // this.buyerName = event.target.value;
  const formArray = this.SewPkEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.getorders()
}

getorders() {
  this.api.sewoutput_buyersorders(this.Buyer_Value).subscribe((res) => {
    this.order = res.orders
  })
}

ordervalue(index: any) {
  // this.Order_Value = event.target.value
  const formArray = this.SewPkEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value =  row.get('buyer')?.value;
  this.Order_Value =  row.get('orderNo')?.value;
  this.orderdata()
}

orderdata() {
  this.api.sewoutput_ordersstyles(this.Buyer_Value, this.Order_Value).subscribe((res) => {
    this.stylelist = res.styles;
  })
}
stylevalue(index: any) {
  const formArray = this.SewPkEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.Order_Value = row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;

  this.styledata()
}

styledata() {
  this.api.sewoutput_stylescolors(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
    this.colorlist = res.colors;
  })
}

colorvalue(index: any) {
  const formArray = this.SewPkEty.get('data') as FormArray;
  const row = formArray.at(index);
  this.Buyer_Value = row.get('buyer')?.value;
  this.Order_Value = row.get('orderNo')?.value;
  this.style_Value = row.get('style')?.value;
  this.color_Value = row.get('color')?.value;

  this.colordata()

}

colordata() {
  this.api.sewoutput_colorssizes(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
    this.sizelist = res.sizes;
  })
}

getwoId(size: any, index: number){
  this.api.getwodetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const woId = res.workorders[0].id;

    const formArray = this.SewPkEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('woId')?.setValue(woId);
  });

  this.api.getcutdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const cuttingId = res.cutting[0].id;

    const formArray = this.SewPkEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('cutId')?.setValue(cuttingId);
  });

  this.api.getsewinputfilterdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const SewinputEtyId = res.sewinginput[0].id;

    const formArray = this.SewPkEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('inputId')?.setValue(SewinputEtyId);
  });

  this.api.getsewoutputdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, size).subscribe((res) => {
    const SewoutputEtyId = res.sewingoutput[0].id;
    this.outputDetails = res.sewingoutput[0].outputPcs

    const formArray = this.SewPkEty.get('data') as FormArray;
    const row = formArray.at(index);
    row.get('outputId')?.setValue(SewoutputEtyId);
  });
}

//-------------------------------------------------------------------------------------------------------



  get items() {
    return this.SewPkEty.get("data") as FormArray
  }

  SewPkEtyAddButton() {

    const row = this.fb.group({
      "id": [''],
      "buyer": [''],
      "orderNo": [''],
      "style": [''],
      "color": [''],
      "size": [''],

      "woId": ['',Validators.required],
      "cutId": ['',Validators.required],
      "inputId": ['',Validators.required],
      "outputId": ['',Validators.required],
      
      "lineNo": [''],
      "mpUsed": [''],
      "mcUsed":[''],
      "mcHrs": [''],
      "bundleNo": [''],
      "timeperiod": [''],
      "packPcs": [''],
      "cartonbox" :['']
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
   
       const data = this.sewingPacklist.map((data:any) => [
        data.packDate,
        data.buyer,

        data.orderNo,
        data.style,
        data.color,

        data.size,
        data.lineNo,
        data.bundleNo,
        
        data.timeperiod,
        data.packPcs,
        data.cartonbox
       ]);
       (doc as any).autoTable({
         head: [[

          "packDate",
          "buyer",
  
          "orderNo",
          "style",
          "color",
  
          "size",
          "lineNo",
          "bundleNo",
          
          "timeperiod",
          "packPcs",
          "cartonbox"
         ]],
         body: data , 
         ...options ,
           theme: 'grid'
       });
       doc.save('SewingPackingReport.pdf');
  
  
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
        XLSX.writeFile(wb, "SewingPackingReport");
      
      
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
    this.api.sewingpackingId(id).subscribe((res) => {
      this.Sewpackinglistpath = res.sewingPack
      this.SewpackingDate = res.sewingPack[0].packDate

      this.Buyer_Value = res.sewingPack[0].buyer
      this.Order_Value = res.sewingPack[0].orderNo
      this.style_Value = res.sewingPack[0].style
      this.color_Value = res.sewingPack[0].color
      this.size_Value = res.sewingPack[0].size

      this.SewPkEty.patchValue({       
        packDate : this.datePipe.transform(this.SewpackingDate, 'yyyy-dd-MM')
      })

      this.api.getsewoutputdetails(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value, this.size_Value).subscribe((res) => {
        const SewoutputEtyId = res.sewingoutput[0].id;
        this.outputDetails = res.sewingoutput[0].outputPcs
      });

      const CutProdEty = this.SewPkEty.get('data') as FormArray;
      CutProdEty.clear();

      const formControls: FormGroup[] = [];
      this.Sewpackinglistpath.forEach((dataItem: any) => {
        formControls.push(
          this.fb.group({
            "id": dataItem.id,
            "packDate": dataItem.packDate,
            "buyer": dataItem.buyer,
            "orderNo": dataItem.orderNo,
            "style": dataItem.style,
            "color": dataItem.color,
            "size": dataItem.size,
            "lineNo": dataItem.lineNo,
            "packPcs": dataItem.packPcs,
            "mpUsed": dataItem.mpUsed,
            "cartonbox":dataItem.cartonbox ,
            "mcHrs": dataItem.mcHrs,
            "outputPcs": dataItem.outputPcs,
            "timeperiod": dataItem.timeperiod,
            "bundleNo": dataItem.bundleNo            
          })
        );
      });

      this.SewPkEty.setControl('data', this.fb.array(formControls));
    })

   }
  Entry(){ }
  valid(value:any, i:any){
    const inputValue = value;
    const tolerance = (this.outputDetails)
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

  update(){
    if (this.SewPkEty.valid) {
      this.api.sewingpackingPost(this.SewPkEty.value).subscribe((res) => {
        if (res.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['main/SewingPackingList'])
          this.api.sewingpacking().subscribe((res)=>{
            this.sewingPacklist = res.sewingPack
          })
          this.editview = false;
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

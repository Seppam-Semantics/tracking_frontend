import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-style-creation',
  templateUrl: './style-creation.component.html',
  styleUrls: ['./style-creation.component.css']
})
export class StyleCreationComponent implements OnInit{
  Stylecreation : boolean = false;

  Styleediting : boolean = false;
  
  Stylecreate! : FormGroup
  
  Styleedit! : FormGroup
  buyerDrop: any;
  allData: any;
  datalist: any;
  allData2: any;
  buyerId: any;
  selectedBuyer: any = [];
  buyerName: any;
  Id: any;
  BuyerName : any;
  Buyer: any;
  factorynamevalue: any;
  Buyernamevalue: any;
  buyerid: any;
  styleFillterData: any;
  all: any;
  
  ngOnInit(): void {

this.api.Drop_Buyer_master().subscribe((res)=>{
  this.buyerDrop = res.buyer ;
})

this.api.style_master_AllData().subscribe((res)=>{
  this.all = res.style
})
this.stylefilter()
  }

  stylefilter(){
    this.api.style_master_Fillter_Data(this.styleFillterData).subscribe((res)=>{
      this.allData2 = res.styles

    })
  }
  constructor(private fb : FormBuilder , private api : ApiService){
  
    this.Stylecreate = this.fb.group({
      id : new FormControl('') , 
      style : new FormControl('') ,
      stylecode : new FormControl(''),
      styletype : new FormControl('') , 
      utility : new FormControl('') , 
      buyer : new FormControl('') , 
      buyerId : new FormControl('') , 
      brand : new FormControl('') 
    })
  
  
    this.Styleedit = this.fb.group({
      id : new FormControl('') , 
      style : new FormControl('') ,
      stylecode : new FormControl(''),
      styletype : new FormControl('') , 
      utility : new FormControl('') , 
      buyer : new FormControl('') , 
      buyerId : new FormControl('') , 
      brand : new FormControl('') 
    })
  } 
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  

  edit(id:any){
    this.api.style_master_SingleData(id).subscribe((res)=>{
      this.datalist = res.styles
      this.Styleedit .patchValue({
        id :this.datalist[0].id, 
        style : this.datalist[0].style,
        stylecode : this.datalist[0].style_code,
        styletype :  this.datalist[0].style_type, 
        utility :  this.datalist[0].utility, 
        buyer :  this.datalist[0].buyer,
        brand :  this.datalist[0].brand,
        buyerId :  this.datalist[0].buyerId,
      })
    })
  }

  getbuyerId() {
    this.api.BuyerId(this.Buyernamevalue).subscribe((res)=>{
      this.buyerid = res.buyer[0].id
      console.log(this.buyerid)
      this.Stylecreate.patchValue({
        buyerId : this.buyerid 
      })
    })
  }


update(){
  this.api.style_master(this.Styleedit.value).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

delete(id:any){
  this.api.delete_style_master(id).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

  saveButton(){
    this.api.style_master(this.Stylecreate.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }
  
  }
  
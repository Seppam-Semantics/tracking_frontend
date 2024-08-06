import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-color-creation',
  templateUrl: './color-creation.component.html',
  styleUrls: ['./color-creation.component.css']
})
export class ColorCreationComponent {

  Colorcreation : boolean = false;

  Colorediting : boolean = false;
  
  Colorcreate! : FormGroup
  
  Coloredit! : FormGroup
  allData: any;
  datalist: any;
  buyerDrop: any;
  allData3: any;
  ColorData: any;
  Buyernamevalue: any;
  buyerid: any;
  colorfilterdata: any;
  AllColor = this.masters.colorData;
  
  ngOnInit(): void {

    // this.api.Color_master_AllData().subscribe((res)=>{
    //   this.AllColor = res.colors
    // })
    
    // this.colorfilter()

    this.Drop_Buyer_master()
  }
  constructor(private fb : FormBuilder , private api : ApiService, public masters : MasterService){
  
    this.Colorcreate = this.fb.group({
      id : new FormControl('') , 
      color : new FormControl('') ,
      colorcode : new FormControl(''),
      buyer : new FormControl('') , 
      diacorrection : new FormControl('') , 
      dyeprocessloss : new FormControl('') , 
      buyerId : new FormControl('') , 
    })
  
  
    this.Coloredit = this.fb.group({
      id : new FormControl('') , 
      color : new FormControl('') ,
      colorcode : new FormControl(''),
      buyer : new FormControl('') , 
      diacorrection : new FormControl('') , 
      dyeprocessloss : new FormControl(''),
      buyerId : new FormControl('') 
    })
    
  }

  Drop_Buyer_master(){
  this.api.Drop_Buyer_master().subscribe((res)=>{
    this.buyerDrop = res.buyer
  })
}


  colorfilter(){
    this.api.Color_master_Fillter_Data(this.colorfilterdata).subscribe((res)=>{
      this.masters.colorData = res.colors
    })
  }
  

  edit(id:any){
    this.api.Color_master_SingleData(id).subscribe((res)=>{
      this.datalist = res.colors
      this.Coloredit .patchValue({
        id :this.datalist[0].id, 
        color : this.datalist[0].color,
        colorcode : this.datalist[0].color_code,
        diacorrection :  this.datalist[0].dia_correction, 
        buyer :  this.datalist[0].buyer, 
        dyeprocessloss :  this.datalist[0].dye_process_loss,
        buyerId :  this.datalist[0].buyerId
      })
    })
  }

update(){
  this.api.Color_master(this.Coloredit.value).subscribe((res)=>{
    Swal.fire({
      title: "Updated SuccessFully!",
      text: "You clicked the button!",
      icon: "success"
    });
    this.colorfilter()
  })
  this.Colorediting = false
  this.Colorcreate.reset()
  this.Coloredit.reset()
  this.api.Color_master_AllData().subscribe((res)=>{
    this.AllColor = res.colors
  })
}

delete(id:any){
  this.api.delete_style_master(id).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

getbuyerId() {
  this.api.BuyerId(this.Buyernamevalue).subscribe((res)=>{
    this.buyerid = res.buyer[0].id

    this.Colorcreate.patchValue({
      buyerId : this.buyerid 
    })
  })
}

  saveButton(){
    this.api.Color_master(this.Colorcreate.value).subscribe((res)=>{
      Swal.fire({
        title: "Added SuccessFully!",
        text: "You clicked the button!",
        icon: "success"
      });
      this.colorfilter()
      this.api.Color_master_AllData().subscribe((res)=>{
        this.AllColor = res.colors
      })
      this.Colorcreation = false
      this.Colorcreate.reset()
    })

  }
}
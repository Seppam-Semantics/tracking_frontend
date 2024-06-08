import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-fabricsdia-creation',
  templateUrl: './fabricsdia-creation.component.html',
  styleUrls: ['./fabricsdia-creation.component.css']
})
export class FabricsdiaCreationComponent {
  Fabricsdiacreation : boolean = false;

  Fabricsdiaediting : boolean = false;
  
  Fabricsdiacreate! : FormGroup
  
  Fabricsdiaedit! : FormGroup
  styleDropdata: any;
  Stylenamevalue: any;
  styleid: any;
  sizeid: any;
  sizeDropdata: any;
  Sizenamevalue: any;
  fsizedata: any;
  datalist: any;
  
  ngOnInit(): void {
    

    this.api.fsize_master_AllData().subscribe((res)=>{
      this.fsizedata = res.fsize

    })


    this.api.Drop_Style_master().subscribe((res)=>{
      this.styleDropdata = res.style
    })


    this.api.Drop_Size_master().subscribe((res)=>{
      this.sizeDropdata = res.sizes
    })

  }

  getstyleId() {
    this.api.StyleId(this.Stylenamevalue).subscribe((res)=>{
      this.styleid = res.style[0].id
      console.log(this.styleid)
      this.Fabricsdiacreate.patchValue({
        styleId : this.styleid 
      })
    })
  }

  getsizeId() {
    this.api.SizeId(this.Sizenamevalue).subscribe((res)=>{
      this.sizeid = res.sizes[0].id
      console.log(this.sizeid)
      this.Fabricsdiacreate.patchValue({
        sizeId : this.sizeid 
      })
    })
  }

  constructor(private fb : FormBuilder, private api : ApiService){
  
    this.Fabricsdiacreate = this.fb.group({
      id : new FormControl('') , 
      styleName : new FormControl('') ,
      styleId : new FormControl('') ,
      sizeName : new FormControl('') ,
      sizeId : new FormControl('') ,
      chestSize : new FormControl('') ,
      length : new FormControl('') ,
      sleeve : new FormControl('') ,
      allow : new FormControl('') ,
      pattern : new FormControl('') ,
      GSM : new FormControl('') ,
      bodyCon : new FormControl('') ,
      neckTape : new FormControl('') ,
      neckRIB : new FormControl('') ,
      others : new FormControl('') ,
      finishFabricsConsumptionDozn : new FormControl('') ,
      machineDia : new FormControl('') ,
      finishDia : new FormControl('')
    })
  
  
    this.Fabricsdiaedit = this.fb.group({
      id : new FormControl('') , 
      styleName : new FormControl('') ,
      styleId : new FormControl('') ,
      sizeName : new FormControl('') ,
      sizeId : new FormControl('') ,
      chestSize : new FormControl('') ,
      length : new FormControl('') ,
      sleeve : new FormControl('') ,
      allow : new FormControl('') ,
      pattern : new FormControl('') ,
      GSM : new FormControl('') ,
      bodyCon : new FormControl('') ,
      neckTape : new FormControl('') ,
      neckRIB : new FormControl('') ,
      others : new FormControl('') ,
      finishFabricsConsumptionDozn : new FormControl('') ,
      machineDia : new FormControl('') ,
      finishDia : new FormControl('')
    })
  }
  
  edit(id:any){
    this.api.fsize_master_SingleData(id).subscribe((res)=>{
      this.datalist = res.fsize
      this.Fabricsdiaedit .patchValue({
        id : this.datalist[0].id , 
        styleName : this.datalist[0].style ,
        styleId :  this.datalist[0].sizeId,
        sizeName :  this.datalist[0].size,
        sizeId : this.datalist[0].styleId ,
        chestSize : this.datalist[0]. chestSize,
        length : this.datalist[0].length ,
        sleeve : this.datalist[0].sleeve ,
        allow : this.datalist[0].allow ,
        pattern : this.datalist[0].pattern ,
        GSM : this.datalist[0].gsm ,
        bodyCon : this.datalist[0].bodyCon ,
        neckTape : this.datalist[0].neckType ,
        neckRIB : this.datalist[0].neckRIB ,
        others : this.datalist[0].others ,
        finishFabricsConsumptionDozn : this.datalist[0].finishfabConsumption ,
        machineDia : this.datalist[0].machineDia ,
        finishDia : this.datalist[0].finishDia
      })
    })
  }




  update(){
    this.api.fsize_master(this.Fabricsdiaedit.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }
  
  delete(id:any){
    this.api.delete_fsize_master(id).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }


  saveButton(){
    this.api.fsize_master(this.Fabricsdiacreate.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }
}
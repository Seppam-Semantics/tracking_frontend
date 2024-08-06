import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import { MasterService } from '../master.service';

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


  constructor(private fb : FormBuilder, private api : ApiService, public masters : MasterService){
  
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
      finishDia : new FormControl(''),
      concatSize : new FormControl('', Validators.required)
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
      finishDia : new FormControl(''),
      concatSize : new FormControl('', Validators.required)
    })
  }
  
  ngOnInit(): void {
    // this.api.fsize_master_AllData().subscribe((res)=>{
    //   this.fsizedata = res.fsize
    // })
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

      this.Fabricsdiacreate.patchValue({
        styleId : this.styleid 
      })
    })
  }

  getsizeId() {
    this.api.SizeId(this.Sizenamevalue).subscribe((res)=>{
      this.sizeid = res.sizes[0].id

      this.Fabricsdiacreate.patchValue({
        sizeId : this.sizeid 
      })
      this.concatedSize()
      this.editConcatedSize()
    })
  }

  fsize_filter(event:any){
    const size = event.target.value
    this.api.fsize_master_filter(size).subscribe((res)=>{
      this.masters.fabricDiaData = res.fsize

    })
  }
  
  edit(id:any){
    this.api.fsize_master_SingleData(id).subscribe((res)=>{
      this.datalist = res.fsize
      // console.log(this.datalist)
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
        finishDia : this.datalist[0].finishDia,
        concatSize : this.datalist[0].concatSize ? this.datalist[0].concatSize : this.datalist[0].machineDia + '-' + this.datalist[0].size + '-' + this.datalist[0].finishDia
      })
    })
  }

  concatedSize(){
    const machineDia = this.Fabricsdiacreate.get('machineDia')?.value;
    const size = this.Fabricsdiacreate.get('sizeName')?.value;
    const finishDia = this.Fabricsdiacreate.get('finishDia')?.value;
    const concatSize = machineDia  + '-' + size + '-' + finishDia
    this.Fabricsdiacreate.get('concatSize')?.setValue(concatSize)
  }

  editConcatedSize(){
    const machineDia = this.Fabricsdiaedit.get('machineDia')?.value;
    const size = this.Fabricsdiaedit.get('sizeName')?.value;
    const finishDia = this.Fabricsdiaedit.get('finishDia')?.value;
    const concatSize = machineDia  + '-' + size + '-' + finishDia
    this.Fabricsdiaedit.get('concatSize')?.setValue(concatSize)
  }

  update(){
    this.api.fsize_master(this.Fabricsdiaedit.value).subscribe((res)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      
      this.api.fsize_master_AllData().subscribe((res)=>{
        this.fsizedata = res.fsize
      })
      this.api.Drop_Style_master().subscribe((res)=>{
        this.styleDropdata = res.style
      })
      this.api.Drop_Size_master().subscribe((res)=>{
        this.sizeDropdata = res.sizes
      })
      this.Fabricsdiaediting = false
    })
  }
  
  delete(id:any){
    this.api.delete_fsize_master(id).subscribe((res)=>{
      alert(res.message)
      this.api.fsize_master_AllData().subscribe((res)=>{
        this.fsizedata = res.fsize
      })
    })
  }

  saveButton(){
    this.api.fsize_master(this.Fabricsdiacreate.value).subscribe((res)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.Fabricsdiacreation = false
      this.api.fsize_master_AllData().subscribe((res)=>{
        this.fsizedata = res.fsize
      })
      this.api.Drop_Style_master().subscribe((res)=>{
        this.styleDropdata = res.style
      })
      this.api.Drop_Size_master().subscribe((res)=>{
        this.sizeDropdata = res.sizes
      })
      this.Fabricsdiacreate.reset()
    })
  }
}
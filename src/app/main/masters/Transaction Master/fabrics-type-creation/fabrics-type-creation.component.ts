import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-fabrics-type-creation',
  templateUrl: './fabrics-type-creation.component.html',
  styleUrls: ['./fabrics-type-creation.component.css']
})
export class FabricsTypeCreationComponent {
  fabricsTypecreation : boolean = false;

  fabricsTypeediting : boolean = false;
  
  fabricsTypecreate! : FormGroup
  
  fabricsTypeedit! : FormGroup
  fabricstypedata: any;
  fabricstypefillterdata : any;
  datalist: any;
  all: any;
  
  ngOnInit(): void {
    
    this.api.fabrictype_master_AllData().subscribe((res)=>{
      this.all = res.fabricType
    })
this.fabricstypefillter()
  }
  constructor(private fb : FormBuilder , private api : ApiService){
  
    this.fabricsTypecreate = this.fb.group({
      id : new FormControl('') , 
      fabtype : new FormControl('') ,  
      description : new FormControl('') ,   
      dyepl : new FormControl('') ,   
    })
  
  
    this.fabricsTypeedit = this.fb.group({
      id : new FormControl('') , 
      fabtype : new FormControl('') ,  
      description : new FormControl('') ,  
      dyepl : new FormControl('') 
    })
  }

  fabricstypefillter(){
    this.api.fabrictype_master_Fillter_Data(this.fabricstypefillterdata).subscribe((res)=>{
      this.fabricstypedata= res.fabricType
    })
  }

  update(){
    this.api.fabrictype_master(this.fabricsTypeedit.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }

  edit(id:any){
    this.api.fabrictype_master_SingleData(id).subscribe((res)=>{
      this.datalist = res.fabricType
      this.fabricsTypeedit .patchValue({
        id :this.datalist[0].id, 
        fabtype : this.datalist[0].fabricstype,
        description : this.datalist[0].description,
        dyepl : this.datalist[0].dyepl,
      })
    })

}

delete(id:any){
  this.api.delete_fabrictype_master(id).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}
  
  saveButton(){
    this.api.fabrictype_master(this.fabricsTypecreate.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }
}
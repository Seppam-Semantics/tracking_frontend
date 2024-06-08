import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dye-type-creation',
  templateUrl: './dye-type-creation.component.html',
  styleUrls: ['./dye-type-creation.component.css']
})
export class DyeTypeCreationComponent {
  dyeTypecreation : boolean = false;

  dyeTypeediting : boolean = false;
  
  dyeTypecreate! : FormGroup
  
  dyeTypeedit! : FormGroup
  dyetypedata: any;
  datalist: any;
  dyeingdata: any;
  
  ngOnInit(): void {
    this.api.dyetype_master_AllData().subscribe((res)=>{
      this.dyeingdata = res.DyeType
    })
  }
  constructor(private fb : FormBuilder , private api : ApiService){
  
    this.dyeTypecreate = this.fb.group({
      id : new FormControl('') , 
      dyeType : new FormControl('') ,  
      dyeingProcess : new FormControl('') ,  
      description : new FormControl('') ,   
      Dyepl : new FormControl('')
    })
  
  
    this.dyeTypeedit = this.fb.group({
      id : new FormControl('') , 
      dyeType : new FormControl('') ,  
      dyeingProcess : new FormControl('') ,  
      description : new FormControl('') ,   
      Dyepl : new FormControl('') 
    })
  }
  
  edit(id:any){
    this.api.dyetype_master_SingleData(id).subscribe((res)=>{
      this.datalist = res.DyeType
      this.dyeTypeedit .patchValue({
        id :this.datalist[0].id, 
        dyeType : this.datalist[0].dyeType,
        dyeingProcess : this.datalist[0].dyeProcess,
        description : this.datalist[0].description,
        Dyepl : this.datalist[0].dyepl
      })
    })

}

delete(id:any){
  this.api.delete_dyetype_master(id).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

update(){

  this.api.dyetype_master(this.dyeTypeedit.value).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

saveButton(){
  this.api.dyetype_master(this.dyeTypecreate.value).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}
}
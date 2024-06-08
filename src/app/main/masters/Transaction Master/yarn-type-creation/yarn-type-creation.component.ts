import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-yarn-type-creation',
  templateUrl: './yarn-type-creation.component.html',
  styleUrls: ['./yarn-type-creation.component.css']
})
export class YarnTypeCreationComponent {
  yarnTypecreation : boolean = false;

  yarnTypeediting : boolean = false;
  
  yarnTypecreate! : FormGroup
  
  yarnTypeedit! : FormGroup
  datalist: any;
  yarntypedata: any;
  
  ngOnInit(): void {
    
    this.api.yarnType_master_AllData().subscribe((res)=>{
      this.yarntypedata = res.yarnType
    })
  }
  constructor(private fb : FormBuilder , private api : ApiService){
  
    this.yarnTypecreate = this.fb.group({
      id : new FormControl('') , 
      yarntype : new FormControl('') ,  
      description : new FormControl('')  
    })
  
  
    this.yarnTypeedit = this.fb.group({
      id : new FormControl('') , 
      yarntype : new FormControl('') ,  
      description : new FormControl('') 
    })
  }

    edit(id:any){
      this.api.yarnType_master_SingleData(id).subscribe((res)=>{
        this.datalist = res.yarnType
        this.yarnTypeedit .patchValue({
          id :this.datalist[0].id, 
          yarntype : this.datalist[0].yarntype,
          description : this.datalist[0].description,
        })
      })

  }

  delete(id:any){
    this.api.delete_yarnType_master(id).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }

  update(){

    this.api.yarnType_master(this.yarnTypeedit.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }
  
  saveButton(){
    this.api.yarnType_master(this.yarnTypecreate.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }
}
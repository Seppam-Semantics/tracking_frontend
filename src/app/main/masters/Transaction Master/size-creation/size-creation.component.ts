import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-size-creation',
  templateUrl: './size-creation.component.html',
  styleUrls: ['./size-creation.component.css']
})
export class SizeCreationComponent {
  Sizecreation : boolean = false;

  Sizeediting : boolean = false;
  
  Sizecreate! : FormGroup
  
  Sizeedit! : FormGroup
  SizeData: any;
  datalist: any;
  
  ngOnInit(): void {
    this.api.size_master_AllData().subscribe((res)=>{
      this.SizeData = res.sizes
    })
  }
  constructor(private fb : FormBuilder , private api : ApiService){
  
    this.Sizecreate = this.fb.group({
      id : new FormControl('') , 
      size : new FormControl('') 
    })
  
  
    this.Sizeedit = this.fb.group({
      id : new FormControl('') , 
      size : new FormControl('') 
    })
  }
  
  edit(id:any){
    this.api.size_master_SingleData(id).subscribe((res)=>{
      this.datalist = res.sizes
      this.Sizeedit .patchValue({
        id :this.datalist[0].id, 
        size : this.datalist[0].size,
      })
    })
  }

update(){
  this.api.size_master(this.Sizeedit.value).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

delete(id:any){
  this.api.delete_size_master(id).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

  saveButton(){
    this.api.size_master(this.Sizecreate.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }
}
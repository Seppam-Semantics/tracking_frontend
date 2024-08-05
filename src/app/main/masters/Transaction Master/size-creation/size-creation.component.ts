import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-size-creation',
  templateUrl: './size-creation.component.html',
  styleUrls: ['./size-creation.component.css']
})
export class SizeCreationComponent {
  Sizecreation : boolean = false;

  Sizeediting : boolean = false;
  
  Sizecreate! : FormGroup
  sizefilterdata : any;
  Sizeedit! : FormGroup
  SizeData: any;
  datalist: any;
  allData: any;
  
  ngOnInit(): void {
    this.api.size_master_AllData().subscribe((res)=>{
      this.SizeData = res.sizes
    })
    this.sizefilter()
  }
  sizefilter(){
    this.api.size_master_Fillter_Data(this.sizefilterdata).subscribe((res)=>{
      this.allData = res.sizes
      
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
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: res.message,
      showConfirmButton: false,
      timer: 1500
    });
    this.Sizeediting = false;
    this.sizefilter()
    this.api.size_master_AllData().subscribe((res)=>{
      this.SizeData = res.sizes
    })
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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.Sizecreation = false;
      this.sizefilter()
      this.api.size_master_AllData().subscribe((res)=>{
        this.SizeData = res.sizes
      })
  
    })
  }
}
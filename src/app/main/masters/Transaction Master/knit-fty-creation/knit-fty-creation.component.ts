import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-knit-fty-creation',
  templateUrl: './knit-fty-creation.component.html',
  styleUrls: ['./knit-fty-creation.component.css']
})
export class KnitFtyCreationComponent {

  knitFtycreation : boolean = false;

  knitFtyediting : boolean = false;
  
  knitFtycreate! : FormGroup
  
  knitFtyedit! : FormGroup
  KnitFtydata: any;
  datalist: any;
  knitFillterData: any;
  all: any;
  
  ngOnInit(): void {
    this.api.KnitFty_Master_AllData().subscribe((res)=>{
      this.all = res.knitFty
    })
  this.FillterData()
  }
  constructor(private fb : FormBuilder, private api : ApiService){
  
    this.knitFtycreate = this.fb.group({
      id : new FormControl('') , 
      knitFty : new FormControl('') ,  
      location : new FormControl('') ,  
      contact : new FormControl('') ,   
      legalFtyName : new FormControl('') 
    })
  
  
    this.knitFtyedit = this.fb.group({
      id : new FormControl('') , 
      knitFty : new FormControl('') ,  
      location : new FormControl('') ,  
      contact : new FormControl('') ,   
      legalFtyName : new FormControl('') 
    })
  }

  FillterData(){ 
    this.api.KnitFty_master_Fillter_Data(this.knitFillterData).subscribe((res)=>{
      this.KnitFtydata = res.knitFty
    })
  }

  edit(id:any){
    this.api.KnitFty_Master_SingleData(id).subscribe((res)=>{
      this.datalist = res.knitFty
      this.knitFtyedit .patchValue({
        id :this.datalist[0].id, 
        knitFty : this.datalist[0].knitFty,
        location : this.datalist[0].location,
        contact : this.datalist[0].contact,
        legalFtyName : this.datalist[0].legalFtyName
      })
    })

}

delete(id:any){
  this.api.delete_KnitFty_master(id).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

update(){

  this.api.KnitFty_Master(this.knitFtyedit.value).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

saveButton(){
  this.api.KnitFty_Master(this.knitFtycreate.value).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}
  
}

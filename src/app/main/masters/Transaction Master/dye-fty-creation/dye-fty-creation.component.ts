import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dye-fty-creation',
  templateUrl: './dye-fty-creation.component.html',
  styleUrls: ['./dye-fty-creation.component.css']
})
export class DyeFtyCreationComponent {
  dyeFtycreation : boolean = false;

  dyeFtyediting : boolean = false;
  
  dyeFtycreate! : FormGroup
  
  dyeFtyedit! : FormGroup
  dyeFtydata: any;
  datalist: any;
  
  ngOnInit(): void {
    this.api.dyeFty_Master_AllData().subscribe((res)=>{
      this.dyeFtydata = res.dyeFty
    })
  }
  constructor(private fb : FormBuilder, private api : ApiService){
  
    this.dyeFtycreate = this.fb.group({
      id : new FormControl('') , 
      dyeFty : new FormControl('') ,  
      location : new FormControl('') ,  
      contact : new FormControl('') ,   
      legalFtyName : new FormControl('') 
    })
  
  
    this.dyeFtyedit = this.fb.group({
      id : new FormControl('') , 
      dyeFty : new FormControl('') ,  
      location : new FormControl('') ,  
      contact : new FormControl('') ,   
      legalFtyName : new FormControl('') 
    })
  }
  
  edit(id:any){
    this.api.dyeFty_Master_SingleData(id).subscribe((res)=>{
      this.datalist = res.knitFty
      this.dyeFtyedit .patchValue({
        id :this.datalist[0].id, 
        dyeFty : this.datalist[0].dyeFty,
        location : this.datalist[0].location,
        contact : this.datalist[0].contact,
        legalFtyName : this.datalist[0].legalFtyName
      })
    })

}

delete(id:any){
  this.api.delete_dyeFty_master(id).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

update(){

  this.api.dyeFty_Master(this.dyeFtyedit.value).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

saveButton(){
  this.api.dyeFty_Master(this.dyeFtycreate.value).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}
}
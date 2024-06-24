import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-spin-fty-creation',
  templateUrl: './spin-fty-creation.component.html',
  styleUrls: ['./spin-fty-creation.component.css']
})
export class SpinFtyCreationComponent {
  spinFtycreation : boolean = false;

  spinFtyediting : boolean = false;
  
  spinFtycreate! : FormGroup
  
  spinFtyedit! : FormGroup
  spinFtydata: any;
  datalist: any;
  all: any;
  FillterData:any;
  
  ngOnInit(): void {
    this.api.spinFty_Master_AllData().subscribe((res)=>{
      this.all = res.spinFty
    })
    this.SpinFtyFillterData()
  }
  constructor(private fb : FormBuilder, private api : ApiService){
  
    this.spinFtycreate = this.fb.group({
      id : new FormControl('') , 
      spinFty : new FormControl('') ,  
      location : new FormControl('') ,  
      contact : new FormControl('') ,   
      legalFtyName : new FormControl('') 
    })
  
  
    this.spinFtyedit = this.fb.group({
      id : new FormControl('') , 
      spinFty : new FormControl('') ,  
      location : new FormControl('') ,  
      contact : new FormControl('') ,   
      legalFtyName : new FormControl('') 
    })
  }

  SpinFtyFillterData(){
    this.api.spinFty_master_Fillter_Data(this.FillterData).subscribe((res)=>{
      this.spinFtydata = res.spinFty
    })
  }

  edit(id:any){
    this.api.spinFty_Master_SingleData(id).subscribe((res)=>{
      this.datalist = res.SpinFty

      this.spinFtyedit .patchValue({
        id :this.datalist[0].id, 
        spinFty : this.datalist[0].SpinFtyName,
        location : this.datalist[0].SpinningLocation,
        contact : this.datalist[0].ContacDetails,
        legalFtyName : this.datalist[0].LegalFtyName
      })
    })

}

delete(id:any){
  this.api.delete_spinFty_master(id).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}

update(){

  this.api.spinFty_Master(this.spinFtyedit.value).subscribe((res)=>{
    alert(res.message)
    window.location.reload()
  })
}
  
  saveButton(){
    this.api.spinFty_Master(this.spinFtycreate.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }
}
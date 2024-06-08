import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-po-master-creation',
  templateUrl: './po-master-creation.component.html',
  styleUrls: ['./po-master-creation.component.css']
})
export class POMasterCreationComponent {

  pocreation: boolean = false;

  poediting: boolean = false;

  pocreate!: FormGroup

  poedit!: FormGroup
  allData: any;
  datalist: any;

  ngOnInit(): void {
    this.api.Buyer_master_AllData().subscribe((res) => {
      this.allData = res.buyers
    })
  }
  constructor(private fb: FormBuilder, private api: ApiService) {

    this.pocreate = this.fb.group({
      id: new FormControl(''),
      pobuyer : new FormControl(''),
      buyerid : new FormControl(''),
      poorder : new FormControl(''),
      orderid : new FormControl(''),
      podate  : new FormControl(''),
      poquantity : new FormControl(''),
      povalue   : new FormControl(''),
      poshipdate   : new FormControl('')
    })


    this.poedit = this.fb.group({
      id: new FormControl(''),
      pobuyer : new FormControl(''),
      buyerid : new FormControl(''),
      poorder : new FormControl(''),
      orderid : new FormControl(''),
      podate  : new FormControl(''),
      poquantity : new FormControl(''),
      povalue   : new FormControl(''),
      poshipdate   : new FormControl('')
    })


  }


  delect(id:any){
    this.api.delete_Buyer_master(id).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }


view(id:any){
  this.api.Buyer_master_SingleData(id).subscribe((res)=>{
    this.datalist = res.buyers
    this.poedit.patchValue({
      id: this.datalist[0].id,
      buyer: this.datalist[0].buyer,
      country: this.datalist[0].country,
      contact: this.datalist[0].contactDetails
    })
  })
}

update(){
  this.api.Buyer_master(this.poedit.value).subscribe((res) => {
    alert(res.message)
    window.location.reload()
  })
}

  saveButton() {
    console.log(this.pocreate.value)

    const dateValue = this.pocreate.value.poshipdate;
    console.log('Formatted date:', dateValue);
    // this.api.Buyer_master(this.pocreate.value).subscribe((res) => {
    //   alert(res.message)
    //   window.location.reload()
    // })
  }

}

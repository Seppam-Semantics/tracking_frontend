import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buyer-creation',
  templateUrl: './buyer-creation.component.html',
  styleUrls: ['./buyer-creation.component.css']
})
export class BuyerCreationComponent implements OnInit {

  Buyercreation: boolean = false;

  Buyerediting: boolean = false;

  Buyercreate!: FormGroup

  Buyeredit!: FormGroup
  allData: any;
  datalist: any;
  buyerNameFillter: any;
  all: any;

  ngOnInit(): void {
    this.api.Buyer_master_AllData().subscribe((res) => {
      this.all = res.buyers
    })

    this.buyerFilter()
  }

  buyerFilter(){
    this.api.Buyer_master_Fillter_Data(this.buyerNameFillter).subscribe((res)=>{
      this.allData = res.buyers
    })
  }


  constructor(private fb: FormBuilder, private api: ApiService) {

    this.Buyercreate = this.fb.group({
      id: new FormControl(''),
      buyer: new FormControl(''),
      country: new FormControl(''),
      contact: new FormControl('')
    })


    this.Buyeredit = this.fb.group({
      id: new FormControl(''),
      buyer: new FormControl(''),
      country: new FormControl(''),
      contact: new FormControl('')
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
    this.Buyeredit.patchValue({
      id: this.datalist[0].id,
      buyer: this.datalist[0].buyer,
      country: this.datalist[0].country,
      contact: this.datalist[0].contactDetails
    })
  })
}

update(){
  this.api.Buyer_master(this.Buyeredit.value).subscribe((res) => {
    alert(res.message)
    window.location.reload()
  })
}

  saveButton() {
    this.api.Buyer_master(this.Buyercreate.value).subscribe((res) => {
      Swal.fire({
        title: "Added SuccessFully!",
        text: "You clicked the button!",
        icon: "success"
      });
    this.Buyercreation = false;
    
    this.api.Buyer_master_AllData().subscribe((res) => {
      this.all = res.buyers
    })
  })
  }

}

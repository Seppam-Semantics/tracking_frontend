import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import { MasterService } from '../master.service';


@Component({
  selector: 'app-machine-allocation-master',
  templateUrl: './machine-allocation-master.component.html',
  styleUrls: ['./machine-allocation-master.component.css']
})


export class MachineAllocationMasterComponent {
  machinecreation: boolean = false;

  machineediting: boolean = false;

  machinecreate!: FormGroup

  machineedit!: FormGroup
  allData: any;
  datalist: any;
  machineAlloc: any;
  all: any;
  fty_name: any;
  machineDia: any;

  ngOnInit(): void {
    // this.machineFilter()
    // this.api.getallmachineDiadetails().subscribe((res)=>{
    //   this.machineDia = res.data
    // })
  }
  factoryName(){
    this.api.getknitwofty().subscribe((res) => {
      this.fty_name = res.knitfty
    })
  }

  machineFilter(machineDia : string = ''){
    this.api.getAllocationMaster(machineDia).subscribe((res) => {
      this.masters.machineAllocationData = res.data
    })
  }


  constructor(private fb: FormBuilder, private api: ApiService , public masters : MasterService) {

    this.machinecreate = this.fb.group({
      id: new FormControl(''),
      knitFty: new FormControl(''),
      knitFty_id : new FormControl(),
      machineDia: new FormControl(''),
      fsize_id : new FormControl(),
      brand: new FormControl(''),
      style_id : new FormControl(),
      machineNos : new FormControl(''),
      prodDay: new FormControl('')
    })


    this.machineedit = this.fb.group({
      id: new FormControl(''),
      knitFty: new FormControl(''),
      knitFty_id : new FormControl(),
      machineDia: new FormControl(''),
      fsize_id : new FormControl(),
      brand: new FormControl(''),
      style_id : new FormControl(),
      machineNos : new FormControl(''),
      prodDay: new FormControl('')
    })


  }


  delect(id:any){
    this.api.delete_Buyer_master(id).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
  }


view(id:any){
  this.api.getSingleAllocationMaster(id).subscribe((res)=>{
    this.datalist = res.data
    this.machineedit.patchValue({
      id: this.datalist[0].id,
      knitFty: this.datalist[0].knitFty,
      knitFty_id : this.datalist[0].knitFty_id,
      machineDia: this.datalist[0].machineDia,
      fsize_id : this.datalist[0].fsize_id,
      brand: this.datalist[0].brand,
      style_id : this.datalist[0].style_id,
      machineNos : this.datalist[0].machineNos,
      prodDay : this.datalist[0].prodDay
    })
  })
}

update(){
  this.api.postAllocationMaster(this.machineedit.value).subscribe((res) => {
    Swal.fire({
      title: "Updated SuccessFully!",
      text: "You clicked the button!",
      icon: "success"
    });
  this.machineediting = false;

  this.machineFilter()
  })
}

  saveButton() {
    this.api.postAllocationMaster(this.machinecreate.value).subscribe((res) => {
      Swal.fire({
        title: "Added SuccessFully!",
        text: "You clicked the button!",
        icon: "success"
      });
    this.machinecreation = false;
    this.machinecreate.reset()
    this.machineFilter()
  })
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dye-type-creation',
  templateUrl: './dye-type-creation.component.html',
  styleUrls: ['./dye-type-creation.component.css']
})
export class DyeTypeCreationComponent {
  dyeTypecreation: boolean = false;

  dyeTypeediting: boolean = false;

  dyeTypecreate!: FormGroup

  dyeTypeedit!: FormGroup
  dyetypedata: any;
  datalist: any;
  dyeingdata: any;
  dyetypeFillterdata:any;
  all: any;

  ngOnInit(): void {
    this.api.dyetype_master_AllData().subscribe((res) => {
      this.all = res.DyeType
    })

    this.dyetypefillterData()
  }
  constructor(private fb: FormBuilder, private api: ApiService) {

    this.dyeTypecreate = this.fb.group({
      id: new FormControl(''),
      dyeType: new FormControl(''),
      dyeingProcess: new FormControl(''),
      description: new FormControl(''),
      Dyepl: new FormControl('')
    })


    this.dyeTypeedit = this.fb.group({
      id: new FormControl(''),
      dyeType: new FormControl(''),
      dyeingProcess: new FormControl(''),
      description: new FormControl(''),
      Dyepl: new FormControl('')
    })
  }

  dyetypefillterData() {
    this.api.dyetype_master_Fillter_Data(this.dyetypeFillterdata).subscribe((res) => {
      this.dyeingdata = res.DyeType
    })
  }
  edit(id: any) {
    this.api.dyetype_master_SingleData(id).subscribe((res) => {
      this.datalist = res.DyeType
      this.dyeTypeedit.patchValue({
        id: this.datalist[0].id,
        dyeType: this.datalist[0].dyeType,
        dyeingProcess: this.datalist[0].dyeProcess,
        description: this.datalist[0].description,
        Dyepl: this.datalist[0].dyepl
      })
    })

  }

  delete(id: any) {
    this.api.delete_dyetype_master(id).subscribe((res) => {      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.dyetypefillterData()
      this.api.dyetype_master_AllData().subscribe((res) => {
        this.all = res.DyeType
      })
    })
  }

  update() {

    this.api.dyetype_master(this.dyeTypeedit.value).subscribe((res) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.dyeTypeediting = false;
      this.dyetypefillterData()
      this.api.dyetype_master_AllData().subscribe((res) => {
        this.all = res.DyeType
      })
    })
  }

  saveButton() {
    this.api.dyetype_master(this.dyeTypecreate.value).subscribe((res) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.dyeTypecreation = false;
      this.dyetypefillterData()
      this.api.dyetype_master_AllData().subscribe((res) => {
        this.all = res.DyeType
      })

    })
  }
}
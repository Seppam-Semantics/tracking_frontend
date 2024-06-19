import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-rej-type-creation',
  templateUrl: './rej-type-creation.component.html',
  styleUrls: ['./rej-type-creation.component.css']
})
export class RejTypeCreationComponent {
  rejTypecreation: boolean = false;

  rejTypeediting: boolean = false;

  rejTypecreate!: FormGroup

  rejTypeedit!: FormGroup
  colorDropdata: any;
  selectedColors: any;
  rejtypeAllData: any;
  all: any;
  rejtypeData: string | undefined;
  FillterData: string | undefined;
  rejtypeDta: any;
  availableColors: string[] = ['Aqua', 'Burgundy', 'Grey Melange', 'Kelly Green', 'White'];
  rejtypeColorDta: any;
  ngOnInit(): void {

    this.api.Drop_Color_master().subscribe((res) => {
      this.colorDropdata = res.color
    })

    this.api.rejtype_Master_AllData().subscribe((res) => {
      this.all = res.rejtype
    })
    this.RejTypeFillterData()

  }

  colorjson(data: any): any {
      return JSON.parse(data);
  }



  constructor(private fb: FormBuilder, private api: ApiService) {

    this.rejTypecreate = this.fb.group({
      id: new FormControl(''),
      rejType: new FormControl(''),
      rejName: new FormControl(''),
      colors: new FormControl(''),
      data: new FormControl(''),
      losses: new FormControl('')
    })


    this.rejTypeedit = this.fb.group({
      id: new FormControl(''),
      rejType: new FormControl(''),
      rejName: new FormControl(''),
      colors:   [[]], 
      data: new FormControl(''),
      losses: new FormControl('')
    })
  }



  getSelectedColors() {
    const selectedColorIds = this.rejTypecreate.get('colors')?.value || [];

    this.selectedColors = this.colorDropdata
      .filter((color: { id: number; color: string }) => selectedColorIds.includes(color.id));

    this.selectedColors = this.selectedColors.map((color: any) => {
      return { ...color, lineid: 0 };
    });

    this.rejTypecreate.patchValue({
      data: this.selectedColors
    });
  }

  
  RejTypeFillterData(){ 
    this.api.rejtype_master_Fillter_Data(this.FillterData).subscribe((res)=>{
      this.rejtypeData = res.rejtype
    })
  }

  edit(id: any) {
    this.api.rejtype_Master_SingleData(id).subscribe((res) => {
     this.rejtypeDta =  res.rejtype
     this.rejtypeColorDta =  res.rejtype[0].color
     
     this.rejTypeedit.patchValue({
      id: this.rejtypeDta[0].id,
      rejType: this.rejtypeDta[0].rejType,
      rejName: this.rejtypeDta[0].rejName,
      data : JSON.parse(this.rejtypeDta[0].colors) ,
      losses: this.rejtypeDta[0].losses
     })
    })
  }

update(){
  console.log(this.rejTypeedit.value)
  this.api.rejtype_Master(this.rejTypeedit.value).subscribe((res) => {
    alert(res.message)
    this.RejTypeFillterData()
    this.rejTypeediting = false;
  })
}

  saveButton() {
    this.api.rejtype_Master(this.rejTypecreate.value).subscribe((res) => {
      alert(res.message)
      this.RejTypeFillterData()
      this.rejTypecreation = false;
    })
    console.log(this.rejTypecreate.value)
  }


delete(id:any){
 this.api.delete_rejtype_master(id).subscribe((res)=>{
  alert(res.message)
  this.RejTypeFillterData()
 }) 
}
}
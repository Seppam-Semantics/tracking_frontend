import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ApiService } from 'src/app/api.service';
import { MasterService } from '../master.service';

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
  rejtypeColorDta: any;
  selected: any[] = ['Kelly Green'];
  selectedColors1: any;
  selectedColors2: any;
  isAllSelected = false;

  AllSelected(){
    this.isAllSelected = !this.isAllSelected
  }

  @ViewChild('colorSelect') colorSelect!: MatSelect;
  
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

  constructor(private fb: FormBuilder, private api: ApiService , public masters : MasterService) {

    this.rejTypecreate = this.fb.group({
      id: new FormControl(0),
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
      colors: new FormControl(''),
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

  getSelectedColors2(event: any) {
    const selectedColors = this.rejTypecreate.get('colors')?.value;
  }

  toggleAllSelection() {
    const selectedColors = this.rejTypecreate.get('colors')?.value || [];

    if (this.isAllSelected) {
      this.rejTypecreate.get('colors')?.setValue([]);
    } else {
      const allColorIds = this.colorDropdata.map((color:any) => color.id);
      this.rejTypecreate.get('colors')?.setValue(allColorIds);
    }

  }




  RejTypeFillterData() {
    this.api.rejtype_master_Fillter_Data(this.FillterData).subscribe((res) => {
      this.masters.rejTypeData = res.rejtype
    })
  }

  edit(id: any) {
    this.api.rejtype_Master_SingleData(id).subscribe((res) => {
        this.rejtypeDta = res.rejtype;
        // this.rejtypeColorDta = JSON.parse(res.rejtype[0].colors).map((colorObj: any) => ({
          this.rejtypeColorDta = res.rejtype[0].colors.map((colorObj: any) => ({
            colorId: colorObj.colorId,
            color: colorObj.color,
            lineid: colorObj.lineid
        }));

        const colorIdsArray = this.rejtypeColorDta.map((colorObj: any) => colorObj.colorId);

        this.rejTypeedit.patchValue({
            id: this.rejtypeDta[0].id,
            rejType: this.rejtypeDta[0].rejType,
            rejName: this.rejtypeDta[0].rejName,
            losses: this.rejtypeDta[0].losses,
            colors: colorIdsArray // Patch form control with colorId values
        });

        this.getSelectedColors1();
    });
}
getSelectedColors1() {
  const selectedColorIds = this.rejTypeedit.get('colors')?.value || [];

  this.selectedColors1 = this.colorDropdata.filter((color: any) => selectedColorIds.includes(color.id));

  this.selectedColors2 = this.selectedColors1.map((color: any) => {
      const colorWithLineId = this.rejtypeColorDta.find(
          (colorObj: any) => colorObj.colorId === color.id
      );

      return {
          ...color,
          lineid: colorWithLineId ? colorWithLineId.lineid : 0
      };
  });
  this.rejTypeedit.patchValue({
      data: this.selectedColors2
  });
}

  update() {

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

  }


  delete(id: any) {
    this.api.delete_rejtype_master(id).subscribe((res) => {
      alert(res.message)
      this.RejTypeFillterData()
    })
  }

  
}
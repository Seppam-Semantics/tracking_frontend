import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-rej-type-creation',
  templateUrl: './rej-type-creation.component.html',
  styleUrls: ['./rej-type-creation.component.css']
})
export class RejTypeCreationComponent {
  rejTypecreation : boolean = false;

  rejTypeediting : boolean = false;
  
  rejTypecreate! : FormGroup
  
  rejTypeedit! : FormGroup
  colorDropdata: any;
  selectedColors: any;
  rejtypeAllData: any;
  
  ngOnInit(): void {

    this.api.Drop_Color_master().subscribe((res)=>{
      this.colorDropdata = res.color
    })

    this.api.rejtype_Master_AllData().subscribe((res)=>{
      this.rejtypeAllData = res.rejtype
      console.log(this.rejtypeAllData)
    })
    
    
  }
  constructor(private fb : FormBuilder , private api: ApiService){
  
    this.rejTypecreate = this.fb.group({
      id : new FormControl('') , 
      rejType: new FormControl('') ,  
      rejName : new FormControl('') ,
      colors : new FormControl() ,
      data: new FormControl(''),
      losses : new FormControl('') 
    })
  
  
    this.rejTypeedit = this.fb.group({
      id : new FormControl('') , 
      rejType : new FormControl('') ,  
      rejName : new FormControl('') ,  
      colors : new FormControl('') ,   
      loss : new FormControl('') 
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
 
 
  saveButton(){
    this.api.rejtype_Master(this.rejTypecreate.value).subscribe((res)=>{
      alert(res.message)
      window.location.reload()
    })
    console.log(this.rejTypecreate.value)
  }
}
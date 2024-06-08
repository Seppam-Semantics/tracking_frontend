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
  
  ngOnInit(): void {

    this.api.Drop_Color_master().subscribe((res)=>{
      this.colorDropdata = res.color
      console.log(this.colorDropdata)
    })
    
    
  }
  constructor(private fb : FormBuilder , private api: ApiService){
  
    this.rejTypecreate = this.fb.group({
      id : new FormControl('') , 
      rejType: new FormControl('') ,  
      rejName : new FormControl('') ,
      colors : new FormControl('') ,     
      data: this.fb.array([]),
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
 
  get items() {
    return this.rejTypecreate.get("data") as FormArray;
  }

  add1button() {
    const row = this.fb.group({
      "id": new FormControl(''),
      "colorId": new FormControl(''),
      "color": new FormControl('')
    });

    this.items.push(row);
  }

  
  saveButton(){
    console.log(this.rejTypecreate.value)
  }
}
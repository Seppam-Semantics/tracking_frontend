import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fabricsdia-creation',
  templateUrl: './fabricsdia-creation.component.html',
  styleUrls: ['./fabricsdia-creation.component.css']
})
export class FabricsdiaCreationComponent {
  Fabricsdiacreation : boolean = false;

  Fabricsdiaediting : boolean = false;
  
  Fabricsdiacreate! : FormGroup
  
  Fabricsdiaedit! : FormGroup
  
  ngOnInit(): void {
    
  }
  constructor(private fb : FormBuilder){
  
    this.Fabricsdiacreate = this.fb.group({
      id : new FormControl('') , 
      styleName : new FormControl('') ,
      sizeName : new FormControl('') ,
      chestSize : new FormControl('') ,
      length : new FormControl('') ,
      sleeve : new FormControl('') ,
      allow : new FormControl('') ,
      pattern : new FormControl('') ,
      GSM : new FormControl('') ,
      bodyCon : new FormControl('') ,
      neckTape : new FormControl('') ,
      neckRIB : new FormControl('') ,
      others : new FormControl('') ,
      finishFabricsConsumptionDozn : new FormControl('') ,
      machineDia : new FormControl('') ,
      finishDia : new FormControl('')
    })
  
  
    this.Fabricsdiaedit = this.fb.group({
      id : new FormControl('') , 
      styleName : new FormControl('') ,
      sizeName : new FormControl('') ,
      chestSize : new FormControl('') ,
      length : new FormControl('') ,
      sleeve : new FormControl('') ,
      allow : new FormControl('') ,
      pattern : new FormControl('') ,
      GSM : new FormControl('') ,
      bodyCon : new FormControl('') ,
      neckTape : new FormControl('') ,
      neckRIB : new FormControl('') ,
      others : new FormControl('') ,
      finishFabricsConsumptionDozn : new FormControl('') ,
      machineDia : new FormControl('') ,
      finishDia : new FormControl('')
    })
  }
  
  saveButton(){
    console.log(this.Fabricsdiacreate.value)
  }
}
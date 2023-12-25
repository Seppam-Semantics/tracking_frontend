import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fabric-roll-5',
  templateUrl: './fabric-roll-5.component.html',
  styleUrls: ['./fabric-roll-5.component.css']
})
export class FabricRoll5Component {

  show=false;
  
  displayedColumns: string[] = ['Batchno', 'rollno' , 'greigeWt','delWt','difference','reason'];
  dataSource = [...ELEMENT_DATA];

  constructor(private fb:FormBuilder){}

form = this.fb.group({
  items:this.fb.array([]),
});

get items(){
  return this.form.get('items') as FormArray
}

delete(index: number) {
  this.items.removeAt (index);
  }

add(){
  this.items.push(
    this.fb.group({
      Batchno:[''],
      rollno:[''],
      greigeWt:[''],
      delWt:[''],
      difference:[''],
      reason:[''],

    })
  )
}
submit(){
  console.log(this.form.value)
}


fabricroll5 = new FormGroup({

  WorkOrder : new FormControl(''),
  Buyer : new FormControl(''),
  Order : new FormControl(''),
  Style : new FormControl(''),
  color : new FormControl(''),
  Size : new FormControl(''),


  FabType : new FormControl(''),
  YarnType : new FormControl(''),
  YarnCunt : new FormControl(''),
  KnitSL : new FormControl(''),
  FabDia : new FormControl(''),
  GSM : new FormControl(''),
  KnitFty : new FormControl(''),
  DyeFty : new FormControl(''),
  SpinFty : new FormControl(''),
  YarnLot : new FormControl(''),


})

fabricroll5submit(){
  console.log(this.fabricroll5.value)
}



}

export interface PeriodicElement {
  Cum: any;
  CumWt: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Cum: 'Roll.No', CumWt: 'Roll.Wt'}
];
import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fabric-roll-3',
  templateUrl: './fabric-roll-3.component.html',
  styleUrls: ['./fabric-roll-3.component.css']
})
export class FabricRoll3Component {

  show=false;
  
  displayedColumns: string[] = ['Batchno', 'Cum' , 'rollWt','greigeWt','dyeWt'];
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
      Cum:[''],
      rollWt:[''],
      greigeWt:[''],
      dyeWt:[''],

    })
  )
}
submit(){
  console.log(this.form.value)
}


}


export interface PeriodicElement {
  Cum: any;
  CumWt: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Cum: 'Roll.No', CumWt: 'Roll.Wt'}
];
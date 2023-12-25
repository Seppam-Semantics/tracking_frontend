import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fabric-roll-2',
  templateUrl: './fabric-roll-2.component.html',
  styleUrls: ['./fabric-roll-2.component.css']
})
export class FabricRoll2Component {


  show=false;
  
  displayedColumns: string[] = ['Cum', 'CumWt1' , 'CumWt2'];
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
      cum:[''],
      cumWt1:[''],
      cumWt2:[''],

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

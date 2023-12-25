import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fabric-roll-1',
  templateUrl: './fabric-roll-1.component.html',
  styleUrls: ['./fabric-roll-1.component.css']
})
export class FabricRoll1Component {



  show=false;
  
  displayedColumns: string[] = ['Cum', 'CumWt'];
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
      cumWt:['']
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
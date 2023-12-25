import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bundle-entry-2',
  templateUrl: './bundle-entry-2.component.html',
  styleUrls: ['./bundle-entry-2.component.css']
})
export class BundleEntry2Component {
  show=false;
  
  displayedColumns: string[] = ['Batchno','Bunno','ActualInput','SewPcs','Difference','RejCause',];
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
      Bunno:[''],
      ActualInput:[''],
      RejCause:[''],
      SewPcs:[''],
      Difference:[''],
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
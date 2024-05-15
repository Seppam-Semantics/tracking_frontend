import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bundle-entry-1',
  templateUrl: './bundle-entry-1.component.html',
  styleUrls: ['./bundle-entry-1.component.css']
})
export class BundleEntry1Component {
  show=false;
  
  displayedColumns: string[] = ['Batchno', 'Bunno' , 'Range' , 'ActualCut' , 'ActualInput' ];
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
      Range:[''],
      ActualCut:[''],
      ActualInput:[''],
    })
  )
}
submit(){

}

}


export interface PeriodicElement {
  Cum: any;
  CumWt: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Cum: 'Roll.No', CumWt: 'Roll.Wt'}
];
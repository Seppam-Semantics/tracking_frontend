import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-fabric-roll-1',
  templateUrl: './fabric-roll-1.component.html',
  styleUrls: ['./fabric-roll-1.component.css']
})
export class FabricRoll1Component implements OnInit {

  show=false;  
  displayedColumns: string[] = ['Cum', 'CumWt'];
  dataSource = [...ELEMENT_DATA];
  workorderId:any;
  entry: any;
  WoNumber:any;
  fabdetails:any;
  rollnnumber:any;
  entry1form!:FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient,
    private cdref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')
    this.api.getworkorderdetails(proftoken).subscribe((res)=>{
      this.WoNumber = res.workorders
    })
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }


  onSelectionChange() {
      if (this.workorderId && this.entry) {
        this.loadworkorderdetails(this.workorderId, this.entry);
      }
  }
  loadworkorderdetails(WOno: any, WOLineno: any):void{
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`http://localhost:2000/fabricrollapi/fabric-entrys?id=${WOno}&entry=${WOLineno}`, { headers }).subscribe((res)=>{
      this.fabdetails = res.workorder
      console.log(this.fabdetails)
      this.rollnnumber = res.fabricRolls
    })
  }



form = this.fb.group({
  entrys:this.fb.array([]),
});

get items(){
  return this.form.get('entrys') as FormArray
}

delete(index: number) {
  this.items.removeAt (index);
  }

add(){
  this.items.push(
    this.fb.group({
      rollNo:[''],
      entry_1:['']
    })
  )
}

submit(){
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": this.entry,
    "entrys":this.form.get('entrys') as FormArray
  })
  console.log(this.entry1form.value)
  const proftoken = 'Bearer '+ sessionStorage.getItem('token')
  this.api.postfabricdetails(this.entry1form.value, proftoken ).subscribe((res)=>{
    console.log(res);
  })
}

}
export interface PeriodicElement {
  Cum: any;
  CumWt: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Cum: 'Roll.No', CumWt: 'Roll.Wt'}
];
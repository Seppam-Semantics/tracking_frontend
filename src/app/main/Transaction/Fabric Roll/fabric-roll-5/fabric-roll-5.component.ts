import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-fabric-roll-5',
  templateUrl: './fabric-roll-5.component.html',
  styleUrls: ['./fabric-roll-5.component.css']
})
export class FabricRoll5Component {

  workorderId: any;
  entry: any;
  WoNumber: any;
  fabdetails: any;
  rollnnumber: any;
  entry1form!: FormGroup;
  show=false;
  
  displayedColumns: string[] = ['Batchno', 'rollno' , 'greigeWt','delWt','difference','reason'];
  dataSource = [...ELEMENT_DATA];

  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    const proftoken = 'Bearer ' + sessionStorage.getItem('token')
    this.api.getworkorderdetails(proftoken).subscribe((res) => {
      this.WoNumber = res.workorders
    })
  }

  onSelectionChange() {
    if (this.workorderId && this.entry) {
      this.loadworkorderdetails(this.workorderId, this.entry);
    }
  }

  loadworkorderdetails(WOno: any, WOLineno: any): void {
    const proftoken = 'Bearer ' + sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`http://localhost:2000/fabricrollapi/fabric-entrys?id=${WOno}&entry=${WOLineno}`, { headers }).subscribe((res) => {
      this.fabdetails = res.workorder
      console.log(this.fabdetails)
      this.rollnnumber = res.fabricRolls
    })
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
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
        // Batchno:[''],
        rollNo:[''],
        // rollWt:[''],
        // greigeWt:[''],
        entry_5:[''],
        
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
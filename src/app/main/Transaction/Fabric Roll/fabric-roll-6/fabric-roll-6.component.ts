import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-fabric-roll-6',
  templateUrl: './fabric-roll-6.component.html',
  styleUrls: ['./fabric-roll-6.component.css']
})
export class FabricRoll6Component {

  show=false;
  workorderId: any;
  entry: any;
  WoNumber: any;
  fabdetails: any;
  rollnnumber: any;
  entry1form!: FormGroup;
  
  displayedColumns: string[] = ['Batchno','rollno','delWt','PlanPcs'];
  dataSource = [...ELEMENT_DATA];

  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    const proftoken = 'Bearer ' + sessionStorage.getItem('token')
    this.api.getworkorderdetails().subscribe((res) => {
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
    this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=${WOno}&entry=${WOLineno}`, { headers }).subscribe((res) => {
      this.fabdetails = res.workorder
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
        entry_6:[''],
        
      })
    )
  }
  
  submit(){
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": this.entry,
      "entrys":this.form.get('entrys') as FormArray
    })
    this.api.postfabricdetails(this.entry1form.value).subscribe((res)=>{
      alert(res.message)
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


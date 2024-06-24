import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-fabric-roll-entry-3',
  templateUrl: './fabric-roll-entry-3.component.html',
  styleUrls: ['./fabric-roll-entry-3.component.css']
})
export class FabricRollEntry3Component {


  show = false;

  workorderId: any;
  WoNumber: any;
  fabdetails: any;
  rollnnumber: any;
  entry1form!: FormGroup;
  formArray!: FormArray;
  numberofrolls: any;
  numbers: any[] = [];
  buyers: any;
  buyerName: any;
  order: any;
  ordernumbers: any;
  stylelist: any;
  styleslist: any;
  colorlist: any;
  colorslist: any;
  sizelist: any;
  sizeslist: any;
  workorderhide: boolean = true;
  reason = new FormControl(false);
  loading1: boolean = false;
  loading2: boolean = false;
  loading3: boolean = false;
  loading4: boolean = false;
  loading5: boolean = false;
  loading6: boolean = false;
  loading7: boolean = false;
  batchGenerate = new FormControl();
  tabLabel: any
  entry1total: any;
  entry2total: any;
  entry3total: any;
  entry4total: any;
  entry5total: any;
  entry6total: any;
  entry7total: any;
  rollCount1:any;
  rollCount2:any
  rollCount3:any
  rollCount4:any
  rollCount5:any
  rollCount6:any
  rollCount7:any
  rollnnumber1: any;
  rollnnumber2: any;
  rollnnumber3: any;
  rollnnumber4: any;
  rollnnumber5: any;
  rollnnumber6: any;
  rollnnumber7: any;
  total_1: any;
  total_2: any;
  total_3: any;
  total_4: any;
  total_5: any;
  total_6: any;
  total_7: any;


  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient,
    private cdref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getbuyers();
    this.getworkorderdetails()
    this.fabrollweight()
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  public getworkorderdetails() {
    this.api.getworkorderdetails().subscribe((res) => {
      this.WoNumber = res.workorders
    })
  }

  public getbuyers() {
    this.api.getbuyers().subscribe((res) => {
      this.buyers = res.buyers;
    })
  }
  getorders(buyer: any) {
    this.api.getorders(buyer).subscribe((res) => {
      this.order = res.orders
    })
  }

  getstyle(buyer: any, order: any) {
    this.api.getstyle(buyer, order).subscribe((res) => {
      this.stylelist = res.styles;
    })
  }

  getcolor(buyer: any, order: any, style: any) {
    this.api.getcolor(buyer, order, style).subscribe((res) => {
      this.colorlist = res.colors;
    })
  }

  getsize(buyer: any, order: any, style: any, color: any) {
    this.api.getsize(buyer, order, style, color).subscribe((res) => {
      this.sizelist = res.sizes;
    })
  }



  onSelectionChange() {
    if (this.buyerName) {
      this.resetform();
      this.getorders(this.buyerName)
    }
    if (this.buyerName && this.ordernumbers) {
      this.resetform();
      this.getstyle(this.buyerName, this.ordernumbers)
    }
    if (this.buyerName && this.ordernumbers && this.styleslist) {
      this.resetform();
      this.getcolor(this.buyerName, this.ordernumbers, this.styleslist)
    }
    if (this.buyerName && this.ordernumbers && this.styleslist && this.colorslist) {
      this.resetform();
      this.getsize(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist)
    }
    if (this.buyerName && this.ordernumbers && this.styleslist && this.colorslist && this.sizeslist) {
      this.resetform();
      switch (this.tabLabel) {
        case 'First Roll Weight':
          this.fabrollweight();
          break;

        case 'Greige Fab Del Entry':
          this.greigefabDElEntry();
          break;

        case 'Dye Batch Entry':
          this.dyeBatchEntry();
          break;

        case 'Dye Finish Entry':
          this.dyeFinishEntry();
          break;

        case 'Dyed Fab Del Entry':
          this.dyedFabDelEntry();
          break;

        case 'Transfer from warehouse to Cut':
          this.warehouseToCut();
          break;

        case 'Actual Cut panels Entry':
          this.actualCutPanelEntry();
          break;

        default:
          this.loadworkorder();
          break;
      }
    }
  }

  fabrollweight() {
    this.resetform();
    this.loaddetails().subscribe(()=>{
      this.total_1.forEach((element:any) => {
        this.entry1total = element.total_1
      });
      this.add1()
    })
  }

  greigefabDElEntry() {
    this.resetform();
    this.loaddetails().subscribe(()=>{
      this.total_2.forEach((element:any) => {
        this.entry2total = element.total_2
      });
      this.total_1.forEach((element:any) => {
        this.entry1total = element.total_1
        this.rollCount1 = element.totalRolls
      });
      this.add2()
    })
  }

  dyeBatchEntry() {
    this.resetform();
    this.loaddetails().subscribe(()=>{
      this.total_2.forEach((element:any) => {
        this.entry2total = element.total_2
        this.rollCount2 = element.totalRolls
      });

      this.total_3.forEach((element:any) => {
        this.entry3total = element.total_3
        this.rollCount3 = element.totalRolls
      });
      this.add3()
    })
  }

  dyeFinishEntry() {
    this.resetform();
    this.loaddetails().subscribe(()=>{
      this.total_3.forEach((element:any) => {
        this.entry3total = element.total_3
        this.rollCount3 = element.totalRolls
      });

      this.total_4.forEach((element:any) => {
        this.entry4total = element.total_4
        this.rollCount4 = element.totalRolls
      });
      this.add4()
    })
  }

  dyedFabDelEntry() {
    this.resetform();
    this.loaddetails().subscribe(()=>{
      this.total_4.forEach((element:any) => {
        this.entry4total = element.total_4
        this.rollCount4 = element.totalRolls
      });

      this.total_5.forEach((element:any) => {
        this.entry5total = element.total_5
        this.rollCount5 = element.totalRolls
      });
      this.add5()
    })
  }

  warehouseToCut() {
    this.resetform();
    this.loaddetails().subscribe(()=>{
      this.total_5.forEach((element:any) => {
        this.entry5total = element.total_5
        this.rollCount5 = element.totalRolls
      });

      this.total_6.forEach((element:any) => {
        this.entry6total = element.total_6
        this.rollCount6 = element.totalRolls
      });
      this.add6()
    })
  }

  actualCutPanelEntry() {
    this.resetform();
    this.loaddetails().subscribe(()=>{
      this.total_6.forEach((element:any) => {
        this.entry6total = element.total_6
        this.rollCount6 = element.totalRolls
      });

      this.total_7.forEach((element:any) => {
        this.entry7total = element.total_7
        this.rollCount7 = element.totalRolls
      });
      this.add7()
    })
  }

  loadworkorder() {
    this.resetform();
    this.loaddetails().subscribe(()=>{
      this.total_1.forEach((element:any) => {
        this.entry1total = element.total_1
      });
      this.add1()
    })

  }

  loaddetails() {
    const proftoken = 'Bearer ' + sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', proftoken);

    const a = sessionStorage.getItem('FabricEntrybuyer')
    const b = sessionStorage.getItem('FabricEntryorderNo')
    const c = sessionStorage.getItem('FabricEntrystyle')
    const d = sessionStorage.getItem('FabricEntrycolor')
    const e = sessionStorage.getItem('FabricEntrysize')

    return this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/transcation-entrys?id=&entry=1&buyer=${a}&orderNo=${b}&style=${c}&color=${d}&size=${e}`, { headers })
      .pipe(
        tap((res) => {
          this.fabdetails = res.workorder;
          this.rollnnumber1 = res.entry1;
          this.rollnnumber2 = res.entry2;
          this.rollnnumber3 = res.entry3;
          this.rollnnumber4 = res.entry4;
          this.rollnnumber5 = res.entry5;
          this.rollnnumber6 = res.entry6;
          this.rollnnumber7 = res.entry7;
          this.total_1 = res.total_1;
          this.total_2 = res.total_2;
          this.total_3 = res.total_3;
          this.total_4 = res.total_4;
          this.total_5 = res.total_5;
          this.total_6 = res.total_6;
          this.total_7 = res.total_7;
          this.workorderId = this.fabdetails.id;
          this.entrytotals();
        })
      )
  }



  changetab(event: MatTabChangeEvent) {
    this.tabLabel = event.tab.textLabel;

    setTimeout(() => {
      switch (this.tabLabel) {
        case 'First Roll Weight':
          this.fabrollweight();
          break;

        case 'Greige Fab Del Entry':
          this.greigefabDElEntry();
          break;

        case 'Dye Batch Entry':
          this.dyeBatchEntry();
          break;

        case 'Dye Finish Entry':
          this.dyeFinishEntry();
          break;

        case 'Dyed Fab Del Entry':
          this.dyedFabDelEntry();
          break;

        case 'Transfer from warehouse to Cut':
          this.warehouseToCut();
          break;

        case 'Actual Cut panels Entry':
          this.actualCutPanelEntry();
          break;

        default:
          break;
      }
    }, 1000);
  }




  resetform() {
    if (this.items.length !== 0) {
      this.items.removeAt(0);
      this.items.clear();
    }
    if (this.items2.length != 0) {
      this.items2.removeAt(0);
      this.items2.clear();
    }
    if (this.items3.length != 0) {
      this.items3.removeAt(0);
      this.items3.clear();
    }
    while (this.items4.length != 0) {
      this.items4.removeAt(0);
      this.items4.clear();
    }
    while (this.items5.length != 0) {
      this.items5.removeAt(0);
      this.items5.clear();
    }
    while (this.items6.length != 0) {
      this.items6.removeAt(0);
      this.items6.clear();
    }
    while (this.items7.length != 0) {
      this.items7.removeAt(0);
      this.items7.clear();
    }
  }

  form: FormGroup = this.fb.group({

    addprocess: this.fb.array([ 
      this.fb.group({
        id:new FormControl(),
        days: new FormControl(),
        notes: new FormControl(),
        noOfRolls: new FormControl(),
        entry_1: new FormControl(),
        production_date: new FormControl(),
      })
    ]),    
  });


addEntry1button() {
  this.items.push(this.fb.group({
    id: new FormControl(),
    days: new FormControl(),
    notes: new FormControl(),
    noOfRolls: new FormControl(),
    entry_1: new FormControl(),
    production_date: new FormControl(),
  }));
}

add1() {
  this.formArray = new FormArray(
  this.rollnnumber1.map((defaultValues:any)=>
  this.fb.group({
    id:[defaultValues.entry1_id],
    days: [defaultValues.days],
    notes:[defaultValues.notes],
    noOfRolls: [defaultValues.noOfRolls],
    entry_1: [defaultValues.entry_1 ],
    production_date: [defaultValues.production_date ]
  })
  )
  )
  this.form.setControl('addprocess', this.formArray);
}

get items() {
    return this.form.get("addprocess") as FormArray;
  }

  deleteEntry1(i: number) {
    // this.items.removeAt(i);
    const id = this.rollnnumber1[i].workorderId;
    const lineId = this.rollnnumber1[i].entry1_id;
    this.api.entry1Delete(id, lineId).subscribe((res)=>{
      alert(res.message)
      this.loadworkorder()
    })

  }

  submit() {
    this.loading1 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "1",
      "entry1": this.form.get('addprocess') as FormArray
    })

    this.api.Fabricroll1entry(this.entry1form.value).subscribe((res) => {
      alert(res.message);
      this.loading1 = false;
      this.loadworkorder()
    })
  }

  //===============================================================================================================================

  form2 = this.fb.group({
    addprocess2: this.fb.array([ 
      this.fb.group({
        id:new FormControl(),
        days: new FormControl(),
        notes: new FormControl(),
        noOfRolls: new FormControl(),
        entry_2: new FormControl(),
        production_date: new FormControl(),
      })
    ]),   
  });

  get items2() {
    return this.form2.get('addprocess2') as FormArray;
  }

  addEntry2button() {
    this.items2.push(this.fb.group({
      id:new FormControl(),
      days: new FormControl(),
      noOfRolls: new FormControl(),
      notes: new FormControl(),
      entry_2: new FormControl(),
      production_date: new FormControl(),
    }));
  }
  
  add2() {
    this.formArray = new FormArray(
    this.rollnnumber2.map((defaultValues:any)=>
    this.fb.group({
      id:[defaultValues.entry2_id],
      days: [defaultValues.days],
      notes:[defaultValues.notes],
      noOfRolls: [defaultValues.noOfRolls],
      entry_2: [defaultValues.entry_2],
      production_date: [defaultValues.production_date]
    })
    )
    )
    this.form2.setControl('addprocess2', this.formArray);
  }

  deleteEntry2(i: number) {
    // this.items2.removeAt(i);
    const id = this.rollnnumber2[i].workorderId;
    const lineId = this.rollnnumber2[i].entry2_id;
    this.api.entry2Delete(id, lineId).subscribe((res)=>{
      alert(res.message)
      this.loadworkorder()
    })
  }

  submit2() {
    this.loading2 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "1",
      "entry2": this.form2.get('addprocess2') as FormArray
    })
    this.api.Fabricroll2entry(this.entry1form.value).subscribe((res) => {
      alert(res.message);
      this.loading2 = false;
      this.greigefabDElEntry()
    })
  }

  //=======================================================================================

  form3 = this.fb.group({
    addprocess3: this.fb.array([ 
      this.fb.group({
        id:new FormControl(),
        batchCode: new FormControl(),
        days: new FormControl(),
        notes: new FormControl(),
        noOfRolls: new FormControl(),
        entry_3: new FormControl(),
        production_date: new FormControl(),
      })
    ]),   
  });

  get items3() {
    return this.form3.get('addprocess3') as FormArray;
  }

  addEntry3button() {
    this.items3.push(this.fb.group({
      id:new FormControl(),
      batchCode: new FormControl(),
      days: new FormControl(),
      notes: new FormControl(),
      noOfRolls: new FormControl(),
      entry_3: new FormControl(),
      production_date: new FormControl(),
    }));
  }

  deleteEntry3(i: number) {
    // this.items3.removeAt(i);

    const id = this.rollnnumber3[i].workorderId;
    const lineId = this.rollnnumber3[i].entry3_id;
    this.api.entry3Delete(id, lineId).subscribe((res)=>{
      alert(res.message)
      this.loadworkorder()
    })
  }


  add3() {
    this.formArray = new FormArray(
    this.rollnnumber3.map((defaultValues:any)=>
    this.fb.group({
      id:[defaultValues.entry3_id],
      batchCode: [defaultValues.batchCode || this.batchGenerate?.value],
      days: [defaultValues.days],
      notes:[defaultValues.notes],
      noOfRolls: [defaultValues.noOfRolls],
      entry_3: [defaultValues.entry_3],
      production_date: [defaultValues.production_date]
    }))
    )
    this.form3.setControl('addprocess3', this.formArray);
  }

  submit3() {
    this.loading3 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "1",
      "entry3": this.form3.get('addprocess3') as FormArray
    })
    this.api.Fabricroll3entry(this.entry1form.value).subscribe((res) => {
      alert(res.message);
      this.loading3 = false;
      this.dyeBatchEntry()
    })
  }


  //=======================================================================================

  form4 = this.fb.group({
    addprocess4: this.fb.array([ 
      this.fb.group({
        id:new FormControl(),
        batchCode: new FormControl(),
        days: new FormControl(),
        notes: new FormControl(),
        noOfRolls: new FormControl(),
        entry_4: new FormControl(),
        production_date: new FormControl(),
      })
    ]),
  });

  addEntry4button() {
    this.items4.push(this.fb.group({
      id:new FormControl(),
      batchCode: new FormControl(),
      days: new FormControl(),
      notes: new FormControl(),
      noOfRolls: new FormControl(),
      entry_4: new FormControl(),
      production_date: new FormControl(),
    }));
  }

  get items4() {
    return this.form4.get('addprocess4') as FormArray;
  }

  deleteEntry4(i: number) {
    // this.items4.removeAt(i);
    const id = this.rollnnumber4[i].workorderId;
    const lineId = this.rollnnumber4[i].entry4_id;
    this.api.entry4Delete(id, lineId).subscribe((res)=>{
      alert(res.message)
      this.loadworkorder()
    })
  }


  add4() {
    this.formArray = new FormArray(
    this.rollnnumber4.map((defaultValues?: any)=>
      this.fb.group({
      id:[defaultValues.entry4_id],
      batchCode: [defaultValues.batchCode || ''],
      days: [defaultValues.days],
      notes:[defaultValues.notes],
      noOfRolls: [defaultValues.noOfRolls],
      entry_4: [defaultValues.entry_4],
      production_date: [defaultValues.production_date]
    }))
    )
    this.form4.setControl('addprocess4', this.formArray);
  }

  submit4() {
    this.loading4 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "1",
      "entry4": this.form4.get('addprocess4') as FormArray
    })
    this.api.Fabricroll4entry(this.entry1form.value).subscribe((res) => {
      alert(res.message);
      this.loading4 = false;
      this.dyeFinishEntry()
    })
  }



  //=======================================================================================

  form5 = this.fb.group({
    addprocess5: this.fb.array([ 
      this.fb.group({
        id:new FormControl(),
        batchCode: new FormControl(),
        days: new FormControl(),
        notes: new FormControl(),
        griegeRolls:new FormControl(),
        griegeKgs:new FormControl(),
        noOfRolls: new FormControl(),
        entry_5: new FormControl(),
        production_date: new FormControl(),
      })
    ]),
  });

  get items5() {
    return this.form5.get('addprocess5') as FormArray;
  }

  addEntry5button() {
    this.items5.push(this.fb.group({
      id:new FormControl(),
      batchCode: new FormControl(),
      days: new FormControl(),
      notes: new FormControl(),
      griegeRolls:new FormControl(),
      griegeKgs:new FormControl(),
      noOfRolls: new FormControl(),
      entry_5: new FormControl(),
      production_date: new FormControl(),
    }));
  }

  deleteEntry5(i: number) {
    // this.items5.removeAt(i);
    const id = this.rollnnumber5[i].workorderId;
    const lineId = this.rollnnumber5[i].entry5_id;
    this.api.entry5Delete(id, lineId).subscribe((res)=>{
      alert(res.message)
      this.loadworkorder()
    })
  }


  add5() {
    this.formArray = new FormArray(
    this.rollnnumber5.map((defaultValues?: any)=>
      this.fb.group({
      id:[defaultValues.entry5_id],
      batchCode: [defaultValues.batchCode],
      days: [defaultValues.days],
      notes:[defaultValues.notes],
      griegeRolls:[defaultValues.griegeRolls],
      griegeKgs:[defaultValues.griegeKgs],
      noOfRolls: [defaultValues.noOfRolls],
      entry_5: [defaultValues.entry_5],
      production_date: [defaultValues.production_date],
    }))
    )
    this.form5.setControl('addprocess5', this.formArray);
  }

  submit5() {
    this.loading5 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "1",
      "entry5": this.form5.get('addprocess5') as FormArray
    })
    this.api.Fabricroll5entry(this.entry1form.value).subscribe((res) => {
      alert(res.message);
      this.loading5 = false;
      this.dyedFabDelEntry()
    })
  }

  //=======================================================================================

  form6 = this.fb.group({
    addprocess6: this.fb.array([ 
      this.fb.group({
        id:new FormControl(),
        batchCode: new FormControl(),
        days: new FormControl(),
        notes: new FormControl(),
        noOfRolls: new FormControl(),
        entry_6: new FormControl(),
        production_date: new FormControl(),
      })
    ]),
  });

  get items6() {
    return this.form6.get('addprocess6') as FormArray;
  }

  addEntry6button() {
    this.items6.push(this.fb.group({
      id:new FormControl(),
      batchCode: new FormControl(),
      days: new FormControl(),
      notes: new FormControl(),
      noOfRolls: new FormControl(),
      entry_6: new FormControl(),
      production_date: new FormControl(),
    }));
  }

  deleteEntry6(i: number) {
    // this.items6.removeAt(i);
    const id = this.rollnnumber6[i].workorderId;
    const lineId = this.rollnnumber6[i].entry6_id;
    this.api.entry6Delete(id, lineId).subscribe((res)=>{
      alert(res.message)
      this.loadworkorder()
    })
  }


  add6() {
    this.formArray = new FormArray(
    this.rollnnumber6.map((defaultValues?: any)=>
    this.fb.group({
      id:[defaultValues.entry6_id],
      batchCode: [defaultValues.batchCode],
      days: [defaultValues.days],
      notes:[defaultValues.notes],
      noOfRolls: [defaultValues.noOfRolls],
      entry_6: [defaultValues.entry_6],
      production_date: [defaultValues.production_date]
    }))
    )
    this.form6.setControl('addprocess6', this.formArray);
  }

  submit6() {
    this.loading6 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "1",
      "entry6": this.form6.get('addprocess6') as FormArray
    })

    this.api.Fabricroll6entry(this.entry1form.value).subscribe((res) => {
      alert(res.message);
      this.loading6 = false;
      this.warehouseToCut()
    })
  }

  //=======================================================================================

  form7 = this.fb.group({
    addprocess7: this.fb.array([ 
      this.fb.group({
        id:new FormControl(),
        batchCode: new FormControl(),
        notes: new FormControl(),
        days: new FormControl(),
        noOfRolls: new FormControl(),
        entry_7: new FormControl(),
        production_date: new FormControl(),
      })
    ]),
  });

  get items7() {
    return this.form7.get('addprocess7') as FormArray;
  }

  addEntry7button() {
    this.items7.push(this.fb.group({
      id:new FormControl(),
      batchCode: new FormControl(),
      notes: new FormControl(),
      days: new FormControl(),
      noOfRolls: new FormControl(),
      entry_7: new FormControl(),
      production_date: new FormControl(),
    }));
  }

  deleteEntry7(i: number) {
    // this.items7.removeAt(i);
    const id = this.rollnnumber7[i].workorderId;
    const lineId = this.rollnnumber7[i].entry7_id;
    this.api.entry7Delete(id, lineId).subscribe((res)=>{
      alert(res.message)
      this.loadworkorder()
    })
  }


  add7() {
    this.formArray = new FormArray(
    this.rollnnumber7.map((defaultValues?: any)=>this.fb.group({
      id:[defaultValues.entry7_id],
      batchCode: [defaultValues.batchCode],
      days: [defaultValues.days],
      notes:[defaultValues.notes],
      noOfRolls: [defaultValues.noOfRolls],
      entry_7: [defaultValues.entry_7],
      production_date: [defaultValues.production_date],
    }))
    )
    this.form7.setControl('addprocess7', this.formArray);
  }

  submit7() {
    this.loading7 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "1",
      "entry7": this.form7.get('addprocess7') as FormArray
    })
    this.api.Fabricroll7entry(this.entry1form.value).subscribe((res) => {
      alert(res.message);
      this.loading7 = false;
      this.actualCutPanelEntry()
    })
  }

  //=======================================================================================

  entrytotals() {

  }



}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-fabric-roll-1',
  templateUrl: './fabric-roll-1.component.html',
  styleUrls: ['./fabric-roll-1.component.css']
})
export class FabricRoll1Component implements OnInit {

  show = false;
  displayedColumns: string[] = ['Cum', 'CumWt'];
  dataSource = [...ELEMENT_DATA];
  displayedColumns2: string[] = ['Cum', 'CumWt1', 'CumWt2'];
  dataSource2 = [...ELEMENT_DATA];
  displayedColumns3: string[] = ['Batchno', 'Cum', 'greigeWt', 'dyeWt'];
  dataSource3 = [...ELEMENT_DATA];
  displayedColumns4: string[] = ['Batchno', 'Cum', 'dyeWt', 'finWt'];
  dataSource4 = [...ELEMENT_DATA];
  displayedColumns5: string[] = ['Batchno', 'rollno', 'greigeWt', 'delWt', 'difference', 'reason'];
  dataSource5 = [...ELEMENT_DATA];
  displayedColumns6: string[] = ['Batchno', 'rollno', 'delWt', 'PlanPcs'];
  dataSource6 = [...ELEMENT_DATA];
  displayedColumns7: string[] = ['Batchno', 'rollno', 'delWt', 'PlanPcs', 'actualcut', 'rejcause'];
  dataSource7 = [...ELEMENT_DATA];



  workorderId: any;
  WoNumber: any;
  fabdetails: any;
  rollnnumber: any;
  entry1form!: FormGroup;
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
  fabcode: any[] = [];
  entry1: any[] = [];
  entry2: any[] = [];
  entry3: any[] = [];
  entry4: any[] = [];
  entry5: any[] = [];
  entry6: any[] = [];
  entry7: any[] = [];
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



  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient,
    private cdref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getbuyers();
    this.getworkorderdetails()
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
    this.loaddetails().subscribe(() => {
      for (let noOfRolls of this.rollnnumber) {
        this.add(noOfRolls);
      }
    })
  }

  greigefabDElEntry() {
    this.resetform();
    this.loaddetails().subscribe(() => {
      for (let noOfRolls of this.rollnnumber) {
        this.add2(noOfRolls)
      }
    })
  }

  dyeBatchEntry() {
    this.resetform();
    this.loaddetails().subscribe(() => {
      for (let noOfRolls of this.rollnnumber) {
        this.add3(noOfRolls)
      }
    })
  }

  dyeFinishEntry() {
    this.resetform();
    this.loaddetails().subscribe(() => {
      for (let noOfRolls of this.rollnnumber) {
        this.add4(noOfRolls)
      }
    })
  }

  dyedFabDelEntry() {
    this.resetform();
    this.loaddetails().subscribe(() => {
      for (let noOfRolls of this.rollnnumber) {
        this.add5(noOfRolls)
      }
    })
  }

  warehouseToCut() {
    this.resetform();
    this.loaddetails().subscribe(() => {
      for (let noOfRolls of this.rollnnumber) {
        this.add6(noOfRolls)
      }
    })
  }

  actualCutPanelEntry() {
    this.resetform();
    this.loaddetails().subscribe(() => {
      for (let noOfRolls of this.rollnnumber) {
        this.add7(noOfRolls)
      }
    })
  }

  loadworkorder() {
    this.resetform();
    this.loaddetails().subscribe((res) => {
      for (let noOfRolls of this.rollnnumber) {
        this.add(noOfRolls);
      }
    });
  }

  loaddetails() {
    const proftoken = 'Bearer ' + sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    return this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=&entry=1&buyer=${this.buyerName}&orderNo=${this.ordernumbers}&style=${this.styleslist}&color=${this.colorslist}&size=${this.sizeslist}`, { headers })
      .pipe(
        tap((res) => {
          this.fabdetails = res.workorder;
          this.rollnnumber = res.fabricRolls;
          this.workorderId = this.rollnnumber[0].workorderId;
          this.entrytotals();
        })
      );
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


  form = this.fb.group({
    entrys: this.fb.array([]),
  });

  get items() {
    return this.form.get('entrys') as FormArray
  }

  delete(index: number) {
    this.items.removeAt(index);
  }

  add(defaultRollNo?: any) {
    this.items.push(
      this.fb.group({
        rollNo: [defaultRollNo.rollNo || ''],
        fabBarcode: [defaultRollNo.fabBarcode || ''],
        entry_1: [defaultRollNo.entry_1 || '']
      })
    )
  }

  submit() {
    this.loading1 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "1",
      "entrys": this.form.get('entrys') as FormArray
    })
    this.api.postfabricdetails(this.entry1form.value).subscribe((res) => {
      alert(res.message);
      this.loading1 = false;
      this.entrytotals();
    })
  }

  //=======================================================================================

  form2 = this.fb.group({
    entrystwo: this.fb.array([]),
  });

  get items2() {
    return this.form2.get('entrystwo') as FormArray;
  }

  delete2(index: number) {
    this.items2.removeAt(index);
  }

  add2(defaultValues?: any) {
    this.items2.push(this.fb.group({
      rollNo: [defaultValues.rollNo || ''],
      fabBarcode: [defaultValues.fabBarcode || ''],
      entry_1: [defaultValues.entry_1 || ''],
      entry_2: [defaultValues.entry_2 || '']
    }));
  }

  submit2() {
    this.loading2 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "2",
      "entrys": this.form2.get('entrystwo') as FormArray
    })
    console.log(this.entry1form.value);
    this.api.postfabricdetails(this.entry1form.value).subscribe((res) => {
      alert(res.message)
      this.loading2 = false;
      this.entrytotals();
    })
  }

  //=======================================================================================

  form3 = this.fb.group({
    entrysthree: this.fb.array([]),
  });

  get items3() {
    return this.form3.get('entrysthree') as FormArray;
  }

  delete3(index: number) {
    this.items3.removeAt(index);
  }

  add3(defaultValues?: any) {
    this.items3.push(this.fb.group({
      batchNo: [defaultValues.batchNo || this.batchGenerate?.value],
      rollNo: [defaultValues.rollNo || ''],
      fabBarcode: [defaultValues.fabBarcode || ''],
      entry_2: [defaultValues.entry_2 || ''],
      entry_3: [defaultValues.entry_3 || '']
    }));
  }

  submit3() {
    this.loading3 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "3",
      "entrys": this.form3.get('entrysthree') as FormArray
    })
    this.api.postfabricdetails(this.entry1form.value).subscribe((res) => {
      alert(res.message)
      this.loading3 = false;
      this.entrytotals();
    })
  }


  //=======================================================================================

  form4 = this.fb.group({
    entrysfour: this.fb.array([]),
  });

  get items4() {
    return this.form4.get('entrysfour') as FormArray;
  }

  delete4(index: number) {
    this.items3.removeAt(index);
  }

  add4(defaultValues?: any) {
    this.items4.push(this.fb.group({
      batchNo: [defaultValues.batchNo || ''],
      rollNo: [defaultValues.rollNo || ''],
      fabBarcode: [defaultValues.fabBarcode || ''],
      entry_3: [defaultValues.entry_3 || ''],
      entry_4: [defaultValues.entry_4 || '']
    }));
  }

  submit4() {
    this.loading4 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "4",
      "entrys": this.form4.get('entrysfour') as FormArray
    })
    this.api.postfabricdetails(this.entry1form.value).subscribe((res) => {
      alert(res.message)
      this.loading4 = false;
      this.entrytotals();
    })
  }



  //=======================================================================================

  form5 = this.fb.group({
    entrysfive: this.fb.array([]),
  });

  get items5() {
    return this.form5.get('entrysfive') as FormArray;
  }

  delete5(index: number) {
    this.items5.removeAt(index);
  }

  add5(defaultValues?: any) {
    this.items5.push(this.fb.group({
      batchNo: [defaultValues.batchNo || ''],
      rollNo: [defaultValues.rollNo || ''],
      fabBarcode: [defaultValues.fabBarcode || ''],
      entry_2: [defaultValues.entry_2 || ''],
      entry_4: [defaultValues.entry_4 || ''],
      entry_5: [defaultValues.entry_2 - defaultValues.entry_4 || ''],
      reason: [defaultValues.reason || false]
    }));
  }

  submit5() {
    this.loading5 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "5",
      "entrys": this.form5.get('entrysfive') as FormArray
    })
    console.log(this.entry1form.value)
    const proftoken = 'Bearer ' + sessionStorage.getItem('token')
    this.api.postfabricdetails(this.entry1form.value).subscribe((res) => {
      alert(res.message)
      this.loading5 = false;
      this.entrytotals();
    })
  }

  //=======================================================================================

  form6 = this.fb.group({
    entryssix: this.fb.array([]),
  });

  get items6() {
    return this.form6.get('entryssix') as FormArray;
  }

  delete6(index: number) {
    this.items6.removeAt(index);
  }

  add6(defaultValues?: any) {
    this.items6.push(this.fb.group({
      batchNo: [defaultValues.batchNo || ''],
      rollNo: [defaultValues.rollNo || ''],
      fabBarcode: [defaultValues.fabBarcode || ''],
      entry_4: [defaultValues.entry_4 || ''],
      entry_6: [defaultValues.entry_6 || '']
    }));
  }

  submit6() {
    this.loading6 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "6",
      "entrys": this.form6.get('entryssix') as FormArray
    })
    this.api.postfabricdetails(this.entry1form.value).subscribe((res) => {
      alert(res.message)
      this.loading6 = false;
      this.entrytotals();
    })
  }

  //=======================================================================================

  form7 = this.fb.group({
    entrysseven: this.fb.array([]),
  });

  get items7() {
    return this.form7.get('entrysseven') as FormArray;
  }

  delete7(index: number) {
    this.items7.removeAt(index);
  }

  add7(defaultValues?: any) {
    this.items7.push(this.fb.group({
      batchNo: [defaultValues.batchNo || ''],
      rollNo: [defaultValues.rollNo || ''],
      fabBarcode: [defaultValues.fabBarcode || ''],
      entry_2: [defaultValues.entry_2 || ''],
      entry_6: [defaultValues.entry_6 || ''],
      entry_7: [defaultValues.entry_7 || '']
    }));
  }

  submit7() {
    this.loading7 = true;
    this.entry1form = this.fb.group({
      "workorderId": this.workorderId,
      "entry": "7",
      "entrys": this.form7.get('entrysseven') as FormArray
    })
    this.api.postfabricdetails(this.entry1form.value).subscribe((res) => {
      alert(res.message)
      this.loading7 = false;
      this.entrytotals();
    })
  }

  //=======================================================================================

  entrytotals() {
    this.entry1 = [];
    this.entry2 = [];
    this.entry3 = [];
    this.entry4 = [];
    this.entry5 = [];
    this.entry6 = [];
    this.entry7 = [];
    this.rollnnumber.forEach((entry: any) => {
      if (entry.entry_1 != 0) {
        this.entry1.push(entry.entry_1);
      }
      if (entry.entry_2 != 0) {
        this.entry2.push(entry.entry_2);
      }
      if (entry.entry_3 != 0) {
        this.entry3.push(entry.entry_3);
      }
      if (entry.entry_4 != 0) {
        this.entry4.push(entry.entry_4);
      }
      if (entry.entry_4 != 0 && entry.reason == true) {
        this.entry5.push(entry.entry_4);
      }
      if (entry.entry_6 != 0) {
        this.entry6.push(entry.entry_6);
      }
      if (entry.entry_7 != 0) {
        this.entry7.push(entry.entry_7);
      }
    })
    this.entry1total = this.entry1.reduce((acc, num) => acc + num, 0)
    this.entry2total = this.entry2.reduce((acc, num) => acc + num, 0)
    this.entry3total = this.entry3.reduce((acc, num) => acc + num, 0)
    this.entry4total = this.entry4.reduce((acc, num) => acc + num, 0)
    this.entry5total = this.entry5.reduce((acc, num) => acc + num, 0)
    this.entry6total = this.entry6.reduce((acc, num) => acc + num, 0)
    this.entry7total = this.entry7.reduce((acc, num) => acc + num, 0)
  }



}
export interface PeriodicElement {
  Cum: any;
  CumWt: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Cum: 'Roll.No', CumWt: 'Roll.Wt' }
];
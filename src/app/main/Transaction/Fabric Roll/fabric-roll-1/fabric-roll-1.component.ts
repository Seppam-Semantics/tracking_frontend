import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-fabric-roll-1',
  templateUrl: './fabric-roll-1.component.html',
  styleUrls: ['./fabric-roll-1.component.css']
})
export class FabricRoll1Component implements OnInit {

  show=false;  
  displayedColumns: string[] = ['Cum', 'CumWt'];
  dataSource = [...ELEMENT_DATA];
  displayedColumns2: string[] = ['Cum', 'CumWt1' , 'CumWt2'];
  dataSource2= [...ELEMENT_DATA];
  displayedColumns3: string[] = ['Batchno', 'Cum', 'rollWt', 'greigeWt', 'dyeWt'];
  dataSource3 = [...ELEMENT_DATA];
  displayedColumns4: string[] = ['Batchno', 'Cum' , 'rollWt','greigeWt','dyeWt','finWt'];
  dataSource4 = [...ELEMENT_DATA];
  displayedColumns5: string[] = ['Batchno', 'rollno' , 'greigeWt','delWt','difference','reason'];
  dataSource5 = [...ELEMENT_DATA];
  displayedColumns6: string[] = ['Batchno','rollno','delWt','PlanPcs'];
  dataSource6 = [...ELEMENT_DATA];
  displayedColumns7: string[] = ['Batchno','rollno','delWt','PlanPcs','actualcut','rejcause'];
  dataSource7 = [...ELEMENT_DATA];


  
  workorderId:any;
  WoNumber:any;
  fabdetails:any;
  rollnnumber:any;
  entry1form!:FormGroup;
  numberofrolls:any;
  numbers:any[]= [];
  buyers:any;
  buyerName:any;
  order:any;
  ordernumbers:any;
  stylelist:any;
  styleslist:any;
  colorlist:any;
  colorslist:any;
  sizelist:any;
  sizeslist:any;
  workorderhide:boolean = true;
  fabcode:any[] =[];
  entry1:any[] = [];
  entry2:any[] = [];
  entry3:any[] = [];
  entry4:any[] = [];
  entry5:any[] = [];
  entry6:any[] = [];
  entry7:any[] = [];
  loading1: boolean = false;
  loading2: boolean = false;
  loading3: boolean = false;
  loading4: boolean = false;
  loading5: boolean = false;
  loading6: boolean = false;
  loading7: boolean = false;

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
      // if (this.workorderId) {
      //   this.resetform();
      //   this.loadworkorderdetails(this.workorderId);
      // }
      if(this.buyerName){
       
        this.getorders(this.buyerName)
      }
      if(this.buyerName && this.ordernumbers){
       
        this.getstyle(this.buyerName, this.ordernumbers)
      }
      if(this.buyerName && this.ordernumbers && this.styleslist){
       
        this.getcolor(this.buyerName, this.ordernumbers, this.styleslist)
      }
      if(this.buyerName && this.ordernumbers && this.styleslist && this.colorslist){
       
        this.getsize(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist)
      }
      if(this.buyerName && this.ordernumbers && this.styleslist && this.colorslist && this.sizeslist){
        this.resetform();
        this.loadworkorder(this.buyerName, this.ordernumbers, this.styleslist, this.colorslist, this.sizeslist)
        this.workorderhide = false;
      }
  }

  fabrollweight(){
    this.resetform();
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=&entry=1&buyer=${this.buyerName}&orderNo=${this.ordernumbers}&style=${this.styleslist}&color=${this.colorslist}&size=${this.sizeslist}`, { headers }).subscribe((res)=>{
      this.fabdetails = res.workorder
      this.rollnnumber = res.fabricRolls
      this.workorderId = this.rollnnumber[0].workorderId;
      this.numbers = []
      for(let noOfRolls of this.rollnnumber){
      this.numbers.push(noOfRolls.rollNo)
      this.fabcode.push(noOfRolls.fabBarcode)
      this.entry1.push(noOfRolls.entry_1)
      }
      this.numbers.forEach((value)=>{
        this.add(value);
      })
    })
  }

  greigefabDElEntry(){
    this.resetform();
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=&entry=1&buyer=${this.buyerName}&orderNo=${this.ordernumbers}&style=${this.styleslist}&color=${this.colorslist}&size=${this.sizeslist}`, { headers }).subscribe((res)=>{
      this.fabdetails = res.workorder
      this.rollnnumber = res.fabricRolls
      this.workorderId = this.rollnnumber[0].workorderId;
      this.numbers = [];
      this.fabcode = [];
      this.entry1 = [];
      for(let noOfRolls of this.rollnnumber){
      this.numbers.push(noOfRolls.rollNo)
      this.fabcode.push(noOfRolls.fabBarcode)
      this.entry1.push(noOfRolls.entry_1)
      this.entry2.push(noOfRolls.entry_2)
      }
      this.numbers.forEach((value)=>{
        this.add2(value);
      })
    })
  }

  dyeBatchEntry(){
    this.resetform();
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=&entry=1&buyer=${this.buyerName}&orderNo=${this.ordernumbers}&style=${this.styleslist}&color=${this.colorslist}&size=${this.sizeslist}`, { headers }).subscribe((res)=>{
      this.fabdetails = res.workorder
      this.rollnnumber = res.fabricRolls
      this.workorderId = this.rollnnumber[0].workorderId;
      this.numbers = []
      for(let noOfRolls of this.rollnnumber){
      this.numbers.push(noOfRolls.rollNo)
      this.fabcode.push(noOfRolls.fabBarcode)
      this.entry1.push(noOfRolls.entry_1)
      this.entry2.push(noOfRolls.entry_2)
      this.entry3.push(noOfRolls.entry_3)
      }
      this.numbers.forEach((value)=>{
        this.add3(value);
      })
    })
  }

  dyeFinishEntry(){
    this.resetform();
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=&entry=1&buyer=${this.buyerName}&orderNo=${this.ordernumbers}&style=${this.styleslist}&color=${this.colorslist}&size=${this.sizeslist}`, { headers }).subscribe((res)=>{
      this.fabdetails = res.workorder
      this.rollnnumber = res.fabricRolls
      this.workorderId = this.rollnnumber[0].workorderId;
      this.numbers = []
      for(let noOfRolls of this.rollnnumber){
      this.numbers.push(noOfRolls.rollNo)
      this.fabcode.push(noOfRolls.fabBarcode)
      this.entry1.push(noOfRolls.entry_1)
      this.entry2.push(noOfRolls.entry_2)
      this.entry3.push(noOfRolls.entry_3)
      this.entry4.push(noOfRolls.entry_4)
      }
      this.numbers.forEach((value)=>{
        this.add4(value);
      })
    })
  }

  dyedFabDelEntry(){
    this.resetform();
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=&entry=1&buyer=${this.buyerName}&orderNo=${this.ordernumbers}&style=${this.styleslist}&color=${this.colorslist}&size=${this.sizeslist}`, { headers }).subscribe((res)=>{
      this.fabdetails = res.workorder
      this.rollnnumber = res.fabricRolls
      this.workorderId = this.rollnnumber[0].workorderId;
      this.numbers = []
      for(let noOfRolls of this.rollnnumber){
      this.numbers.push(noOfRolls.rollNo)
      this.fabcode.push(noOfRolls.fabBarcode)
      this.entry2.push(noOfRolls.entry_2)
      this.entry4.push(noOfRolls.entry_4)
      this.entry5.push(noOfRolls.entry_5)
      }
      this.numbers.forEach((value)=>{
        this.add5(value);
      })
    })
  }

  warehouseToCut(){
    this.resetform();
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=&entry=1&buyer=${this.buyerName}&orderNo=${this.ordernumbers}&style=${this.styleslist}&color=${this.colorslist}&size=${this.sizeslist}`, { headers }).subscribe((res)=>{
      this.fabdetails = res.workorder
      this.rollnnumber = res.fabricRolls
      this.workorderId = this.rollnnumber[0].workorderId;
      this.numbers = []
      for(let noOfRolls of this.rollnnumber){
      this.numbers.push(noOfRolls.rollNo)
      this.fabcode.push(noOfRolls.fabBarcode)
      this.entry2.push(noOfRolls.entry_2)
      this.entry6.push(noOfRolls.entry_6)
      }
      this.numbers.forEach((value)=>{
        this.add6(value);
      })
    })
  }

  actualCutPanelEntry(){
    this.resetform();
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=&entry=1&buyer=${this.buyerName}&orderNo=${this.ordernumbers}&style=${this.styleslist}&color=${this.colorslist}&size=${this.sizeslist}`, { headers }).subscribe((res)=>{
      this.fabdetails = res.workorder
      this.rollnnumber = res.fabricRolls
      this.workorderId = this.rollnnumber[0].workorderId;
      this.numbers = []
      for(let noOfRolls of this.rollnnumber){
      this.numbers.push(noOfRolls.rollNo)
      this.fabcode.push(noOfRolls.fabBarcode)
      this.entry2.push(noOfRolls.entry_2)
      this.entry6.push(noOfRolls.entry_6)
      this.entry7.push(noOfRolls.entry_7)
      }
      this.numbers.forEach((value)=>{
        this.add7(value);
      })
    })
  }

loadworkorder(buyer:any, order:any, style:any, color:any, size:any){
  const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=&entry=1&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&size=${size}`, { headers }).subscribe((res)=>{
      this.fabdetails = res.workorder
      this.rollnnumber = res.fabricRolls
      this.workorderId = this.rollnnumber[0].workorderId;
      this.numbers = []
        for(let noOfRolls of this.rollnnumber){
        this.numbers.push(noOfRolls.rollNo)
        this.fabcode.push(noOfRolls.fabBarcode)
        this.entry1.push(noOfRolls.entry_1)
        }
        this.numbers.forEach((value)=>{
          this.add(value);
        })
    })
}


  changetab(event: any) {
    if (event.tab.textLabel == 'First Roll Weight') {
      this.resetform();
      setTimeout(() => {
        this.fabrollweight();
      }, 1000)
    }

    if (event.tab.textLabel == 'Greige Fab Del Entry') {
      this.resetform();
      setTimeout(() => {
        this.greigefabDElEntry();
      }, 1000)
    }
    if (event.tab.textLabel == 'Dye Batch Entry') {
      setTimeout(() => {
        this.dyeBatchEntry();
      }, 1000)
    }
    if (event.tab.textLabel == 'Dye Finish Entry') {
      setTimeout(() => {
        this.dyeFinishEntry();
      }, 1000)
    }
    if (event.tab.textLabel == 'Dyed Fab Del Entry') {
      setTimeout(() => {
        this.dyedFabDelEntry();
      }, 1000)
    }
    if (event.tab.textLabel == 'Transfer from warehouse to Cut') {
      setTimeout(() => {
        this.warehouseToCut();
      }, 1000)
    }
    if (event.tab.textLabel == 'Actual Cut panels Entry') {
      setTimeout(() => {
        this.actualCutPanelEntry();
      }, 1000);
    }
  }



  resetform(){
      while (this.items.length !== 0) {
        this.items.removeAt(0);
        this.items.reset();
      }
    while(this.items2.length != 0){
      this.items2.removeAt(0);
      this.items2.reset();
    }
    while(this.items3.length != 0){
      this.items3.removeAt(0);
      this.items3.reset();
    }
    while(this.items4.length != 0){
      this.items4.removeAt(0);
      this.items4.reset();
    }
    while(this.items5.length != 0){
      this.items5.removeAt(0);
      this.items5.reset();
    }
    while(this.items6.length != 0){
      this.items6.removeAt(0);
      this.items6.reset();
    }
    while(this.items7.length != 0){
      this.items7.removeAt(0);
      this.items7.reset();
    }
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
  
add(defaultRollNo?:any){
  const defaultRollIndex = this.items.length % this.fabcode.length;
  const fabcodenumber = this.fabcode[defaultRollIndex];

  const length1 = this.items.length % this.entry1.length;
  const entry01 = this.entry1[length1];

  this.items.push(
    this.fb.group({
      rollNo:[defaultRollNo || ''],
      fabBarcode:[fabcodenumber || ''],
      entry_1:[entry01 || '']
    })
  )
}

submit(){
  this.loading1 = true;
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form.get('entrys') as FormArray
  })
  this.api.postfabricdetails(this.entry1form.value).subscribe((res)=>{
    alert(res.message);
    this.loading1 = false;
  })
}

//=======================================================================================

form2 = this.fb.group({
  entrystwo:this.fb.array([]),
});

get items2() {
  return this.form2.get('entrystwo') as FormArray;
}

delete2(index: number) {
  this.items2.removeAt (index);
}

  add2(defaultValues?: any) {
    const defaultRollIndex = this.items2.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];
    
    const length1 = this.items2.length % this.entry1.length;
    const entry01 = this.entry1[length1];

    const length2 = this.items2.length % this.entry2.length;
    const entry02 = this.entry2[length2];

    const formGrouptwo = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry001:[entry01 || ''],
      entry_2: [entry02 || '']
    });

    this.items2.push(formGrouptwo);
  }
submit2(){
  this.loading2 = true;
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form2.get('entrystwo') as FormArray
  })
  this.api.postfabricdetails(this.entry1form.value).subscribe((res)=>{
    alert(res.message)
    this.loading2 = false;
  })
}

//=======================================================================================

form3 = this.fb.group({
  entrysthree:this.fb.array([]),
});

get items3() {
  return this.form3.get('entrysthree') as FormArray;
}

delete3(index: number) {
  this.items3.removeAt (index);
  }

  add3(defaultValues?: any) {
    const defaultRollIndex = this.items3.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];

    const length1 = this.items3.length % this.entry1.length;
    const entry01 = this.entry1[length1];

    const length2 = this.items3.length % this.entry2.length;
    const entry02 = this.entry2[length2];

    const length3 = this.items3.length % this.entry3.length;
    const entry03 = this.entry3[length3];
    
    const formGroupthree = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry001:[entry01 || ''],
      entry002:[entry02 || ''],
      entry_3: [entry03 || '']
    });
    this.items3.push(formGroupthree);


  }
submit3(){
  this.loading3 = true;
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form3.get('entrysthree') as FormArray
  })
  this.api.postfabricdetails(this.entry1form.value).subscribe((res)=>{
    alert(res.message)
    this.loading3 = false;
  })
}


//=======================================================================================

form4 = this.fb.group({
  entrysfour:this.fb.array([]),
});

get items4() {
  return this.form4.get('entrysfour') as FormArray;
}

delete4(index: number) {
  this.items3.removeAt (index);
  }

  add4(defaultValues?: any) {
    const defaultRollIndex = this.items4.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];

    const length1 = this.items4.length % this.entry1.length;
    const entry01 = this.entry1[length1];

    const length2 = this.items4.length % this.entry2.length;
    const entry02 = this.entry2[length2];

    const length3 = this.items4.length % this.entry3.length;
    const entry03 = this.entry3[length3];

    const length4 = this.items4.length % this.entry4.length;
    const entry04 = this.entry4[length4];

    const formGroupthree = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry001:[entry01 || ''],
      entry002:[entry02 || ''],
      entry003:[entry03 || ''],
      entry_4: [entry04 || '']
    });

    this.items4.push(formGroupthree);
  }
submit4(){
  this.loading4 = true;
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form4.get('entrysfour') as FormArray
  })
  this.api.postfabricdetails(this.entry1form.value).subscribe((res)=>{
    alert(res.message)
    this.loading4 = false;
  })
}



//=======================================================================================

form5 = this.fb.group({
  entrysfive:this.fb.array([]),
});

get items5() {
  return this.form5.get('entrysfive') as FormArray;
}

delete5(index: number) {
  this.items5.removeAt (index);
  }

  add5(defaultValues?: any) {
    const defaultRollIndex = this.items5.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];

    const length2 = this.items5.length % this.entry2.length;
    const entry02 = this.entry2[length2];

    const length4 = this.items5.length % this.entry4.length;
    const entry04 = this.entry4[length4];

    const length5 = this.items5.length % this.entry5.length;
    const entry05 = this.entry5[length5];

    const formGroupfour = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry002:[entry02 || ''],
      entry004:[entry04 || ''],
      entry_5: [entry05 || '']
    });

    this.items5.push(formGroupfour);
  }
submit5(){
  this.loading5 = true;
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form5.get('entrysfive') as FormArray
  })
  const proftoken = 'Bearer '+ sessionStorage.getItem('token')
  this.api.postfabricdetails(this.entry1form.value ).subscribe((res)=>{
    alert(res.message)
    this.loading5 = false;
  })
}

//=======================================================================================

form6 = this.fb.group({
  entryssix:this.fb.array([]),
});

get items6() {
  return this.form6.get('entryssix') as FormArray;
}

delete6(index: number) {
  this.items6.removeAt (index);
  }

  add6(defaultValues?: any) {
    const defaultRollIndex = this.items6.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];

    const length2 = this.items6.length % this.entry2.length;
    const entry02 = this.entry2[length2];

    const length6 = this.items6.length % this.entry6.length;
    const entry06 = this.entry6[length6];

    const formGroupfour = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry002:[entry02 || ''],
      entry_6: [entry06 || '']
    });

    this.items6.push(formGroupfour);
  }
submit6(){
  this.loading6 = true;
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form6.get('entryssix') as FormArray
  })
  this.api.postfabricdetails(this.entry1form.value).subscribe((res)=>{
    alert(res.message)
    this.loading6 = false;
  })
}

//=======================================================================================

form7 = this.fb.group({
  entrysseven:this.fb.array([]),
});

get items7() {
  return this.form7.get('entrysseven') as FormArray;
}

delete7(index: number) {
  this.items7.removeAt (index);
  }

  add7(defaultValues?: any) {
    const defaultRollIndex = this.items7.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];

    const length2 = this.items7.length % this.entry2.length;
    const entry02 = this.entry2[length2];

    const length6 = this.items7.length % this.entry6.length;
    const entry06 = this.entry6[length6];

    const length7 = this.items7.length % this.entry7.length;
    const entry07 = this.entry6[length7];

    const formGroupfour = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry002:[entry02 || ''],
      entry006:[entry06 || ''],
      entry_7: [entry07 || '']
    });

    this.items7.push(formGroupfour);
  }
submit7(){
  this.loading7 = true;
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form7.get('entrysseven') as FormArray
  })
  this.api.postfabricdetails(this.entry1form.value).subscribe((res)=>{
    alert(res.message)
    this.loading7 = false;
  })
}

//=======================================================================================





}
export interface PeriodicElement {
  Cum: any;
  CumWt: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Cum: 'Roll.No', CumWt: 'Roll.Wt'}
];
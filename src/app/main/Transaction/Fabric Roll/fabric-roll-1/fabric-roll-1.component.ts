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

  constructor(private fb: FormBuilder, private api: ApiService, private http: HttpClient,
    private cdref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')
    this.api.getworkorderdetails(proftoken).subscribe((res)=>{
      this.WoNumber = res.workorders
    })
    this.api.getbuyers(proftoken).subscribe((res)=>{
      this.buyers = res.buyers;
    })
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  getorders(buyer:any){
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/filtersapi/buyers-orders?buyer=${buyer}`, { headers }).subscribe((res)=>{
      this.order = res.orders
    })
  }

  getstyle(buyer:any, order:any){
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/filtersapi/orders-styles?buyer=${buyer}&orderNo=${order}`, { headers }).subscribe((res)=>{
      this.stylelist = res.styles;
    })
  }

  getcolor(buyer:any, order:any, style:any){
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/filtersapi/styles-colors?buyer=${buyer}&orderNo=${order}&style=${style}`, { headers }).subscribe((res)=>{
      this.colorlist = res.colors;
    })
  }

  getsize(buyer:any, order:any, style:any, color:any){
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/filtersapi/colors-sizes?buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}`, { headers }).subscribe((res)=>{
      this.sizelist = res.sizes;
    })
  }


  
onSelectionChange() {
      if (this.workorderId) {
        this.resetform();
        this.loadworkorderdetails(this.workorderId);
      }
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

  loadworkorderdetails(WOno: any){
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')  
    const headers = new HttpHeaders().set('x-access-token', proftoken);
    this.http.get<any>(`${this.api.apiUrl}/fabricrollapi/fabric-entrys?id=${WOno}&entry=1`, { headers }).subscribe((res)=>{
      this.fabdetails = res.workorder
      this.rollnnumber = res.fabricRolls;
      console.log(this.rollnnumber)
      this.numbers = []
        for(let noOfRolls of this.rollnnumber){
        this.numbers.push(noOfRolls.rollNo)
        this.fabcode.push(noOfRolls.fabBarcode)
        }
        this.numbers.forEach((value)=>{
          this.add(value);
          this.add2(value);
          this.add3(value);
          this.add4(value);
          this.add5(value);
          this.add6(value);
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
      console.log(this.rollnnumber)
      this.workorderId = this.rollnnumber[0].workorderId;
      this.numbers = []
        for(let noOfRolls of this.rollnnumber){
        this.numbers.push(noOfRolls.rollNo)
        this.fabcode.push(noOfRolls.fabBarcode)
        }
        this.numbers.forEach((value)=>{
          this.add(value);
          this.add2(value);
          this.add3(value);
          this.add4(value);
          this.add5(value);
          this.add6(value);
          this.add7(value);
        })
    })
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
  this.items.push(
    this.fb.group({
      rollNo:[defaultRollNo || ''],
      fabBarcode:[fabcodenumber || ''],
      entry_1:['']
    })
  )
}

submit(){
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form.get('entrys') as FormArray
  })
  console.log(this.entry1form.value)
  const proftoken = 'Bearer '+ sessionStorage.getItem('token')
  this.api.postfabricdetails(this.entry1form.value, proftoken ).subscribe((res)=>{
    console.log(res);
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
    const defaultRollIndex = this.items.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];
    const formGrouptwo = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry_2: [defaultValues?.entry_2 || '']
    });

    this.items2.push(formGrouptwo);
  }
submit2(){
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form2.get('entrystwo') as FormArray
  })

  const proftoken = 'Bearer '+ sessionStorage.getItem('token')
  this.api.postfabricdetails(this.entry1form.value, proftoken ).subscribe((res)=>{
    console.log(res);
  })
  console.log(this.entry1form.value)
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
    const defaultRollIndex = this.items.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];
    const formGroupthree = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry_3: [defaultValues?.entry_2 || '']
    });

    this.items3.push(formGroupthree);
  }
submit3(){
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form3.get('entrysthree') as FormArray
  })
  const proftoken = 'Bearer '+ sessionStorage.getItem('token')
  this.api.postfabricdetails(this.entry1form.value, proftoken ).subscribe((res)=>{
    console.log(res);
  })
  console.log(this.entry1form.value)
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
    const defaultRollIndex = this.items.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];
    const formGroupthree = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry_4: [defaultValues?.entry_4 || '']
    });

    this.items4.push(formGroupthree);
  }
submit4(){
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form4.get('entrysfour') as FormArray
  })
  const proftoken = 'Bearer '+ sessionStorage.getItem('token')
  this.api.postfabricdetails(this.entry1form.value, proftoken ).subscribe((res)=>{
    console.log(res);
  })
  console.log(this.entry1form.value)
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
    const defaultRollIndex = this.items.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];
    const formGroupfour = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry_5: [defaultValues?.entry_4 || '']
    });

    this.items5.push(formGroupfour);
  }
submit5(){
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form5.get('entrysfive') as FormArray
  })
  const proftoken = 'Bearer '+ sessionStorage.getItem('token')
  this.api.postfabricdetails(this.entry1form.value, proftoken ).subscribe((res)=>{
    console.log(res);
  })
  console.log(this.entry1form.value)
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
    const defaultRollIndex = this.items.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];
    const formGroupfour = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry_6: [defaultValues?.entry_4 || '']
    });

    this.items6.push(formGroupfour);
  }
submit6(){
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form6.get('entryssix') as FormArray
  })
  const proftoken = 'Bearer '+ sessionStorage.getItem('token')
  this.api.postfabricdetails(this.entry1form.value, proftoken ).subscribe((res)=>{
    console.log(res);
  })
  console.log(this.entry1form.value)
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
    const defaultRollIndex = this.items.length % this.fabcode.length;
    const fabcodenumber = this.fabcode[defaultRollIndex];
    const formGroupfour = this.fb.group({
      rollNo: [defaultValues || ''],
      fabBarcode:[fabcodenumber || ''],
      entry_7: [defaultValues?.entry_7 || '']
    });

    this.items7.push(formGroupfour);
  }
submit7(){
  this.entry1form = this.fb.group({
    "workorderId": this.workorderId,
    "entry": "1",
    "entrys":this.form7.get('entrysseven') as FormArray
  })
  const proftoken = 'Bearer '+ sessionStorage.getItem('token')
  this.api.postfabricdetails(this.entry1form.value, proftoken ).subscribe((res)=>{
    console.log(res);
  })
  console.log(this.entry1form.value)
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
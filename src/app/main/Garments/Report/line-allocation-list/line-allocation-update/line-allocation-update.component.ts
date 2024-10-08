import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdown } from 'primeng/dropdown';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-line-allocation-update',
  templateUrl: './line-allocation-update.component.html',
  styleUrls: ['./line-allocation-update.component.css']
})


export class LineAllocationUpdateComponent {
  valueExceeded: boolean = false;
  AllData: any;
  LineAllocationForm: FormGroup;
  Buyer_Value: any;
  buyersDta: any;
  orderNoDta: any;
  Order_Value: any;
  styleDta: any;
  style_Value: any;
  colorDta: any;
  color_Value: any;
  sizeDta: any;
  buyers: any;
  order: any;
  stylelist: any;
  colorlist: any;
  sizelist: any;
  shipDatevalue: any;
  orderpcsvalue: any;
  linedropdata: any;
  prodhrdata: any;
  linefilterdata: any;



  constructor(private router: Router, private api: ApiService, private fb: FormBuilder) {
    this.LineAllocationForm = new FormGroup({
      data: this.fb.array([])
    })

  }
  ngOnInit(): void {
    this.api.lineallocationfilterLine().subscribe((res) => {
      this.linefilterdata = res.data
    })
  }

  edit(line: any) {
    this.api.lineWiseGet(line).subscribe((res) => {
      this.AllData = res.shipping
      // console.log(res)
      const EntryData = this.LineAllocationForm.get('data') as FormArray;
      EntryData.clear();

      this.AllData.forEach((dataItem: any, i: any) => {
        const Details = this.fb.group({
          "id": [dataItem.id],
          "buyer": [dataItem.buyer],
          "orderno": [dataItem.orderNo],
          "style": [dataItem.style],
          "color": [dataItem.color],
          "shipdate": [dataItem.poshipdate],
          "fridate": [dataItem.fridate],
          "orderpcs": [dataItem.orderpcs],
          "planqty": [dataItem.planqty],
          "line": [dataItem.line],
          "startdate": [dataItem.startDate],
          "daysreqd": [dataItem.daysrequired],
          "enddate": [dataItem.endDate],
          "oldid": [dataItem.oldId ? dataItem.oldId : dataItem.id],
          "nextid": [i + 2],
          "seqId": [i + 1]
        })

        EntryData.push(Details);

        Details.get('shipdate')?.valueChanges.subscribe(() => {
          this.calculateEndDate1();
        });

        Details.get('daysreqd')?.valueChanges.subscribe(() => {
          this.calculateEndDate2();
        });

        Details.get('orderpcs')?.valueChanges.subscribe(() => {
          this.calculateEndDate3();
        });

        Details.get('planqty')?.valueChanges.subscribe(() => {
          this.calculateEndDate4();
        });
      })
      this.calculateEndDate2()
    })
  }

  //---------------------------------------------------------------------------------------------------

  get items() {
    return this.LineAllocationForm.get("data") as FormArray
  }

  LineAllocationfun() {
    const row = this.fb.group({
      "id": [''],
      "buyer": ['', Validators.required],
      "orderno": ['', Validators.required],
      "style": ['', Validators.required],
      "color": ['', Validators.required],
      "shipdate": ['', Validators.required],
      "fridate": ['', Validators.required],
      "orderpcs": ['', Validators.required],
      "planqty": ['', Validators.required],
      "line": ['', Validators.required],
      "startdate": ['', Validators.required],
      "daysreqd": ['', Validators.required],
      "enddate": ['', Validators.required],
      "nextid": [],
      "seqId": [],
      "oldid": []
    });

    this.items.push(row)
    row.get('shipdate')?.valueChanges.subscribe(() => {
      this.calculateEndDate1();
    });

    row.get('daysreqd')?.valueChanges.subscribe(() => {
      this.calculateEndDate2();
    });

    row.get('orderpcs')?.valueChanges.subscribe(() => {
      this.calculateEndDate3();
    });

    row.get('planqty')?.valueChanges.subscribe(() => {
      this.calculateEndDate4();
    });
  }

  @ViewChildren('buyername') buyername!: QueryList<Dropdown>;
  buyerlist(index: any) {
    if (this.buyername) {
      setTimeout(() => {
        const dropdownArray = this.buyername.toArray();
        if (dropdownArray[index]) {
          dropdownArray[index].show();
        }
      });
    } else { }
  }

  @ViewChildren('orders') orders!: QueryList<Dropdown>;
  orderlist(index: any) {
    if (this.orders) {
      setTimeout(() => {
        const orders = this.orders.toArray();
        if (orders[index]) {
          orders[index].show();
        }
      });
    } else { }
  }

  @ViewChildren('styles') styles!: QueryList<Dropdown>;
  styleslist(index: any) {
    if (this.styles) {
      setTimeout(() => {
        const styles = this.styles.toArray();
        if (styles[index]) {
          styles[index].show();
        }
      })
    } else { }
  }

  @ViewChildren('colors') colors!: QueryList<Dropdown>;
  colorslist(index: any) {
    if (this.colors) {
      setTimeout(() => {
        const colors = this.colors.toArray();
        if (colors[index]) {
          colors[index].show();
        }
      })
    } else { }
  }

  //-----------------------------------------------------------------------

  //-----------------------------------------------------------------------

  ShipDate(index: any) {
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderno')?.value;
    this.api.lineallocationshipDate(this.Buyer_Value, this.Order_Value).subscribe((res) => {
      this.shipDatevalue = res.shipDate[0].shipDate
      row.get('shipdate')?.setValue(this.shipDatevalue);
    })
  }

  OrderPcsData(index: any) {
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderno')?.value;
    this.style_Value = row.get('style')?.value;
    this.color_Value = row.get('color')?.value;
    this.api.lineallocationOrderPcs(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
      this.orderpcsvalue = res.OrderPcs[0].quantity
      row.get('orderpcs')?.setValue(this.orderpcsvalue);
    })
  }

  lineData(index: any) {
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.style_Value = row.get('style')?.value;
    this.api.lineallocationLine(this.style_Value).subscribe((res) => {
      this.linedropdata = res.data
      this.prodhrdata = parseFloat(res.data[0].prodhr)
    })
  }

  calculateEndDate1() {

    try {
      this.items.controls.forEach((control: AbstractControl) => {
        const row = control as FormGroup;
        if (row instanceof FormGroup) {

          const shipdate = new Date(row.get('shipdate')?.value);

          if (shipdate) {
            const endDate = new Date(shipdate);
            endDate.setDate(shipdate.getDate() - 7);
            row.get('fridate')?.setValue(endDate.toISOString().substring(0, 10));
          }

        }
      });
    }
    catch { }
  }

  calculateEndDate2() {

    try {
      this.items.controls.forEach((control: AbstractControl) => {
        const row = control as FormGroup;
        if (row instanceof FormGroup) {

          const daysreqdValue = parseFloat(row.get('daysreqd')?.value) || 0;
          const startDate = new Date(row.get('startdate')?.value);

          if (startDate && !isNaN(daysreqdValue)) {

            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + daysreqdValue);
            row.get('enddate')?.setValue(endDate.toISOString().substring(0, 10)); // Set enddate in yyyy-MM-dd format
          }

        }
      });
    }
    catch { }
  }

  calculateEndDate3() {

    try {
      this.items.controls.forEach((control: AbstractControl) => {
        const row = control as FormGroup;
        if (row instanceof FormGroup) {

          const orderpcsValue = row.get('orderpcs')?.value;
          const orderpcscalauction = orderpcsValue * 1.05
          row.get('planqty')?.setValue(orderpcscalauction);
        }
      });
    }
    catch { }
  }

  calculateEndDate4() {
    try {
      this.items.controls.forEach((control: AbstractControl) => {
        const row = control as FormGroup;
        if (row instanceof FormGroup) {

          const planqtyValue = row.get('planqty')?.value;
          const daysreqd = (planqtyValue / (this.prodhrdata / 24)).toFixed()
          row.get('daysreqd')?.setValue(daysreqd);
        }
      });
    }
    catch { }
  }
  //-----------------------------------------------------------------------


  check() {
    try {
      const formArray = this.LineAllocationForm.get('data') as FormArray;
      for (let index = formArray.length - 1; index >= 0; index--) {

        const currentRow = formArray.at(index);

        const currentbuyer = currentRow.get('buyer')?.value;
        const currentorderno = currentRow.get('orderno')?.value;
        const currentstyle = currentRow.get('style')?.value;
        const currentcolor = currentRow.get('color')?.value;

        let latestEndDate: Date | null = null;

        for (let i = 0; i < index; i++) {
          const row = formArray.at(i);
          const buyer = row.get('buyer')?.value;
          const orderno = row.get('orderno')?.value;
          const style = row.get('style')?.value;
          const color = row.get('color')?.value;
          const endDate = row.get('enddate')?.value;

          if (currentbuyer === buyer && currentorderno === orderno && currentstyle === style && currentcolor === color) {
            const endDateObj = new Date(endDate);
            if (!latestEndDate || endDateObj > latestEndDate) {
              latestEndDate = endDateObj;
            }
          }
        }

        if (latestEndDate) {
          const nextDay = new Date(latestEndDate);
          nextDay.setDate(nextDay.getDate() + 1);
          currentRow.get('startdate')?.setValue(nextDay.toISOString().substring(0, 10));
        }
      }
    }
    catch { }
  }

  //-------------------------------------------------------------------------------------------
  drop(event: CdkDragDrop<any[]>) {

    moveItemInArray(this.AllData, event.previousIndex, event.currentIndex);


    const entryData = this.LineAllocationForm.get('data') as FormArray;
    const movedItem = entryData.at(event.previousIndex);
    entryData.removeAt(event.previousIndex);
    entryData.insert(event.currentIndex, movedItem);
    this.updateSequenceIds();
  }

  updateSequenceIds() {
    const entryData = this.LineAllocationForm.get('data') as FormArray;
    entryData.controls.forEach((control, index) => {
      control.get('seqId')?.setValue(index + 1);
    });
  }


  //------------------------------------------------------------------------------------------
  save() {
    this.valueExceeded = true;
    if(this.LineAllocationForm.valid){
    this.api.lineallocationPost(this.LineAllocationForm.value).subscribe((res) => {
      if (res.success) {
        this.valueExceeded = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
      } else { }

    })
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Fill All Required datas"
    });
  }
  }

  new() {
    this.router.navigate(['main/lineAllocationReport'])
  }

  back() {
    this.router.navigate(['main/LineAllocationList'])
  }

}

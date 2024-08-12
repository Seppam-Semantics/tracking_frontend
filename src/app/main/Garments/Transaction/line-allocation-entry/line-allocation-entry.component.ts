import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdown } from 'primeng/dropdown';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-line-allocation-entry',
  templateUrl: './line-allocation-entry.component.html',
  styleUrls: ['./line-allocation-entry.component.css']
})
export class LineAllocationEntryComponent implements OnInit {
  valueExceeded: boolean = false;
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
  startdate_Value: any;
  dateMonth: any;
  line_Value: any;
  prodhr_value: any;
  AllWorkhrs: any;
  accumulatedHours: any;
  daysreqd: any;
  addvalue: any;



  ngOnInit(): void {
    this.api.getbuyersData().subscribe((res) => {
      this.buyers = res.buyers;
    })

  }

  constructor(private api: ApiService, private fb: FormBuilder, private datePipe: DatePipe, private router: Router) {

    this.LineAllocationForm = new FormGroup({
      data: this.fb.array([])
    })

  }

  //---------------------------------------------------------------------------------------------------

  getBuyerValue(index: any) {
    // this.buyerName = event.target.value;
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.getorders()
  }

  getorders() {
    this.api.Buyer_to_order(this.Buyer_Value).subscribe((res) => {
      this.order = res.orderNo
    })
  }

  ordervalue(index: any) {
    // this.Order_Value = event.target.value
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderno')?.value;
    this.orderdata()
  }

  orderdata() {
    this.api.order_to_style(this.Buyer_Value, this.Order_Value).subscribe((res) => {
      this.stylelist = res.style;
    })
  }
  stylevalue(index: any) {
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderno')?.value;
    this.style_Value = row.get('style')?.value;
    this.styledata()
  }

  styledata() {
    this.api.style_to_color(this.Buyer_Value, this.Order_Value, this.style_Value).subscribe((res) => {
      this.colorlist = res.color;
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
      // this.calculateEndDate4();
    });
  }

  delete(i: any) {
    this.items.removeAt(i)
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
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderno')?.value;
    this.style_Value = row.get('style')?.value;
    this.color_Value = row.get('color')?.value;
    this.api.lineallocationLine(this.style_Value).subscribe((res) => {
      this.linedropdata = res.data
      this.prodhrdata = parseFloat(res.data[0].prodhr)

    })
  }

  getstartdate(index: any) {
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.Buyer_Value = row.get('buyer')?.value;
    this.Order_Value = row.get('orderno')?.value;
    this.style_Value = row.get('style')?.value;
    this.color_Value = row.get('color')?.value;

    this.api.lineallocationstatDate(this.Buyer_Value, this.Order_Value, this.style_Value, this.color_Value).subscribe((res) => {
      const formArray = this.LineAllocationForm.get('data') as FormArray;
      const row = formArray.at(index);
      row.get('startdate')?.setValue(res.date[0].endDate)
    })
  }


  dateworkhrs(index: any) {
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.startdate_Value = row.get('startdate')?.value;
    this.dateMonth = this.datePipe.transform(row.get('startdate')?.value, 'MM')
    this.api.lineallocationworkhrs(this.startdate_Value, this.dateMonth).subscribe((res) => {
      this.AllWorkhrs = res.date
    })
  }

  dataprodhr(index: any) {
    const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.style_Value = row.get('style')?.value;
    this.line_Value = row.get('line')?.value;
    this.api.lineallocationprodhr(this.line_Value, this.style_Value).subscribe((res) => {
      this.prodhr_value = res.data[0].prodhr
    })
    this.dateworkhrs(index)

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
            row.get('enddate')?.setValue(endDate.toISOString().substring(0, 10));
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

  calculateEndDate4(index:number) {
    try {
      const formArray = this.LineAllocationForm.get('data') as FormArray;
    const row = formArray.at(index);
    this.style_Value = row.get('style')?.value;
    this.line_Value = row.get('line')?.value;
    this.api.lineallocationprodhr(this.line_Value, this.style_Value).subscribe((res) => {
      this.prodhr_value = res.data[0].prodhr

      this.items.controls.forEach((control: AbstractControl) => {
        const row = control as FormGroup;
        if (row instanceof FormGroup) {
          const planqtyValue = row.get('planqty')?.value;
          const totalHoursRequired = planqtyValue / this.prodhr_value;
          let accumulatedHours = 0;
          let daysCount = 0;
          let lastDate: string | null = null;

          for (let i = 0; i < this.AllWorkhrs.length; i++) {
            try {
              const workhrs = this.AllWorkhrs[i].workhrs;
              const date = this.AllWorkhrs[i].date;

              if (workhrs > 0) {
                if (accumulatedHours + workhrs >= totalHoursRequired) {
                  daysCount++;
                  lastDate = date;

                  break;
                } else if (accumulatedHours + workhrs > 0) {
                  accumulatedHours += workhrs;
                  daysCount++;
                  lastDate = date;
                }
              }
            } catch { }
          }
          row.get('daysreqd')?.setValue(daysCount - 1);
        }
      });
    })
    this.dateworkhrs(index) } catch {    }
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

  save() {
    this.valueExceeded = true
    if ( this.LineAllocationForm.valid ) {
      this.valueExceeded = false
      this.api.lineallocationPost(this.LineAllocationForm.value).subscribe((res) => {
        Swal.fire({
          position: "top-end" ,
          icon: "success" ,
          title: res.message ,
          showConfirmButton: false ,
          timer: 1500
        });
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill All Required datas"
      });
    }
  }
  back() {
    this.router.navigate(['main/LineAllocationList'])
  }
}

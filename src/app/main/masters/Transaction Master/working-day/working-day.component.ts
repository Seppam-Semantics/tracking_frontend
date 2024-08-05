import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-working-day',
  templateUrl: './working-day.component.html',
  styleUrls: ['./working-day.component.css']
})
export class WorkingDayComponent implements OnInit {
  WorkingDaycreationpopup: boolean = false
  WorkingDayupdatepopup: boolean = false
  WorkingDaycreate: FormGroup;
  WorkingDayUpdate: FormGroup;
  allData: any;
  workingdayAlldata: any;
  selectedMonth: string | null = null;
  dates: any = [];
  monthlist: any;
  dates2: any;
  leavevalid: boolean[] = [];
  selectedYear: any;
  onlyYear: any;

  ngOnInit(): void {
    this.api.workingdaylist().subscribe((res) => {
      this.allData = res.workingday
    })
    this.api.monthlist().subscribe((res) => {
      this.monthlist = res.month
    })
  }

  constructor(private fb: FormBuilder, private api: ApiService, private datePipe: DatePipe) {

    this.WorkingDayUpdate = this.fb.group({
      id: new FormControl(''),
      data: this.fb.array([]),
      month: new FormControl(''),
      year: new FormControl('')
    })

    this.WorkingDaycreate = this.fb.group({
      id: new FormControl(''),
      data: this.fb.array([]),
      month: new FormControl(''),
      year: new FormControl('')
    })
  }



  yearlist = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() + i;
    return { year: year };
  });


  loadsavevalue(){
    this.onlyYear = this.WorkingDaycreate.get('year')?.value
    this.api.workingdaymonth(this.WorkingDaycreate.get('month')?.value ,this.onlyYear).subscribe((res) => {
      this.dates2 = res.workingday;
      const EntryData = this.WorkingDaycreate.get('data') as FormArray;

      EntryData.clear();
      this.dates2.forEach((dataItem: any) => {
        const Details = this.fb.group({
          date: [this.datePipe.transform(dataItem.date, 'yyyy-MM-dd')],
          id: [dataItem.id],
          workhrs: [dataItem.workhrs],
          day: [dataItem.Day],
          isleave: [dataItem.isleave],
          Remarks: [dataItem.remarks]
        });
        EntryData.push(Details);
      });
    })
  }

  onMonthChange(): void {
    this.selectedMonth = this.WorkingDayUpdate.get('month')?.value;
    this.selectedYear = this.WorkingDayUpdate.get('year')?.value;

    if (this.selectedMonth && this.selectedYear) {
      const monthIndex = this.monthlist.findIndex((month: any) => month.month === this.selectedMonth) + 1;
      if (monthIndex > 0) {
        this.generateDatesForMonth(this.selectedYear, monthIndex);
      }
    }
  }

  onYearChange(): void {
    this.selectedMonth = this.WorkingDayUpdate.get('month')?.value;
    this.selectedYear = this.WorkingDayUpdate.get('year')?.value;

    if (this.selectedMonth && this.selectedYear) {
      const monthIndex = this.monthlist.findIndex((month: any) => month.month === this.selectedMonth) + 1;
      if (monthIndex > 0) {
        this.generateDatesForMonth(this.selectedYear, monthIndex);
      }
    }
  }

  generateDatesForMonth(year: number, month: number): void {
    this.dates = [];
    const date = new Date(year, month - 1, 1);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const EntryData = this.WorkingDayUpdate.get('data') as FormArray;
    EntryData.clear();

    while (date.getMonth() === month - 1) {
      this.dates.push({
        date: date.toDateString(),
        day: daysOfWeek[date.getDay()]
      });
      date.setDate(date.getDate() + 1);
    }
    this.dates.forEach((dataItem: any) => {
      const Details = this.fb.group({
        date: [this.datePipe.transform(dataItem.date, 'yyyy-MM-dd')],
        workhrs: [],
        day: [dataItem.day],
        isleave: [],
        Remarks: []
      });
      EntryData.push(Details);
    });
  }

  isleaveValid(i: number): void {
    const entryData = this.WorkingDaycreate.get('data') as FormArray;
    const row = entryData.at(i);
    const leave = row.get('isleave')?.value;

    if (leave) {
      this.leavevalid[i] = false;
      row.get('workhrs')?.setValue(0);
      row.get('workhrs')?.disable();
    } else {
      this.leavevalid[i] = true;
      row.get('workhrs')?.enable();
    }
  }



  //---------------------------------------------------------------
  get items() {
    return this.WorkingDaycreate.get("data") as FormArray
  }

  AddDays() {
    const row = this.fb.group({
      id: new FormControl(''),
      date: new FormControl(''),
      isleave: new FormControl(''),
      workhrs: new FormControl(''),
      day: new FormControl(''),
      Remarks: new FormControl('')
    })
    this.items.push(row)
  }

  //---------------------------------------------------------------
  get items2() {
    return this.WorkingDayUpdate.get("data") as FormArray
  }

  AddDays2() {
    const row = this.fb.group({
      id: new FormControl(''),
      date: new FormControl(''),
      isleave: new FormControl(''),
      workhrs: new FormControl(''),
      day: new FormControl(''),
      Remarks: new FormControl('')
    })
    this.items2.push(row)
  }

  //---------------------------------------------------------------


  WorkingDaycreateOpen1() {
    this.WorkingDaycreationpopup = true
  }

  WorkingDaycreateOpen2() {
    this.WorkingDayupdatepopup = true
  }


  save() {

    this.api.workingdaylistPost(this.WorkingDaycreate.value).subscribe((res) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.api.workingdaylist().subscribe((res) => {
        this.allData = res.workingday
      })
      this.WorkingDaycreationpopup = false
    })
  }


  Newsave() {

    this.api.workingdaylistPost(this.WorkingDayUpdate.value).subscribe((res) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
      this.api.workingdaylist().subscribe((res) => {
        this.allData = res.workingday
      })
      this.WorkingDaycreationpopup = false
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewMoreComponent } from '../view-more/view-more.component';
import { ConfirmDeleteComponent } from 'src/app/alert-message/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeesComponent } from '../add-employees/add-employees.component';
import { EditEmployeesComponent } from '../edit-employees/edit-employees.component';
import { LocalService } from 'src/app/main/main/local.service';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  data: any;
  viewpopup: boolean = false;
  newEmployee : boolean = false;
  edit: boolean = false;
  rolesnames: any;
  employeedetails: any;
  rolesnames2: any;


  constructor(public dialog: MatDialog, private local: LocalService, private api: ApiService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.getemployee();
    this.api.getroles().subscribe((res) => {
      this.rolesnames2 = res.roles
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  getrolesnames() {
    this.api.getroles().subscribe((res) => {
      this.rolesnames = res.roles
    })
  }


  getemployee() {
    const proftoken = 'Bearer ' + sessionStorage.getItem('token');
    this.local.getemployee(proftoken).subscribe((res) => {
      this.data = res.employees
    })
  }

  addemployeesForm1 = new FormGroup({
    employeeCode: new FormControl(),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });


  addemployeesForm2 = new FormGroup({
    employeeCode: new FormControl(),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  addemployeesForm3 = new FormGroup({
    employeeCode: new FormControl(),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  viewData(id: any) {
    this.viewpopup = true
    const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
    this.local.getsingleemployee(id, storedtoken).subscribe((res) => {
      this.employeedetails = res.employee
      this.addemployeesForm2.patchValue({
        employeeCode: res.employee.employeeCode,
        name: res.employee.name,
        email: res.employee.email,
        phone: res.employee.phone,
        password: res.employee.password,
        role: res.employee.roleId,
        address: res.employee.address,
      })
    })

  }

  editemployees(id: any): void {
    this.edit = true
    this.getrolesnames();
    const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
    this.local.getsingleemployee(id, storedtoken).subscribe((res) => {
      this.employeedetails = res.employee
      this.addemployeesForm1.patchValue({
        employeeCode: res.employee.employeeCode,
        name: res.employee.name,
        email: res.employee.email,
        phone: res.employee.phone,
        password: res.employee.password,
        role: res.employee.roleId,
        address: res.employee.address,
      })
    })

  }

  deleteItem(id: any): void {
    const accept = "Do you want to delete";
    if (confirm(accept) == true) {
      const proftoken = 'Bearer ' + sessionStorage.getItem('token');
      this.local.deleteemp(id, proftoken).subscribe(() => {
        alert('deleted');
        window.location.reload()
      })
    } else {
      alert('cancelled');
    }
  }


  addemployees(){
    this.newEmployee = true
  }



  viewsave() {
    if (this.addemployeesForm1.valid) {
      const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
      this.local.addemployee(this.addemployeesForm1.value, storedtoken).subscribe((res) => {
     
        alert(res.message)
        window.location.reload()
      })
    }
    else {
      alert('please fill out all details');
    }
  }

  addsave(){
    if(this.addemployeesForm3.valid){
      const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
      this.local.addemployee(this.addemployeesForm3.value, storedtoken).subscribe((res)=>{
        alert(res.message)
        window.location.reload()
      })
    }
    else{
      alert('please fill out all details');
    }
    }
  }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { LocalService } from 'src/app/main/main/local.service';

@Component({
  selector: 'app-edit-employees',
  templateUrl: './edit-employees.component.html',
  styleUrls: ['./edit-employees.component.css']
})
export class EditEmployeesComponent implements OnInit {

  update!: boolean
  edit!: boolean;
  rolesnames:any;
  employee:any;
  addemployees:FormGroup;

  constructor(private fb:FormBuilder, private api:ApiService, private local:LocalService){ 
    this.addemployees = this.fb.group({
      'id':sessionStorage.getItem('empid'),
      employeeCode:new FormControl(),
      name : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      phone : new FormControl(Validators.required),
      password : new FormControl('', Validators.required),
      role : new FormControl('', Validators.required),
      address : new FormControl('', Validators.required),
    })

   }
  ngOnInit(): void {
    this.getrolesnames();
    this.patch();
  }

   addemployeesSUBMIT(){
  // console.log(this.addemployees.value)
   }


  getrolesnames(){
    const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
  this.api.getroles(storedtoken).subscribe((res)=>{
    this.rolesnames = res.roles
  })
  }

  patch(){
    const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
    const empid = sessionStorage.getItem('empid');
    this.local.getsingleemployee(empid,storedtoken).subscribe((res)=>{
      this.employee = res
      this.addemployees.patchValue({
        employeeCode : res.employee.employeeCode,
        name : res.employee.name,
        email : res.employee.email,
        phone : res.employee.phone,
        password : res.employee.password,
        role : res.employee.roleId,
        address : res.employee.address,
      })
    })

  }

  postemployee(){
    if(this.addemployees.valid){
    const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
    this.local.addemployee(this.addemployees.value, storedtoken).subscribe((res)=>{
      alert(res.message)
    })
  }
  else{
    alert('please fill out all details');
  }
  }




}

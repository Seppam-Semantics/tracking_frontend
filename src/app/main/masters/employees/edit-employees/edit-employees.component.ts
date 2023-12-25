import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

addemployees : FormGroup;
  constructor(private fb:FormBuilder, private api:ApiService, private local:LocalService){ 
    this.addemployees = this.fb.group({
      id: sessionStorage.getItem('empid'),
      employeeCode:new FormControl(),
      name : new FormControl(''), 
      email : new FormControl(''),
      phone : new FormControl(),
      password : new FormControl(''),
      role : new FormControl(''),
      address : new FormControl(''),
    })
   }
  ngOnInit(): void {
    this.getrolesnames();
    this.patch();
  }

   addemployeesSUBMIT(){
  console.log(this.addemployees.value)
   }



  getrolesnames(){
    const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
  this.api.getroles(storedtoken).subscribe((res)=>{
    this.rolesnames = res.roles
    console.log(this.rolesnames);
  })
  }

  patch(){
    const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
    console.log(storedtoken);
    const empid = sessionStorage.getItem('empid');
    this.local.getsingleemployee(empid,storedtoken).subscribe((res)=>{
      this.employee = res
      console.log(this.employee);
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

    const accept = "Do you want to Update the Employee Details.....?";
    if (confirm(accept) == true) {
      const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
    this.local.addemployee(this.addemployees.value, storedtoken).subscribe((res)=>{
      console.log(res);
    })
      window.location.reload();
    } else {  
      alert("Cancelled");
    }
  }




}

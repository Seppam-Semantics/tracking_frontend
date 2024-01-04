import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { LocalService } from 'src/app/main/main/local.service';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {

  update!: boolean
  edit!: boolean;
  rolesnames:any;


  constructor(private fb:FormBuilder, private api:ApiService, private local:LocalService){ }


  ngOnInit(): void {
    this.getrolesnames();
  }


   addemployees = new FormGroup({
    employeeCode : new FormControl(),
    name : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    phone : new FormControl(),
    password : new FormControl('', Validators.required),
    role : new FormControl(''),
    address : new FormControl(''),
  })

  getrolesnames(){
    const storedtoken = 'Bearer ' + sessionStorage.getItem('token')
  this.api.getroles().subscribe((res)=>{
    this.rolesnames = res.roles
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide=true;
  show=false;


  constructor(private router:Router, private api: ApiService){}

  ngOnInit(): void {
    
  }
  
  // routermain(){
  //   this.router.navigate(['/main']);
  // }
  showpassword(){
    this.show=!this.show;
  }

loginform = new FormGroup ({
  'userName': new FormControl(),
  'password' : new FormControl()
})
token:any;
  login(){
    this.api.login(this.loginform.value).subscribe((res)=>{
  if (res.success == true){
    const token = res.token;
    sessionStorage.setItem('token', token)
    this.router.navigate(['/main']);
    alert(res.message)
  }
  else{
    alert(res.error);
  }
    }) 
  }
}

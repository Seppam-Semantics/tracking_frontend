import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, } from '@angular/forms';
import Swal from 'sweetalert2';

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
    history.pushState(null, document.title, window.location.href);
    this.router.navigate(['login'], { skipLocationChange: true });
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
    sessionStorage.setItem('name', res.userContext.name);
    sessionStorage.setItem('token', token)
    this.router.navigate(['/main/FabricRollData']);
    Swal.fire({
      title: "Welcome to TeeTrack!",
      text: "Click Ok To Continue Journey",
      icon: "success"
    });

  }
  else{
    alert(res.error);
  }
    }) 
  }
}

import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { EditEmployeesComponent } from '../masters/employees/edit-employees/edit-employees.component';
import { MainRoutingModule } from '../main-routing.module';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  

  constructor(private api:ApiService, private router:Router , private route : MainRoutingModule){
    
  }


  ngOnInit(): void {


  }

  workorderpermission=    this.route.workorderpermission

  workorderdata: boolean = false;

  
  workorder() {
    this.workorderdata = true;
  }

  logout(){
    this.router.navigate(['login']);
    window.sessionStorage.clear();
  }

}

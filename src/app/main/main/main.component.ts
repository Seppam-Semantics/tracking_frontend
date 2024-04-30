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
  
logo:boolean = true
  constructor(private api:ApiService, private router:Router , private route : MainRoutingModule){
    
  }


  ngOnInit(): void {


  }

  
  workorder() {
    this.logo = false;
  }

  logout(){
    this.router.navigate(['login']);
    window.sessionStorage.clear();
  }
  home(){
    this.router.navigate(['/main/FabricRollData'])  
  }
  
    knite() {
      this.router.navigate(['/main/Knit-Report'])
    }
    Dye() {
      this.router.navigate(['/main/Dye-Report'])
    }
    yarn() {
      this.router.navigate(['/main/Yarn-Report'])
    }
    fabricEntry() {
      this.router.navigate(['/main/fabricroll1'])
    }
    workorder1() {
      this.router.navigate(['/main/WorkorderData'])
    }
    dyedelivery(){
      this.router.navigate(['/main/dye-delivery'])
    }
    knitdelivery(){
      this.router.navigate(['/main/knit-delivery'])
    }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knit-factory-main',
  templateUrl: './knit-factory-main.component.html',
  styleUrls: ['./knit-factory-main.component.css']
})
export class KnitFactoryMainComponent {

  constructor(private router : Router){

  }

  onInit(){

  }

  orderwise(){
    this.router.navigate(['main/KnitFactoryMachine'])
  }
  knitwise(){
    this.router.navigate(['main/knitwise']);
  }
  back(){
    this.router.navigate(['main/knitFactoryMain'])
  }

}

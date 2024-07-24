import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knit-factory-wise',
  templateUrl: './knit-factory-wise.component.html',
  styleUrls: ['./knit-factory-wise.component.css']
})
export class KnitFactoryWiseComponent implements OnInit {
machine:any;


constructor(private router : Router){

}
  ngOnInit(): void {

  }


back(){
  this.router.navigate(['main/knitFactoryMain'])
}
}

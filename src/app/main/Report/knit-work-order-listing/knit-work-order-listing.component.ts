import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knit-work-order-listing',
  templateUrl: './knit-work-order-listing.component.html',
  styleUrls: ['./knit-work-order-listing.component.css']
})
export class KnitWorkOrderListingComponent implements OnInit{

  KnitFtyFillter:any
  BuyerFillter:any
  OrderFillter:any



  constructor(private fb : FormBuilder , private router : Router){}

  ngOnInit(): void {
  
}

exportexcel(){

}
new(){

}
}

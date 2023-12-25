import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { LocalService } from 'src/app/main/main/local.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
})
export class AddRolesComponent implements OnInit {
  addrolesform!: FormGroup;
profilenames:any;
  update!: boolean;


  constructor(private api:ApiService, 
              private local:LocalService, 
              private fb: FormBuilder )
  {
    this.addrolesform = this.fb.group({
      'name': new FormControl(''),
      'profiles': []
    });
  }

  ngOnInit(): void {
this.profilenames = this.api.profilenames
  }
 

  addroles(){    
    console.log(this.addrolesform.value);
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')
    this.local.rolesadd(this.addrolesform.value, proftoken).subscribe((res)=>{
      console.log(res);
    })
    this.addrolesform.reset();
  }
}






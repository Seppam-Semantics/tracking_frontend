import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-organization-setup',
  templateUrl: './organization-setup.component.html',
  styleUrls: ['./organization-setup.component.css']
})
export class OrganizationSetupComponent implements OnInit{
    orgData: any[] = [];

    constructor(private api : ApiService){
    }

    ngOnInit(): void {
        this.api.getorg().subscribe((res:any)=>{
            this.orgData = res.org;
            // console.log(this.orgData)
            sessionStorage.setItem("OrgName" , this.orgData[0].companyName)
        })
}

}

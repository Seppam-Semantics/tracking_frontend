import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { LocalService } from 'src/app/main/main/local.service';


@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent implements OnInit {
  
  editprofileform!: FormGroup;
  singleRoles:any;
  searchProfile!: string;
  profiles: any[] = [];
  update!: boolean;
  apiprofile:any[] = [];
  tempProfile: any = {};
  profilenames: any;
  last_selection: any = null;
  profileId:any[] = [];

  constructor(private api:ApiService, 
              private local:LocalService, 
              private fb: FormBuilder )
  {
    this.editprofileform = this.fb.group({
      'id': sessionStorage.getItem('roleid'),
      'name': new FormControl(''),
      'profiles': []
    });
  }

  ngOnInit(): void {
    this.profilenames = this.api.profilenames;
    this.rolespatch();
    const proftoken = 'Bearer '+ sessionStorage.getItem('token');
    console.log(proftoken);
  }
 
  getProfile(profile: any) {
    this.searchProfile = profile.value;
  }

  getProfileId(data: any) {
    this.tempProfile.id = data.id;
  }

  selectedProfile(profile: any) {
    this.profiles.push(profile);
  }


  
  rolespatch(){
    const id = sessionStorage.getItem('roleid');
    const proftoken = 'Bearer '+ sessionStorage.getItem('token');
    
    this.api.getSingleRoles(id,proftoken).subscribe((res)=>{
      console.log(res);
      this.singleRoles = res.role.profiles;
      this.profiles = res.role.profiles.profiles;
      
      const selectedProfileNames = this.profiles.map((profile) => profile.profileName);
      selectedProfileNames.forEach((name:any)=>{
      const matchedObject = this.profilenames.find((obj:any) => obj.profileName === name);
      if (this.apiprofile) {
        this.apiprofile.push(matchedObject.id);
      }
    })
      this.editprofileform.get('profiles')?.setValue(this.apiprofile);
      this.editprofileform.patchValue({
        'name':this.singleRoles.name
      });
    });
  }


  editroles(){    
    console.log(this.editprofileform.value);
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')
    this.local.rolesadd(this.editprofileform.value, proftoken).subscribe((res)=>{
      console.log(res);
    })
  }
}






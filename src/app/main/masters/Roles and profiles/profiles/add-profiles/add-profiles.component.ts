import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from 'src/app/api.service';
import { LocalService } from '../../../../main/local.service';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-add-profiles',
  templateUrl: './add-profiles.component.html',
  styleUrls: ['./add-profiles.component.css']
})
export class AddProfilesComponent implements OnInit {
  update = this.local.update
  profileform :  FormGroup;
  singleprofile:any;
  select:boolean=true;

  organization = new FormGroup ({
    'creation' : new FormControl(false),
    'selection' : new FormControl(false),
    'updation': new FormControl(false),
    'deletion' : new FormControl(false)
})

profile = new FormGroup ({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})

role = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})

employee = new FormGroup ({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})

workorder = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
fabricrolls = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
garmentsbundles = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
rollentry1 = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
rollentry2 = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
rollentry3 = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
rollentry4 = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
rollentry5 = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
rollentry6 = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
rollentry7 = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
bundlesentry1 = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
bundlesentry2 = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
bundlesentry3 = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
reports = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
dashboards = new FormGroup({
  "creation": new FormControl(false),
  "selection": new FormControl(false),
  "updation": new FormControl(false),
  "deletion": new FormControl(false)
})
  constructor(private fb:FormBuilder, private api:ApiService, private local:LocalService){

    this.profileform = this.fb.group({
      'profileName': new FormControl('', Validators.required),
      'masters': this.fb.group ({
        'organization': this.organization.value,
        'profile': this.profile.value,
        'role': this.role.value,
        'employee': this.employee.value
      }),
      'workOrders':this.fb.group({
        'workOrders':this.workorder
      }),
      'fabricRolls':this.fb.group({
        'fabricRolls':this.fabricrolls
      }),
      'garmentBundles':this.fb.group({
        'garmentBundles':this.garmentsbundles
      }),
      'rollsEntry':this.fb.group({
        'rollsEntry_1':this.rollentry1,
        'rollsEntry_2':this.rollentry2,
        'rollsEntry_3':this.rollentry3,
        'rollsEntry_4':this.rollentry4,
        'rollsEntry_5':this.rollentry5,
        'rollsEntry_6':this.rollentry6,
        'rollsEntry_7':this.rollentry7,
      }),
      'bundlesEntry':this.fb.group({
        'bundlesEntry_1':this.bundlesentry1,
        'bundlesEntry_2':this.bundlesentry2,
        'bundlesEntry_3':this.bundlesentry3
      }),
      'reports':this.fb.group({
        'reports':this.reports
      }),
      'dashboards':this.fb.group({
        'dashboards':this.dashboards
      })
    })
  }

  ngOnInit(): void { 
      this.patch();
   }

  patch(){
    if(this.local.update === true){
    const id = sessionStorage.getItem('profileid')
    const proftoken = 'Bearer '+ sessionStorage.getItem('token')
    this.local.profileid(id, proftoken).subscribe((res)=>{
      this.singleprofile = res.profiles[0];
      this.profileform.patchValue({
        'profileName': this.singleprofile.profileName 
      })
      this.organization.patchValue({
        'creation' : this.singleprofile.masters.organization.creation,
        'selection' : this.singleprofile.masters.organization.selection,
        'updation': this.singleprofile.masters.organization.updation,
        'deletion' : this.singleprofile.masters.organization.deletion
      })
      this.profile.patchValue({
        'creation' : this.singleprofile.masters.profile.creation,
        'selection' : this.singleprofile.masters.profile.selection,
        'updation': this.singleprofile.masters.profile.updation,
        'deletion' : this.singleprofile.masters.profile.deletion
      })
      this.role.patchValue({
        'creation' : this.singleprofile.masters.role.creation,
        'selection' : this.singleprofile.masters.role.selection,
        'updation': this.singleprofile.masters.role.updation,
        'deletion' : this.singleprofile.masters.role.deletion
      })
      this.employee.patchValue({
        'creation' : this.singleprofile.masters.employee.creation,
        'selection' : this.singleprofile.masters.employee.selection,
        'updation': this.singleprofile.masters.employee.updation,
        'deletion' : this.singleprofile.masters.employee.deletion
      })
      this.workorder.patchValue({
        'creation' : this.singleprofile.workOrders.workOrders.creation,
        'selection' : this.singleprofile.workOrders.workOrders.selection,
        'updation': this.singleprofile.workOrders.workOrders.updation,
        'deletion' : this.singleprofile.workOrders.workOrders.deletion
      })
      this.fabricrolls.patchValue({
        'creation' : this.singleprofile.fabricRolls.fabricRolls.creation,
        'selection' : this.singleprofile.fabricRolls.fabricRolls.selection,
        'updation': this.singleprofile.fabricRolls.fabricRolls.updation,
        'deletion' : this.singleprofile.fabricRolls.fabricRolls.deletion
      })
      this.garmentsbundles.patchValue({
        'creation' : this.singleprofile.garmentBundles.garmentBundles.creation,
        'selection' : this.singleprofile.garmentBundles.garmentBundles.selection,
        'updation': this.singleprofile.garmentBundles.garmentBundles.updation,
        'deletion' : this.singleprofile.garmentBundles.garmentBundles.deletion
      })
      this.rollentry1.patchValue({
        'creation' : this.singleprofile.rollsEntry.rollsEntry_1.creation,
        'selection' : this.singleprofile.rollsEntry.rollsEntry_1.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_1.updation,
        'deletion' : this.singleprofile.rollsEntry.rollsEntry_1.deletion
      })
      this.rollentry2.patchValue({
        'creation' : this.singleprofile.rollsEntry.rollsEntry_2.creation,
        'selection' : this.singleprofile.rollsEntry.rollsEntry_2.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_2.updation,
        'deletion' : this.singleprofile.rollsEntry.rollsEntry_2.deletion
      })
      this.rollentry3.patchValue({
        'creation' : this.singleprofile.rollsEntry.rollsEntry_3.creation,
        'selection' : this.singleprofile.rollsEntry.rollsEntry_3.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_3.updation,
        'deletion' : this.singleprofile.rollsEntry.rollsEntry_3.deletion
      })
      this.rollentry4.patchValue({
        'creation' : this.singleprofile.rollsEntry.rollsEntry_4.creation,
        'selection' : this.singleprofile.rollsEntry.rollsEntry_4.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_4.updation,
        'deletion' : this.singleprofile.rollsEntry.rollsEntry_4.deletion
      })
      this.rollentry5.patchValue({
        'creation' : this.singleprofile.rollsEntry.rollsEntry_5.creation,
        'selection' : this.singleprofile.rollsEntry.rollsEntry_5.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_5.updation,
        'deletion' : this.singleprofile.rollsEntry.rollsEntry_5.deletion
      })
      this.rollentry6.patchValue({
        'creation' : this.singleprofile.rollsEntry.rollsEntry_6.creation,
        'selection' : this.singleprofile.rollsEntry.rollsEntry_6.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_6.updation,
        'deletion' : this.singleprofile.rollsEntry.rollsEntry_6.deletion
      })
      this.rollentry7.patchValue({
        'creation' : this.singleprofile.rollsEntry.rollsEntry_7.creation,
        'selection' : this.singleprofile.rollsEntry.rollsEntry_7.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_7.updation,
        'deletion' : this.singleprofile.rollsEntry.rollsEntry_7.deletion
      })
      this.bundlesentry1.patchValue({
        'creation' : this.singleprofile.bundlesEntry.bundlesEntry_1.creation,
        'selection' : this.singleprofile.bundlesEntry.bundlesEntry_1.selection,
        'updation': this.singleprofile.bundlesEntry.bundlesEntry_1.updation,
        'deletion' : this.singleprofile.bundlesEntry.bundlesEntry_1.deletion
      })
      this.bundlesentry2.patchValue({
        'creation' : this.singleprofile.bundlesEntry.bundlesEntry_2.creation,
        'selection' : this.singleprofile.bundlesEntry.bundlesEntry_2.selection,
        'updation': this.singleprofile.bundlesEntry.bundlesEntry_2.updation,
        'deletion' : this.singleprofile.bundlesEntry.bundlesEntry_2.deletion
      })
      this.bundlesentry3.patchValue({
        'creation' : this.singleprofile.bundlesEntry.bundlesEntry_3.creation,
        'selection' : this.singleprofile.bundlesEntry.bundlesEntry_3.selection,
        'updation': this.singleprofile.bundlesEntry.bundlesEntry_3.updation,
        'deletion' : this.singleprofile.bundlesEntry.bundlesEntry_3.deletion
      })
      this.reports.patchValue({
        'creation' : this.singleprofile.reports.reports.creation,
        'selection' : this.singleprofile.reports.reports.selection,
        'updation': this.singleprofile.reports.reports.updation,
        'deletion' : this.singleprofile.reports.reports.deletion
      })
      this.dashboards.patchValue({
        'creation' : this.singleprofile.dashboards.dashboards.creation,
        'selection' : this.singleprofile.dashboards.dashboards.selection,
        'updation': this.singleprofile.dashboards.dashboards.updation,
        'deletion' : this.singleprofile.dashboards.dashboards.deletion
      })
    })
  }
  }


  profileadd(){
    const storedtoken = 'dasdsda ' + sessionStorage.getItem('token')
    if(this.profileform.valid){
    this.local.profileadd(this.profileform.value, storedtoken).subscribe((res)=>{
      alert(res.message);
    })
  }
  else(
    alert('profile name is empty')
  )
  }






}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from 'src/app/api.service';
import { LocalService } from '../../../../main/local.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  wo: boolean = false;
  profileform: FormGroup;
  singleprofile: any;
  mastersall: boolean = false;
  workorderall: boolean = false;



  masterselectall() {
    if (this.selectall.get('mastersall')?.value) {
      this.Masters();
    } else {
      this.MastersF()
    }
  }

  mastercreate() {
    if (this.selectall.get('masterscreate')?.value) {
      this.MastersOrganization();
    } else {
      this.MastersOrganizationF()
    }
  }

  masterread() {
    if (this.selectall.get('mastersread')?.value) {
      this.MastersProfile();
    } else {
      this.MastersProfileF()
    }
  }

  masterupdate() {
    if (this.selectall.get('mastersupdate')?.value) {
      this.MastersRole();
    } else {
      this.MastersRoleF()
    }
  }

  masterdelete() {
    if (this.selectall.get('mastersdelete')?.value) {
      this.MastersEmployee();
    } else {
      this.MastersEmployeeF();
    }
  }

  WorkOrderselectall() {
    if (this.selectall.get('workorderall')?.value) {
      this.WorkOrder()
    } else {
      this.WorkOrderF()
    }
  }

  Reportall(){
    if(this.selectall.get('Reportselectall')?.value){
      this.Reports()
    }else{
      this.ReportsF()
    }
  }

  Dashboardsall(){
    if(this.selectall.get('Dashboardsselectall')?.value){ this.Dashboards()}else{this.DashboardsF()}
  }

  Fabricrollsall(){
    if(this.selectall.get('Fabricrollsall')?.value){
      this.FabricRolls()
    }else{
      this.FabricRollsF()
    }
  }

  GarmentsBbundlesall(){
    if(this.selectall.get('Garmentsbundlesselectall')?.value){
      this.GarmentsBundles()
    }else{
      this.GarmentsBundlesF()
    }
  }

  MastersF() {
    this.organization.get('creation')?.setValue(false)
    this.organization.get('selection')?.setValue(false)
    this.organization.get('updation')?.setValue(false)
    this.organization.get('deletion')?.setValue(false)

    this.profile.get('creation')?.setValue(false)
    this.profile.get('selection')?.setValue(false)
    this.profile.get('updation')?.setValue(false)
    this.profile.get('deletion')?.setValue(false)

    this.role.get('creation')?.setValue(false)
    this.role.get('selection')?.setValue(false)
    this.role.get('updation')?.setValue(false)
    this.role.get('deletion')?.setValue(false)

    this.employee.get('creation')?.setValue(false)
    this.employee.get('selection')?.setValue(false)
    this.employee.get('updation')?.setValue(false)
    this.employee.get('deletion')?.setValue(false)
  }

  MastersOrganizationF() {
    this.organization.get('creation')?.setValue(false)
    this.profile.get('creation')?.setValue(false)
    this.role.get('creation')?.setValue(false)
    this.employee.get('creation')?.setValue(false)
  }

  MastersProfileF() {
    this.organization.get('selection')?.setValue(false)
    this.profile.get('selection')?.setValue(false)
    this.role.get('selection')?.setValue(false)
    this.employee.get('selection')?.setValue(false)
  }

  MastersRoleF() {
    this.organization.get('updation')?.setValue(false)
    this.profile.get('updation')?.setValue(false)
    this.role.get('updation')?.setValue(false)
    this.employee.get('updation')?.setValue(false)
  }

  MastersEmployeeF() {
    this.organization.get('deletion')?.setValue(false)
    this.profile.get('deletion')?.setValue(false)
    this.role.get('deletion')?.setValue(false)
    this.employee.get('deletion')?.setValue(false)
  }
  WorkOrderF() {
    this.workorder.get('creation')?.setValue(false);
    this.workorder.get('selection')?.setValue(false);
    this.workorder.get('updation')?.setValue(false);
    this.workorder.get('deletion')?.setValue(false);
  }

  FabricRollsF() {
    this.fabricrolls.get('creation')?.setValue(false);
    this.fabricrolls.get('selection')?.setValue(false);
    this.fabricrolls.get('updation')?.setValue(false);
    this.fabricrolls.get('deletion')?.setValue(false);
  }

  GarmentsBundlesF() {
    this.garmentsbundles.get('creation')?.setValue(false);
    this.garmentsbundles.get('selection')?.setValue(false);
    this.garmentsbundles.get('updation')?.setValue(false);
    this.garmentsbundles.get('deletion')?.setValue(false);
  }

  RollEntryF() {
    this.rollentry1.get('creation')?.setValue(false)
    this.rollentry1.get('selection')?.setValue(false)
    this.rollentry1.get('updation')?.setValue(false)
    this.rollentry1.get('deletion')?.setValue(false)

    this.rollentry2.get('creation')?.setValue(false)
    this.rollentry2.get('selection')?.setValue(false)
    this.rollentry2.get('updation')?.setValue(false)
    this.rollentry2.get('deletion')?.setValue(false)

    this.rollentry3.get('creation')?.setValue(false)
    this.rollentry3.get('selection')?.setValue(false)
    this.rollentry3.get('updation')?.setValue(false)
    this.rollentry3.get('deletion')?.setValue(false)

    this.rollentry4.get('creation')?.setValue(false)
    this.rollentry4.get('selection')?.setValue(false)
    this.rollentry4.get('updation')?.setValue(false)
    this.rollentry4.get('deletion')?.setValue(false)

    this.rollentry5.get('creation')?.setValue(false)
    this.rollentry5.get('selection')?.setValue(false)
    this.rollentry5.get('updation')?.setValue(false)
    this.rollentry5.get('deletion')?.setValue(false)

    this.rollentry6.get('creation')?.setValue(false)
    this.rollentry6.get('selection')?.setValue(false)
    this.rollentry6.get('updation')?.setValue(false)
    this.rollentry6.get('deletion')?.setValue(false)

    this.rollentry7.get('creation')?.setValue(false)
    this.rollentry7.get('selection')?.setValue(false)
    this.rollentry7.get('updation')?.setValue(false)
    this.rollentry7.get('deletion')?.setValue(false)
  }

  RollEntryCreationF() {
    this.rollentry1.get('creation')?.setValue(false)
    this.rollentry2.get('creation')?.setValue(false)
    this.rollentry3.get('creation')?.setValue(false)
    this.rollentry4.get('creation')?.setValue(false)
    this.rollentry5.get('creation')?.setValue(false)
    this.rollentry6.get('creation')?.setValue(false)
    this.rollentry7.get('creation')?.setValue(false)
  }

  RollEntrySelectionF() {
    this.rollentry1.get('selection')?.setValue(false)
    this.rollentry2.get('selection')?.setValue(false)
    this.rollentry3.get('selection')?.setValue(false)
    this.rollentry4.get('selection')?.setValue(false)
    this.rollentry5.get('selection')?.setValue(false)
    this.rollentry6.get('selection')?.setValue(false)
    this.rollentry7.get('selection')?.setValue(false)
  }

  RollEntryUpdationF() {
    this.rollentry1.get('updation')?.setValue(false)
    this.rollentry2.get('updation')?.setValue(false)
    this.rollentry3.get('updation')?.setValue(false)
    this.rollentry4.get('updation')?.setValue(false)
    this.rollentry5.get('updation')?.setValue(false)
    this.rollentry6.get('updation')?.setValue(false)
    this.rollentry7.get('updation')?.setValue(false)
  }

  RollEntryDeletionF() {
    this.rollentry1.get('deletion')?.setValue(false)
    this.rollentry2.get('deletion')?.setValue(false)
    this.rollentry3.get('deletion')?.setValue(false)
    this.rollentry4.get('deletion')?.setValue(false)
    this.rollentry5.get('deletion')?.setValue(false)
    this.rollentry6.get('deletion')?.setValue(false)
    this.rollentry7.get('deletion')?.setValue(false)
  }

  BundlesEntryF() {
    this.bundlesentry1.get('creation')?.setValue(false)
    this.bundlesentry1.get('selection')?.setValue(false)
    this.bundlesentry1.get('updation')?.setValue(false)
    this.bundlesentry1.get('deletion')?.setValue(false)

    this.bundlesentry2.get('creation')?.setValue(false)
    this.bundlesentry2.get('selection')?.setValue(false)
    this.bundlesentry2.get('updation')?.setValue(false)
    this.bundlesentry2.get('deletion')?.setValue(false)

    this.bundlesentry3.get('creation')?.setValue(false)
    this.bundlesentry3.get('selection')?.setValue(false)
    this.bundlesentry3.get('updation')?.setValue(false)
    this.bundlesentry3.get('deletion')?.setValue(false)
  }

  BundlesEntry1F() {
    this.bundlesentry1.get('creation')?.setValue(false)
    this.bundlesentry2.get('creation')?.setValue(false)
    this.bundlesentry3.get('creation')?.setValue(false)
  }

  BundlesEntry2F() {

    this.bundlesentry1.get('selection')?.setValue(false)
    this.bundlesentry2.get('selection')?.setValue(false)
    this.bundlesentry3.get('selection')?.setValue(false)
  }

  BundlesEntry3F() {
    this.bundlesentry1.get('updation')?.setValue(false);
    this.bundlesentry2.get('updation')?.setValue(false);
    this.bundlesentry3.get('updation')?.setValue(false);
  }

  BundlesEntry4F() {
    this.bundlesentry3.get('deletion')?.setValue(false)
    this.bundlesentry3.get('deletion')?.setValue(false)
    this.bundlesentry3.get('deletion')?.setValue(false)
  }

  ReportsF() {
    this.reports.get('creation')?.setValue(false)
    this.reports.get('selection')?.setValue(false)
    this.reports.get('updation')?.setValue(false)
    this.reports.get('deletion')?.setValue(false)
  }

  DashboardsF() {
    this.dashboards.get('creation')?.setValue(false)
    this.dashboards.get('selection')?.setValue(false)
    this.dashboards.get('updation')?.setValue(false)
    this.dashboards.get('deletion')?.setValue(false)
  }




  Masters() {
    this.organization.get('creation')?.setValue(true)
    this.organization.get('selection')?.setValue(true)
    this.organization.get('updation')?.setValue(true)
    this.organization.get('deletion')?.setValue(true)

    this.profile.get('creation')?.setValue(true)
    this.profile.get('selection')?.setValue(true)
    this.profile.get('updation')?.setValue(true)
    this.profile.get('deletion')?.setValue(true)

    this.role.get('creation')?.setValue(true)
    this.role.get('selection')?.setValue(true)
    this.role.get('updation')?.setValue(true)
    this.role.get('deletion')?.setValue(true)

    this.employee.get('creation')?.setValue(true)
    this.employee.get('selection')?.setValue(true)
    this.employee.get('updation')?.setValue(true)
    this.employee.get('deletion')?.setValue(true)
  }

  MastersOrganization() {
    this.organization.get('creation')?.setValue(true)
    this.profile.get('creation')?.setValue(true)
    this.role.get('creation')?.setValue(true)
    this.employee.get('creation')?.setValue(true)
  }

  MastersProfile() {
    this.organization.get('selection')?.setValue(true)
    this.profile.get('selection')?.setValue(true)
    this.role.get('selection')?.setValue(true)
    this.employee.get('selection')?.setValue(true)
  }

  MastersRole() {
    this.organization.get('updation')?.setValue(true)
    this.profile.get('updation')?.setValue(true)
    this.role.get('updation')?.setValue(true)
    this.employee.get('updation')?.setValue(true)
  }

  MastersEmployee() {
    this.organization.get('deletion')?.setValue(true)
    this.profile.get('deletion')?.setValue(true)
    this.role.get('deletion')?.setValue(true)
    this.employee.get('deletion')?.setValue(true)
  }
  WorkOrder() {
    this.workorder.get('creation')?.setValue(true);
    this.workorder.get('selection')?.setValue(true);
    this.workorder.get('updation')?.setValue(true);
    this.workorder.get('deletion')?.setValue(true);
  }

  FabricRolls() {
    this.fabricrolls.get('creation')?.setValue(true);
    this.fabricrolls.get('selection')?.setValue(true);
    this.fabricrolls.get('updation')?.setValue(true);
    this.fabricrolls.get('deletion')?.setValue(true);
  }

  GarmentsBundles() {
    this.garmentsbundles.get('creation')?.setValue(true);
    this.garmentsbundles.get('selection')?.setValue(true);
    this.garmentsbundles.get('updation')?.setValue(true);
    this.garmentsbundles.get('deletion')?.setValue(true);
  }

  RollEntry() {
    this.rollentry1.get('creation')?.setValue(true)
    this.rollentry1.get('selection')?.setValue(true)
    this.rollentry1.get('updation')?.setValue(true)
    this.rollentry1.get('deletion')?.setValue(true)

    this.rollentry2.get('creation')?.setValue(true)
    this.rollentry2.get('selection')?.setValue(true)
    this.rollentry2.get('updation')?.setValue(true)
    this.rollentry2.get('deletion')?.setValue(true)

    this.rollentry3.get('creation')?.setValue(true)
    this.rollentry3.get('selection')?.setValue(true)
    this.rollentry3.get('updation')?.setValue(true)
    this.rollentry3.get('deletion')?.setValue(true)

    this.rollentry4.get('creation')?.setValue(true)
    this.rollentry4.get('selection')?.setValue(true)
    this.rollentry4.get('updation')?.setValue(true)
    this.rollentry4.get('deletion')?.setValue(true)

    this.rollentry5.get('creation')?.setValue(true)
    this.rollentry5.get('selection')?.setValue(true)
    this.rollentry5.get('updation')?.setValue(true)
    this.rollentry5.get('deletion')?.setValue(true)

    this.rollentry6.get('creation')?.setValue(true)
    this.rollentry6.get('selection')?.setValue(true)
    this.rollentry6.get('updation')?.setValue(true)
    this.rollentry6.get('deletion')?.setValue(true)

    this.rollentry7.get('creation')?.setValue(true)
    this.rollentry7.get('selection')?.setValue(true)
    this.rollentry7.get('updation')?.setValue(true)
    this.rollentry7.get('deletion')?.setValue(true)
  }

  RollEntryCreation() {
    this.rollentry1.get('creation')?.setValue(true)
    this.rollentry2.get('creation')?.setValue(true)
    this.rollentry3.get('creation')?.setValue(true)
    this.rollentry4.get('creation')?.setValue(true)
    this.rollentry5.get('creation')?.setValue(true)
    this.rollentry6.get('creation')?.setValue(true)
    this.rollentry7.get('creation')?.setValue(true)
  }

  RollEntrySelection() {
    this.rollentry1.get('selection')?.setValue(true)
    this.rollentry2.get('selection')?.setValue(true)
    this.rollentry3.get('selection')?.setValue(true)
    this.rollentry4.get('selection')?.setValue(true)
    this.rollentry5.get('selection')?.setValue(true)
    this.rollentry6.get('selection')?.setValue(true)
    this.rollentry7.get('selection')?.setValue(true)
  }

  RollEntryUpdation() {
    this.rollentry1.get('updation')?.setValue(true)
    this.rollentry2.get('updation')?.setValue(true)
    this.rollentry3.get('updation')?.setValue(true)
    this.rollentry4.get('updation')?.setValue(true)
    this.rollentry5.get('updation')?.setValue(true)
    this.rollentry6.get('updation')?.setValue(true)
    this.rollentry7.get('updation')?.setValue(true)
  }

  RollEntryDeletion() {
    this.rollentry1.get('deletion')?.setValue(true)
    this.rollentry2.get('deletion')?.setValue(true)
    this.rollentry3.get('deletion')?.setValue(true)
    this.rollentry4.get('deletion')?.setValue(true)
    this.rollentry5.get('deletion')?.setValue(true)
    this.rollentry6.get('deletion')?.setValue(true)
    this.rollentry7.get('deletion')?.setValue(true)
  }

  BundlesEntry() {
    this.bundlesentry1.get('creation')?.setValue(true)
    this.bundlesentry1.get('selection')?.setValue(true)
    this.bundlesentry1.get('updation')?.setValue(true)
    this.bundlesentry1.get('deletion')?.setValue(true)

    this.bundlesentry2.get('creation')?.setValue(true)
    this.bundlesentry2.get('selection')?.setValue(true)
    this.bundlesentry2.get('updation')?.setValue(true)
    this.bundlesentry2.get('deletion')?.setValue(true)

    this.bundlesentry3.get('creation')?.setValue(true)
    this.bundlesentry3.get('selection')?.setValue(true)
    this.bundlesentry3.get('updation')?.setValue(true)
    this.bundlesentry3.get('deletion')?.setValue(true)
  }

  BundlesEntry1() {
    this.bundlesentry1.get('creation')?.setValue(true)
    this.bundlesentry2.get('creation')?.setValue(true)
    this.bundlesentry3.get('creation')?.setValue(true)
  }

  BundlesEntry2() {

    this.bundlesentry1.get('selection')?.setValue(true)
    this.bundlesentry2.get('selection')?.setValue(true)
    this.bundlesentry3.get('selection')?.setValue(true)
  }

  BundlesEntry3() {
    this.bundlesentry1.get('updation')?.setValue(true);
    this.bundlesentry2.get('updation')?.setValue(true);
    this.bundlesentry3.get('updation')?.setValue(true);
  }

  BundlesEntry4() {
    this.bundlesentry3.get('deletion')?.setValue(true)
    this.bundlesentry3.get('deletion')?.setValue(true)
    this.bundlesentry3.get('deletion')?.setValue(true)
  }

  Reports() {
    this.reports.get('creation')?.setValue(true)
    this.reports.get('selection')?.setValue(true)
    this.reports.get('updation')?.setValue(true)
    this.reports.get('deletion')?.setValue(true)
  }

  Dashboards() {
    this.dashboards.get('creation')?.setValue(true)
    this.dashboards.get('selection')?.setValue(true)
    this.dashboards.get('updation')?.setValue(true)
    this.dashboards.get('deletion')?.setValue(true)
  }

  selectall = new FormGroup({
    'mastersall': new FormControl(),
    'masterscreate': new FormControl(),
    'mastersread': new FormControl(),
    'mastersupdate': new FormControl(),
    'mastersdelete': new FormControl(),
    'workorderall' : new FormControl(),
    'Reportselectall':new FormControl(),
    'Dashboardsselectall' : new FormControl(),
    Garmentsbundlesselectall:new FormControl(),
    Fabricrollsall:new FormControl(),
  })

  organization = new FormGroup({
    'creation': new FormControl(false),
    'selection': new FormControl(false),
    'updation': new FormControl(false),
    'deletion': new FormControl(false),
  })

  profile = new FormGroup({
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

  employee = new FormGroup({
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
  constructor(private fb: FormBuilder, private api: ApiService, private local: LocalService) {

    this.profileform = this.fb.group({
      'id': sessionStorage.getItem('profileid'),
      'profileName': new FormControl('', Validators.required),
      'masters': this.fb.group({
        'organization': this.organization.value,
        'profile': this.profile.value,
        'role': this.role.value,
        'employee': this.employee.value
      }),
      'workOrders': this.fb.group({
        'workOrders': this.workorder
      }),
      'fabricRolls': this.fb.group({
        'fabricRolls': this.fabricrolls
      }),
      'garmentBundles': this.fb.group({
        'garmentBundles': this.garmentsbundles
      }),
      'rollsEntry': this.fb.group({
        'rollsEntry_1': this.rollentry1,
        'rollsEntry_2': this.rollentry2,
        'rollsEntry_3': this.rollentry3,
        'rollsEntry_4': this.rollentry4,
        'rollsEntry_5': this.rollentry5,
        'rollsEntry_6': this.rollentry6,
        'rollsEntry_7': this.rollentry7,
      }),
      'bundlesEntry': this.fb.group({
        'bundlesEntry_1': this.bundlesentry1,
        'bundlesEntry_2': this.bundlesentry2,
        'bundlesEntry_3': this.bundlesentry3
      }),
      'reports': this.fb.group({
        'reports': this.reports
      }),
      'dashboards': this.fb.group({
        'dashboards': this.dashboards
      })
    })

  }

  ngOnInit(): void {
    this.patch();
  }

  patch() {
    const id = sessionStorage.getItem('profileid')
    const proftoken = 'Bearer ' + sessionStorage.getItem('token')
    this.local.profileid(id, proftoken).subscribe((res) => {
      this.singleprofile = res.profiles[0];
      this.profileform.patchValue({
        'profileName': this.singleprofile.profileName
      })
      this.organization.patchValue({
        'creation': this.singleprofile.masters.organization.creation,
        'selection': this.singleprofile.masters.organization.selection,
        'updation': this.singleprofile.masters.organization.updation,
        'deletion': this.singleprofile.masters.organization.deletion
      })
      this.profile.patchValue({
        'creation': this.singleprofile.masters.profile.creation,
        'selection': this.singleprofile.masters.profile.selection,
        'updation': this.singleprofile.masters.profile.updation,
        'deletion': this.singleprofile.masters.profile.deletion
      })
      this.role.patchValue({
        'creation': this.singleprofile.masters.role.creation,
        'selection': this.singleprofile.masters.role.selection,
        'updation': this.singleprofile.masters.role.updation,
        'deletion': this.singleprofile.masters.role.deletion
      })
      this.employee.patchValue({
        'creation': this.singleprofile.masters.employee.creation,
        'selection': this.singleprofile.masters.employee.selection,
        'updation': this.singleprofile.masters.employee.updation,
        'deletion': this.singleprofile.masters.employee.deletion
      })
      this.workorder.patchValue({
        'creation': this.singleprofile.workOrders.workOrders.creation,
        'selection': this.singleprofile.workOrders.workOrders.selection,
        'updation': this.singleprofile.workOrders.workOrders.updation,
        'deletion': this.singleprofile.workOrders.workOrders.deletion
      })
      this.fabricrolls.patchValue({
        'creation': this.singleprofile.fabricRolls.fabricRolls.creation,
        'selection': this.singleprofile.fabricRolls.fabricRolls.selection,
        'updation': this.singleprofile.fabricRolls.fabricRolls.updation,
        'deletion': this.singleprofile.fabricRolls.fabricRolls.deletion
      })
      this.garmentsbundles.patchValue({
        'creation': this.singleprofile.garmentBundles.garmentBundles.creation,
        'selection': this.singleprofile.garmentBundles.garmentBundles.selection,
        'updation': this.singleprofile.garmentBundles.garmentBundles.updation,
        'deletion': this.singleprofile.garmentBundles.garmentBundles.deletion
      })
      this.rollentry1.patchValue({
        'creation': this.singleprofile.rollsEntry.rollsEntry_1.creation,
        'selection': this.singleprofile.rollsEntry.rollsEntry_1.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_1.updation,
        'deletion': this.singleprofile.rollsEntry.rollsEntry_1.deletion
      })
      this.rollentry2.patchValue({
        'creation': this.singleprofile.rollsEntry.rollsEntry_2.creation,
        'selection': this.singleprofile.rollsEntry.rollsEntry_2.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_2.updation,
        'deletion': this.singleprofile.rollsEntry.rollsEntry_2.deletion
      })
      this.rollentry3.patchValue({
        'creation': this.singleprofile.rollsEntry.rollsEntry_3.creation,
        'selection': this.singleprofile.rollsEntry.rollsEntry_3.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_3.updation,
        'deletion': this.singleprofile.rollsEntry.rollsEntry_3.deletion
      })
      this.rollentry4.patchValue({
        'creation': this.singleprofile.rollsEntry.rollsEntry_4.creation,
        'selection': this.singleprofile.rollsEntry.rollsEntry_4.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_4.updation,
        'deletion': this.singleprofile.rollsEntry.rollsEntry_4.deletion
      })
      this.rollentry5.patchValue({
        'creation': this.singleprofile.rollsEntry.rollsEntry_5.creation,
        'selection': this.singleprofile.rollsEntry.rollsEntry_5.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_5.updation,
        'deletion': this.singleprofile.rollsEntry.rollsEntry_5.deletion
      })
      this.rollentry6.patchValue({
        'creation': this.singleprofile.rollsEntry.rollsEntry_6.creation,
        'selection': this.singleprofile.rollsEntry.rollsEntry_6.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_6.updation,
        'deletion': this.singleprofile.rollsEntry.rollsEntry_6.deletion
      })
      this.rollentry7.patchValue({
        'creation': this.singleprofile.rollsEntry.rollsEntry_7.creation,
        'selection': this.singleprofile.rollsEntry.rollsEntry_7.selection,
        'updation': this.singleprofile.rollsEntry.rollsEntry_7.updation,
        'deletion': this.singleprofile.rollsEntry.rollsEntry_7.deletion
      })
      this.bundlesentry1.patchValue({
        'creation': this.singleprofile.bundlesEntry.bundlesEntry_1.creation,
        'selection': this.singleprofile.bundlesEntry.bundlesEntry_1.selection,
        'updation': this.singleprofile.bundlesEntry.bundlesEntry_1.updation,
        'deletion': this.singleprofile.bundlesEntry.bundlesEntry_1.deletion
      })
      this.bundlesentry2.patchValue({
        'creation': this.singleprofile.bundlesEntry.bundlesEntry_2.creation,
        'selection': this.singleprofile.bundlesEntry.bundlesEntry_2.selection,
        'updation': this.singleprofile.bundlesEntry.bundlesEntry_2.updation,
        'deletion': this.singleprofile.bundlesEntry.bundlesEntry_2.deletion
      })
      this.bundlesentry3.patchValue({
        'creation': this.singleprofile.bundlesEntry.bundlesEntry_3.creation,
        'selection': this.singleprofile.bundlesEntry.bundlesEntry_3.selection,
        'updation': this.singleprofile.bundlesEntry.bundlesEntry_3.updation,
        'deletion': this.singleprofile.bundlesEntry.bundlesEntry_3.deletion
      })
      this.reports.patchValue({
        'creation': this.singleprofile.reports.reports.creation,
        'selection': this.singleprofile.reports.reports.selection,
        'updation': this.singleprofile.reports.reports.updation,
        'deletion': this.singleprofile.reports.reports.deletion
      })
      this.dashboards.patchValue({
        'creation': this.singleprofile.dashboards.dashboards.creation,
        'selection': this.singleprofile.dashboards.dashboards.selection,
        'updation': this.singleprofile.dashboards.dashboards.updation,
        'deletion': this.singleprofile.dashboards.dashboards.deletion
      })
    })
  }


  profileadd() {
    const storedtoken = 'dasdsda ' + sessionStorage.getItem('token')
    if (this.profileform.valid) {
      this.local.profileadd(this.profileform.value, storedtoken).subscribe((res) => {
        alert(res.message);
      })
    }
    else (
      alert('profile name is empty')
    )

    console.log(this.profileform.value)
  }

}

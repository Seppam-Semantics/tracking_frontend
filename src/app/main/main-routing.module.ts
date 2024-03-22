import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FabricRollDataComponent } from './menu/fabric-roll-data/fabric-roll-data.component';
import { WorkorderDataComponent } from './menu/workorder-data/workorder-data.component';
import { GarmentBundlesComponent } from './menu/garment-bundles/garment-bundles.component';
import { RolesProfileRootComponent } from './masters/Roles and profiles/roles/roles-profile-root/roles-profile-root.component';
import { ProfilesComponent } from './masters/Roles and profiles/profiles/profiles.component';
import { AddProfilesComponent } from './masters/Roles and profiles/profiles/add-profiles/add-profiles.component';
import { AppComponent } from '../app.component';
import { ViewEmployeesComponent } from './masters/employees/view-employees/view-employees.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { EditProfileComponent } from './masters/Roles and profiles/profiles/edit-profile/edit-profile.component';
import { FabricRoll1Component } from './Transaction/Fabric Roll/fabric-roll-v1/fabric-roll-1.component';


import { BundleEntry1Component } from './Transaction/Bundle Entry/bundle-entry-1/bundle-entry-1.component';
import { BundleEntry2Component } from './Transaction/Bundle Entry/bundle-entry-2/bundle-entry-2.component';
import { BundleEntry3Component } from './Transaction/Bundle Entry/bundle-entry-3/bundle-entry-3.component';
import { AuthGuard } from '../auth.guard';
import { FabricRollEntry2Component } from './Transaction/Fabric Roll/fabric-roll-entry-v2/fabric-roll-entry-2.component';
import { FabricRollData2Component } from './menu/fabric-roll-data2/fabric-roll-data2.component';
import { ReportEntryComponent } from './Transaction/knit-entry/report-entry.component';
import { KnitReportComponent } from './Report/knit-report/knit-report.component';
import { FabricRollEntry3Component } from './Transaction/Fabric Roll/fabric-roll-entry-v3/fabric-roll-entry-3.component';
import { DyeBatchEntryComponent } from './Transaction/dye-batch-entry/dye-batch-entry.component';

const routes: Routes = [
  {path:'', component: AppComponent},
  

  { path: 'FabricRollData', component: FabricRollData2Component},
  { path: 'WorkorderData', component: WorkorderDataComponent },
  { path: 'GarmentBundles' , component: GarmentBundlesComponent },

  { path: 'RolesProfileRoot', component:RolesProfileRootComponent },
  { path:'welcome' , component:WelcomeComponent},
  
  { path: 'profile' , component: ProfilesComponent },
  { path: 'addprofile' , component:AddProfilesComponent},
  { path: 'updateprofile' , component:EditProfileComponent},
  {path: 'viewemployees', component:ViewEmployeesComponent},

  {path:'fabricroll1',component:FabricRollEntry3Component},

  {path:'bundleentry1',component:BundleEntry1Component},
  {path:'bundleentry2',component:BundleEntry2Component},
  {path:'bundleentry3',component:BundleEntry3Component},
  {path:'ReportEntry', component: ReportEntryComponent},
  {path:"Knite-Report" , component:KnitReportComponent},
  {path:"DyeBatchEntry" , component:DyeBatchEntryComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { 


}

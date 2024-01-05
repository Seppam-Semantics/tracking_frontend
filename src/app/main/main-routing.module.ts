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
import { FabricRoll1Component } from './Transaction/Fabric Roll/fabric-roll-1/fabric-roll-1.component';
import { FabricRoll7Component } from './Transaction/Fabric Roll/fabric-roll-7/fabric-roll-7.component';
import { FabricRoll6Component } from './Transaction/Fabric Roll/fabric-roll-6/fabric-roll-6.component';
import { FabricRoll5Component } from './Transaction/Fabric Roll/fabric-roll-5/fabric-roll-5.component';
import { FabricRoll4Component } from './Transaction/Fabric Roll/fabric-roll-4/fabric-roll-4.component';
import { FabricRoll3Component } from './Transaction/Fabric Roll/fabric-roll-3/fabric-roll-3.component';
import { FabricRoll2Component } from './Transaction/Fabric Roll/fabric-roll-2/fabric-roll-2.component';

import { BundleEntry1Component } from './Transaction/Bundle Entry/bundle-entry-1/bundle-entry-1.component';
import { BundleEntry2Component } from './Transaction/Bundle Entry/bundle-entry-2/bundle-entry-2.component';
import { BundleEntry3Component } from './Transaction/Bundle Entry/bundle-entry-3/bundle-entry-3.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path:'', component: AppComponent},
  
  { path: 'FabricRollData', component: FabricRollDataComponent,canActivate:[AuthGuard] },
  { path: 'WorkorderData', component: WorkorderDataComponent,canActivate:[AuthGuard] },
  { path: 'GarmentBundles' , component: GarmentBundlesComponent ,canActivate:[AuthGuard]},

  { path: 'RolesProfileRoot', component:RolesProfileRootComponent ,canActivate:[AuthGuard]},
  { path:'welcome' , component:WelcomeComponent ,canActivate:[AuthGuard]},
  
  { path: 'profile' , component: ProfilesComponent ,canActivate:[AuthGuard]},
  { path: 'addprofile' , component:AddProfilesComponent ,canActivate:[AuthGuard]},
  { path: 'updateprofile' , component:EditProfileComponent,canActivate:[AuthGuard]},
  {path: 'viewemployees', component:ViewEmployeesComponent,canActivate:[AuthGuard]},

  {path:'fabricroll1',component:FabricRoll1Component,canActivate:[AuthGuard]},
  {path:'fabricroll2',component:FabricRoll2Component ,canActivate:[AuthGuard]},
  {path:'fabricroll3',component:FabricRoll3Component,canActivate:[AuthGuard]},
  {path:'fabricroll4',component:FabricRoll4Component,canActivate:[AuthGuard]},
  {path:'fabricroll5',component:FabricRoll5Component,canActivate:[AuthGuard]},
  {path:'fabricroll6',component:FabricRoll6Component,canActivate:[AuthGuard]},
  {path:'fabricroll7',component:FabricRoll7Component,canActivate:[AuthGuard]},

  {path:'bundleentry1',component:BundleEntry1Component,canActivate:[AuthGuard]},
  {path:'bundleentry2',component:BundleEntry2Component,canActivate:[AuthGuard]},
  {path:'bundleentry3',component:BundleEntry3Component,canActivate:[AuthGuard]},
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

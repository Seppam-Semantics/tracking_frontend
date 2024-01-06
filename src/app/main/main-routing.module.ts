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

import { BundleEntry1Component } from './Transaction/Bundle Entry/bundle-entry-1/bundle-entry-1.component';
import { BundleEntry2Component } from './Transaction/Bundle Entry/bundle-entry-2/bundle-entry-2.component';
import { BundleEntry3Component } from './Transaction/Bundle Entry/bundle-entry-3/bundle-entry-3.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path:'', component: AppComponent},
  
  { path: 'FabricRollData', component: FabricRollDataComponent},
  { path: 'WorkorderData', component: WorkorderDataComponent },
  { path: 'GarmentBundles' , component: GarmentBundlesComponent },

  { path: 'RolesProfileRoot', component:RolesProfileRootComponent },
  { path:'welcome' , component:WelcomeComponent},
  
  { path: 'profile' , component: ProfilesComponent },
  { path: 'addprofile' , component:AddProfilesComponent},
  { path: 'updateprofile' , component:EditProfileComponent},
  {path: 'viewemployees', component:ViewEmployeesComponent},

<<<<<<< HEAD
  {path:'fabricroll1',component:FabricRoll1Component},
  {path:'fabricroll2',component:FabricRoll2Component},
  {path:'fabricroll3',component:FabricRoll3Component},
  {path:'fabricroll4',component:FabricRoll4Component},
  {path:'fabricroll5',component:FabricRoll5Component},
  {path:'fabricroll6',component:FabricRoll6Component},
  {path:'fabricroll7',component:FabricRoll7Component},

  {path:'bundleentry1',component:BundleEntry1Component},
  {path:'bundleentry2',component:BundleEntry2Component},
  {path:'bundleentry3',component:BundleEntry3Component},
=======
  {path:'fabricroll1',component:FabricRoll1Component,canActivate:[AuthGuard]},
  
  {path:'bundleentry1',component:BundleEntry1Component,canActivate:[AuthGuard]},
  {path:'bundleentry2',component:BundleEntry2Component,canActivate:[AuthGuard]},
  {path:'bundleentry3',component:BundleEntry3Component,canActivate:[AuthGuard]},
>>>>>>> ab7ecd5029d824b85f314b83741d143157450d6a
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

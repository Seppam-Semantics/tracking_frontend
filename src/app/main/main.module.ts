import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricRollDataComponent } from './menu/fabric-roll-data/fabric-roll-data.component';
import { WorkorderDataComponent } from './menu/workorder-data/workorder-data.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';
import { GarmentBundlesComponent } from './menu/garment-bundles/garment-bundles.component';
import { MatTabsModule } from '@angular/material/tabs'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'


import { RolesProfileRootComponent } from './masters/Roles and profiles/roles/roles-profile-root/roles-profile-root.component';
import { RolesComponent } from './masters/Roles and profiles/roles/roles.component';
import { ConfirmDeleteComponent } from '../alert-message/confirm-delete/confirm-delete.component';
import { AddRolesComponent } from './masters/Roles and profiles/roles/add-roles/add-roles.component';
import { EditRolesComponent } from './masters/Roles and profiles/roles/edit-roles/edit-roles.component';
import { ProfilesComponent } from './masters/Roles and profiles/profiles/profiles.component';
import { AddProfilesComponent } from './masters/Roles and profiles/profiles/add-profiles/add-profiles.component';
import { AddEmployeesComponent } from './masters/employees/add-employees/add-employees.component';
import { ViewEmployeesComponent } from './masters/employees/view-employees/view-employees.component';
import { EditEmployeesComponent } from './masters/employees/edit-employees/edit-employees.component';
import { ViewMoreComponent } from './masters/employees/view-more/view-more.component';
import { HttpClientModule } from '@angular/common/http';
import { EditProfileComponent } from './masters/Roles and profiles/profiles/edit-profile/edit-profile.component';
import { BundleEntry1Component } from './Transaction/Bundle Entry/bundle-entry-1/bundle-entry-1.component';
import { BundleEntry2Component } from './Transaction/Bundle Entry/bundle-entry-2/bundle-entry-2.component';
import { BundleEntry3Component } from './Transaction/Bundle Entry/bundle-entry-3/bundle-entry-3.component';
import { FabricRoll1Component } from './Transaction/Fabric Roll/fabric-roll-1/fabric-roll-1.component';
import { FabricRoll2Component } from './Transaction/Fabric Roll/fabric-roll-2/fabric-roll-2.component';
import { FabricRoll3Component } from './Transaction/Fabric Roll/fabric-roll-3/fabric-roll-3.component';
import { FabricRoll4Component } from './Transaction/Fabric Roll/fabric-roll-4/fabric-roll-4.component';
import { FabricRoll5Component } from './Transaction/Fabric Roll/fabric-roll-5/fabric-roll-5.component';
import { FabricRoll6Component } from './Transaction/Fabric Roll/fabric-roll-6/fabric-roll-6.component';
import { FabricRoll7Component } from './Transaction/Fabric Roll/fabric-roll-7/fabric-roll-7.component';


@NgModule({
  declarations: [
    MainComponent,
    WorkorderDataComponent,
    FabricRollDataComponent,
    GarmentBundlesComponent,
    RolesProfileRootComponent,
    ConfirmDeleteComponent,
    RolesComponent,
    AddRolesComponent,
    EditRolesComponent,
    ProfilesComponent,
    AddProfilesComponent,
    AddEmployeesComponent,
    ViewEmployeesComponent,
    ViewMoreComponent,
    EditEmployeesComponent,
    EditProfileComponent,
    BundleEntry1Component,
    BundleEntry2Component,
    BundleEntry3Component,
    FabricRoll1Component,
    FabricRoll2Component,
    FabricRoll3Component,
    FabricRoll4Component,
    FabricRoll5Component,
    FabricRoll6Component,
    FabricRoll7Component,
        
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    CdkAccordionModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ]
})
export class MainModule { }

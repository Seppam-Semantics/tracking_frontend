import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricRollDataComponent } from './menu/fabric-roll-data/fabric-roll-data.component';
import { WorkorderDataComponent } from './menu/workorder-data/workorder-data.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';
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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DyeDelEntryComponent } from './Transaction/dye-del-entry/dye-del-entry.component';
import { KnitDelEntryComponent } from './Transaction/knit-del-entry/knit-del-entry.component';


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
import { FabricRoll1Component } from './Transaction/Fabric Roll/fabric-roll-v1/fabric-roll-1.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FabricRollEntry2Component } from './Transaction/Fabric Roll/fabric-roll-entry-v2/fabric-roll-entry-2.component';
import { FabricRollData2Component } from './menu/fabric-roll-data2/fabric-roll-data2.component';
import { ReportEntryComponent } from './Transaction/knit-entry/report-entry.component';
import { KnitReportComponent } from './Report/knit-report/knit-report.component';
import { DatePipe } from '@angular/common';
import { FabricRollEntry3Component } from './Transaction/Fabric Roll/fabric-roll-entry-v3/fabric-roll-entry-3.component';
import { DyeBatchEntryComponent } from './Transaction/dye-batch-entry/dye-batch-entry.component';
import { DyeBatchReportComponent } from './Report/dye-batch-report/dye-batch-report.component';
import { YarnEntryComponent } from './Transaction/yarn-entry/yarn-entry.component';
import { YarnReportComponent } from './Report/yarn-report/yarn-report.component';
import { YarnHeaderComponent } from './Transaction/yarn-entry/yarn-header/yarn-header.component';
import { YarnTranscationComponent } from './Transaction/yarn-entry/yarn-transcation/yarn-transcation.component';
import { PanelModule } from 'primeng/panel';
import { KnitDeliveryComponent } from './Report/knit-delivery/knit-delivery.component';
import { DyeDeliveryComponent } from './Report/dye-delivery/dye-delivery.component';
import {MatMenuModule} from '@angular/material/menu';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { LCOutstandingComponent } from './Report/lc-outstanding/lc-outstanding.component';
import { KnitFactoryInventoryComponent } from './Report/knit-factory-inventory/knit-factory-inventory.component';
import { DyeFactoryInventoryComponent } from './Report/dye-factory-inventory/dye-factory-inventory.component';
import { YarnReconciliationComponent } from './Report/yarn-reconciliation/yarn-reconciliation.component';


@NgModule({
  declarations: [
    MainComponent,
    WorkorderDataComponent,
    FabricRollDataComponent,
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
    FabricRollEntry2Component,
    FabricRollData2Component,
    ReportEntryComponent,
    KnitReportComponent,
    FabricRollEntry3Component,
    DyeBatchEntryComponent,
    DyeBatchReportComponent,
    YarnEntryComponent,
    YarnReportComponent,
    YarnHeaderComponent,
    YarnTranscationComponent,
    DyeDelEntryComponent,
    KnitDelEntryComponent,
    KnitDeliveryComponent,
    DyeDeliveryComponent,
    LCOutstandingComponent,
    KnitFactoryInventoryComponent,
    DyeFactoryInventoryComponent,
    YarnReconciliationComponent,

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
    HttpClientModule,
    MatAutocompleteModule,
    NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
    MatProgressSpinnerModule,
    PanelModule,
    TableModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    SplitterModule,
    TabMenuModule,
    TabMenuModule,
    InputTextModule,
    MatMenuModule,
  ]
})
export class MainModule { }

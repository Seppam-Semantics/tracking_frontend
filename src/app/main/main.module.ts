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
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';

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
import { OrganizationSetupComponent } from './masters/organization-setup/organization-setup.component';
import {CardModule} from 'primeng/card';
import { FabricsTransferCutListReportComponent } from './Report/fabrics-transfer-cut-list-report/fabrics-transfer-cut-list-report.component';
import { FabricsTransferCuttingEntryComponent } from './Transaction/fabrics-transfer-cutting-entry/fabrics-transfer-cutting-entry.component';
import { KnitWorkOrderListingComponent } from './Report/knit-work-order-listing/knit-work-order-listing.component';
import { KnitWorkOrderCreationComponent } from './Transaction/knit-work-order-creation/knit-work-order-creation.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { DyeWorkOrderListingComponent } from './Report/dye-work-order-listing/dye-work-order-listing.component';
import { DyeWorkOrderCreationComponent } from './Transaction/dye-work-order-creation/dye-work-order-creation.component';
import { OCRComponent } from './Report/ocr/ocr.component';
import { DayKnitComponent } from './Report/day-knit/day-knit.component';
import { DayDyeComponent } from './Report/day-dye/day-dye.component';
import { DyeBatchComponent } from './Report/dye-batch/dye-batch.component';
import { TransactionMasteRootComponent } from './masters/Transaction Master/transaction-maste-root/transaction-maste-root.component';


// import { DxDataGridModule } from "devextreme-angular";

import { BuyerCreationComponent } from './masters/Transaction Master/buyer-creation/buyer-creation.component';
import { StyleCreationComponent } from './masters/Transaction Master/style-creation/style-creation.component';
import { ColorCreationComponent } from './masters/Transaction Master/color-creation/color-creation.component';
import { SizeCreationComponent } from './masters/Transaction Master/size-creation/size-creation.component';
import { FabricsdiaCreationComponent } from './masters/Transaction Master/fabricsdia-creation/fabricsdia-creation.component';
import { YarnTypeCreationComponent } from './masters/Transaction Master/yarn-type-creation/yarn-type-creation.component';
import { FabricsTypeCreationComponent } from './masters/Transaction Master/fabrics-type-creation/fabrics-type-creation.component';
import { DyeTypeCreationComponent } from './masters/Transaction Master/dye-type-creation/dye-type-creation.component';
import { RejTypeCreationComponent } from './masters/Transaction Master/rej-type-creation/rej-type-creation.component';
import { SpinFtyCreationComponent } from './masters/Transaction Master/spin-fty-creation/spin-fty-creation.component';
import { DyeFtyCreationComponent } from './masters/Transaction Master/dye-fty-creation/dye-fty-creation.component';
import { KnitFtyCreationComponent } from './masters/Transaction Master/knit-fty-creation/knit-fty-creation.component';
import { POMasterCreationComponent } from './masters/po-master-creation/po-master-creation.component';
import { MultiSelectModule } from 'primeng/multiselect';
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
    OrganizationSetupComponent,
    FabricsTransferCutListReportComponent,
    FabricsTransferCuttingEntryComponent,
    KnitWorkOrderListingComponent,
    KnitWorkOrderCreationComponent,
    DyeWorkOrderListingComponent,
    DyeWorkOrderCreationComponent,
    OCRComponent,
    DayKnitComponent,
    DayDyeComponent,
    DyeBatchComponent,
    TransactionMasteRootComponent,
    BuyerCreationComponent,
    StyleCreationComponent,
    ColorCreationComponent,
    SizeCreationComponent,
    FabricsdiaCreationComponent,
    YarnTypeCreationComponent,
    FabricsTypeCreationComponent,
    DyeTypeCreationComponent,
    RejTypeCreationComponent,
    SpinFtyCreationComponent,
    DyeFtyCreationComponent,
    KnitFtyCreationComponent,
    POMasterCreationComponent,

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
    CardModule,
    FloatLabelModule,
    CalendarModule,
    FieldsetModule,
    InputNumberModule,
    MultiSelectModule,

    // DxDataGridModule
  ]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FabricRollDataComponent } from './menu/fabric-roll-data/fabric-roll-data.component';
import { WorkorderDataComponent } from './menu/workorder-data/workorder-data.component';
import { RolesProfileRootComponent } from './masters/Roles and profiles/roles/roles-profile-root/roles-profile-root.component';
import { ProfilesComponent } from './masters/Roles and profiles/profiles/profiles.component';
import { AddProfilesComponent } from './masters/Roles and profiles/profiles/add-profiles/add-profiles.component';
import { AppComponent } from '../app.component';
import { ViewEmployeesComponent } from './masters/employees/view-employees/view-employees.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { EditProfileComponent } from './masters/Roles and profiles/profiles/edit-profile/edit-profile.component';


import { BundleEntry1Component } from './Transaction/Bundle Entry/bundle-entry-1/bundle-entry-1.component';
import { BundleEntry2Component } from './Transaction/Bundle Entry/bundle-entry-2/bundle-entry-2.component';
import { BundleEntry3Component } from './Transaction/Bundle Entry/bundle-entry-3/bundle-entry-3.component';
import { FabricRollData2Component } from './menu/fabric-roll-data2/fabric-roll-data2.component';
import { ReportEntryComponent } from './Transaction/knit-entry/report-entry.component';
import { KnitReportComponent } from './Report/knit-report/knit-report.component';
import { FabricRollEntry3Component } from './Transaction/Fabric Roll/fabric-roll-entry-v3/fabric-roll-entry-3.component';
import { DyeBatchEntryComponent } from './Transaction/dye-batch-entry/dye-batch-entry.component';
import { DyeBatchReportComponent } from './Report/dye-batch-report/dye-batch-report.component';
import { YarnEntryComponent } from './Transaction/yarn-entry/yarn-entry.component';
import { YarnReportComponent } from './Report/yarn-report/yarn-report.component';
import { YarnHeaderComponent } from './Transaction/yarn-entry/yarn-header/yarn-header.component';
import { YarnTranscationComponent } from './Transaction/yarn-entry/yarn-transcation/yarn-transcation.component';
import { DyeDeliveryComponent } from './Report/dye-delivery/dye-delivery.component';
import { KnitDeliveryComponent } from './Report/knit-delivery/knit-delivery.component';
import { DyeDelEntryComponent } from './Transaction/dye-del-entry/dye-del-entry.component';
import { KnitDelEntryComponent } from './Transaction/knit-del-entry/knit-del-entry.component';
import { LCOutstandingComponent } from './Report/lc-outstanding/lc-outstanding.component';
import { KnitFactoryInventoryComponent } from './Report/knit-factory-inventory/knit-factory-inventory.component';
import { DyeFactoryInventoryComponent } from './Report/dye-factory-inventory/dye-factory-inventory.component';
import { YarnReconciliationComponent } from './Report/yarn-reconciliation/yarn-reconciliation.component';
import { OrganizationSetupComponent } from './masters/organization-setup/organization-setup.component';
import { FabricsTransferCutListReportComponent } from './Report/fabrics-transfer-cut-list-report/fabrics-transfer-cut-list-report.component';
import { FabricsTransferCuttingEntryComponent } from './Transaction/fabrics-transfer-cutting-entry/fabrics-transfer-cutting-entry.component';
import { KnitWorkOrderListingComponent } from './Report/knit-work-order-listing/knit-work-order-listing.component';
import { KnitWorkOrderCreationComponent } from './Transaction/knit-work-order-creation/knit-work-order-creation.component';
import { DyeWorkOrderListingComponent } from './Report/dye-work-order-listing/dye-work-order-listing.component';
import { DyeWorkOrderCreationComponent } from './Transaction/dye-work-order-creation/dye-work-order-creation.component';
import { OCRComponent } from './Report/ocr/ocr.component';
import { DayKnitComponent } from './Report/day-knit/day-knit.component';
import { DayDyeComponent } from './Report/day-dye/day-dye.component';
import { DyeBatchComponent } from './Report/dye-batch/dye-batch.component';
import { TransactionMasteRootComponent } from './masters/Transaction Master/transaction-maste-root/transaction-maste-root.component';


const routes: Routes = [
  {path:'', component: AppComponent},
  

  { path: 'FabricRollData', component: FabricRollData2Component},
  { path: 'WorkorderData', component: WorkorderDataComponent },

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
  {path:"Knit-Report" , component:KnitReportComponent},
  {path:"DyeBatchEntry" , component:DyeBatchEntryComponent},
  {path:"Dye-Report" , component:DyeBatchReportComponent},
  {path:"yarn-Entry" , component:YarnEntryComponent},
  {path:"Yarn-Report" , component:YarnReportComponent},
  {path:"yarn-header", component:YarnHeaderComponent},
  {path:"yarn-transcation", component:YarnTranscationComponent},
  {path:"dye-delivery" , component:DyeDeliveryComponent},
  {path:"knit-delivery" , component:KnitDeliveryComponent},
  {path:"Dye-DelEntry" , component:DyeDelEntryComponent},
  {path:"Knit-DelEntry" , component:KnitDelEntryComponent},
  {path:"lc-outstanding" , component:LCOutstandingComponent},
  {path:"knit-factory-inventory" ,component:KnitFactoryInventoryComponent},
  {path:"dye-factory-inventory" , component:DyeFactoryInventoryComponent},
  {path:"yarn-reconciliation" , component:YarnReconciliationComponent},
  {path:"Organization-Setup" , component:OrganizationSetupComponent},
  {path:"FabricsTransferCutListReport" , component:FabricsTransferCutListReportComponent},
  {path:"FabricsTransferCuttingEntry" , component:FabricsTransferCuttingEntryComponent},
  {path:"KnitWorkOrderListing" , component : KnitWorkOrderListingComponent} , 
  {path:"KnitWorkOrderCreation" , component : KnitWorkOrderCreationComponent} , 
  {path:"DyeWorkOrderListing" , component : DyeWorkOrderListingComponent} , 
  {path:"DyeWorkOrderCreation" , component : DyeWorkOrderCreationComponent},
  {path:"OCR" , component : OCRComponent},
  {path:"Day-Knit" , component : DayKnitComponent} ,
  {path:"Day-Dye" , component : DayDyeComponent} ,
  {path:"DyeBatch" , component : DyeBatchComponent} , 
  {path:"TransactionMaster" , component : TransactionMasteRootComponent} ,


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

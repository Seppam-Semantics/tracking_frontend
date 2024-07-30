import { AbstractType, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // apiUrl = "https://tracker.seppam.com";
  apiUrl = "http://localhost:2000";

  token: any;
  profilenames: any;
  rolenames: any;


  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    }),
  }

  public getHeaders() {
    let httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      }),
    }
    return httpOptions;
  }

  public getUrl(): String {
    let url: String = environment.URL;
    return url;
  }
  // ========================================================================================================================================================

  getorg() {
    return this.http.get(this.getUrl() + `/auth/organization`, this.getHeaders())
  }

  login(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/auth/authentication`, data)
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/profileapi/profile/${id}`, this.getHeaders())
  }

  getroles(): Observable<any> {
    return this.http.get(this.getUrl() + `/roleapi/roles`, this.getHeaders())
  }

  getSingleRoles(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/roleapi/roles/${id}`, this.getHeaders())
  }


  // =============================  WorkOrder and Fabric roll data and Transcation =========================================================================================================


  Workorderdelect(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/workorderapi/workorder/${id}`, this.getHeaders())
  }

  getworkorderdetails(): Observable<any> {
    return this.http.get(this.getUrl() + `/workorderapi/workorders-filter`, this.getHeaders())
  }

  postworkorder(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/workorderapi/workorder`, data, this.getHeaders())
  }

  getfabricdetails(id: any, entry: any): Observable<any> {
    return this.http.get(this.getUrl() + `/fabricrollapi/fabric-entrys?id=${id}&entry=${entry}&buyer=&orderNo=&style=&color=&size=`, this.getHeaders());
  }

  postfabricdetails(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/fabricrollapi/fabric-entrys`, data, this.getHeaders())
  }

  getbuyers(): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/buyers`, this.getHeaders())
  }

  getorders(buyer: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/buyers-orders?buyer=${buyer}&`, this.getHeaders())
  }

  getstyle(buyer: any, order: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/orders-styles?buyer=${buyer}&orderNo=${order}&`, this.getHeaders())
  }

  getcolor(buyer: any, order: any, style: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/styles-colors?buyer=${buyer}&orderNo=${order}&style=${style}&`, this.getHeaders())
  }

  getsize(buyer: any, order: any, style: any, color: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/colors-sizes?buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
  }

  getwodetails(buyer: any, orderNo?: any, style?: any, color?: any, size?: any): Observable<any> {
    return this.http.get(this.getUrl() + `/workorderapi/workorders-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
  }

  getmachineDiadetails(style: string='', size: string=''): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/machineDia?style=${style}&size=${size}&`, this.getHeaders())
  }

  getallmachineDiadetails(style: string='', size: string=''): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/allmachineDia`, this.getHeaders())
  }

  knitworkorderdyeworkorderdetails(buyer: any, orderNo?: any, style?: any, color?: any, size?: any): Observable<any> {
    return this.http.get(this.getUrl() + `/workorderapi/knitworkorderdyeworkorder-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
  }

  getknitproductionfilterdetails(buyer: any, orderNo?: any, style?: any, color?: any, size?: any): Observable<any> {
    return this.http.get(this.getUrl() + `/workorderapi/knitproduction-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
  }


  getknitproductiondetails(buyer: any, orderNo?: any, style?: any, color?: any, size?: any): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knitwo-details?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
  }



  getKnitrateIddetails(buyer: any, orderNo?: any, style?: any, color?: any, size?: any): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/KnitrateId-details?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
  }

  getwolinedetails(orderNo: any, style?: any, color?: any, size?: any): Observable<any> {
    return this.http.get(this.getUrl() + `/workorderapi/workorders-details-filter?orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
  }

  // getknitwodetails(buyer: any, orderNo?: any, style?: any, color?: any, size?: any): Observable<any> {
  //   return this.http.get(this.getUrl() + `/workorderapi/workorders-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}`, this.getHeaders())
  // }


  getbuyersData(): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/buyers_data`, this.getHeaders())
  }

  getordersData(buyer: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/buyers-orders_data?buyer=${buyer}&`, this.getHeaders())
  }

  getstyleData(order: string): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/orders-styles_data?orderNo=${order}&`, this.getHeaders())
  }

  getcolorData(buyer: string, order: string, style: string): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/styles-colors_data?buyer=${buyer}&orderNo=${order}&style=${style}&`, this.getHeaders())
  }

  getsizeData(buyer: string, order: string, style: string, color: string): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/colors-sizes_data?buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
  }

  getcodeData(factory: any, buyer: any, order: any, style: any, color: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/DyecodeFilter?dyeFactory=${factory}&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
  }

  postsinglewodetails(data: any): Observable<any> {
    return this.http.put(this.getUrl() + `/workorderapi/workorder`, data, this.getHeaders())
  }
  getsinglewodetails(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/fabricrollapi/transcation-entrys?id=${id}`, this.getHeaders())
  }

  Fabricroll1entry(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/fabricrollapi/transcation-entry1`, data, this.getHeaders())
  }
  Fabricroll2entry(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/fabricrollapi/transcation-entry2`, data, this.getHeaders())
  }
  Fabricroll3entry(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/fabricrollapi/transcation-entry3`, data, this.getHeaders())
  }
  Fabricroll4entry(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/fabricrollapi/transcation-entry4`, data, this.getHeaders())
  }
  Fabricroll5entry(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/fabricrollapi/transcation-entry5`, data, this.getHeaders())
  }
  Fabricroll6entry(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/fabricrollapi/transcation-entry6`, data, this.getHeaders())
  }
  Fabricroll7entry(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/fabricrollapi/transcation-entry7`, data, this.getHeaders())
  }

  getsingleFabricroll(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/fabricrollapi/transcation-entrys?id=${id}`, this.getHeaders())
  }

  entry1Delete(id: any, lineId: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry1?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry2Delete(id: any, lineId: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry2?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry3Delete(id: any, lineId: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry3?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry4Delete(id: any, lineId: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry4?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry5Delete(id: any, lineId: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry5?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry6Delete(id: any, lineId: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry6?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry7Delete(id: any, lineId: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry7?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }


  // ============================================== knit  ====================================================================================================

  knitDate(): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knit-date`, this.getHeaders())
  }

  knit_entry(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/knitapi/knit`, data, this.getHeaders())
  }
  knitfty_name(): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knit-factory`, this.getHeaders())
  }
  knitfty_order(): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/order-filter`, this.getHeaders())
  }
  woknitfty_name(): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/Woknit-factory`, this.getHeaders())
  }


  ftydetailsFilter( Order: string = '' , status: string = '' ,color:string=''): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knit-filter?id=&order=${Order}&status=${status}&color=${color}&`, this.getHeaders())
  }

  knit_Total_filter( Order: string = '' , status: string = '' , color:string=''): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knit_Total_filter?id=&order=${Order}&status=${status}&color=${color}&`, this.getHeaders())
  }
  
  knit_color_list( ): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knit_color_list`, this.getHeaders())
  }

  knitDetailsFilter(buyer: any, orderNo: any, style: any, color: any, size: any): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knit-filter?id=&factory=&date=&buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
  }
  getallfty_details(): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knit`, this.getHeaders())
  }
  getsingleknit_details(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knit/${id}`, this.getHeaders())
  }

  deleteKnitDetails(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/knitapi/knit/${id}`, this.getHeaders())
  }
  updateKnitEntry(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/knitapi/knit`, data, this.getHeaders())
  }

  knitauth(factory: any, buyer: any, orderNo: any, style: any, color: any, size: any): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knitauth?factory=${factory}&buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
  }


  // =========================================== dye ==========================================================================================================
  post_dyereport_entry(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/dyeapi/dye`, data, this.getHeaders())
  }

  dye_factory_name(): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/dye-factory`, this.getHeaders())
  }

  dye_fabrictype_dropdown(): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/dye-fabrictype`, this.getHeaders())
  }

  dyeBatchAllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/dye`, this.getHeaders())
  }

  dye_batch_single_data(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/dye/${id}`, this.getHeaders())
  }

  DyeBatchDelect(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/dyeapi/dye/${id}`, this.getHeaders())
  }

  // <!---------------------------------------->
  DyeFactoryfilter(): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/DyeFactoryFilter`, this.getHeaders())
  }


  DyeBuyerfilter(dyeFactory: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/DyeBuyerFilter?dyeFactory=${dyeFactory}&`, this.getHeaders())
  }


  DyeOrderNofilter(dyeFactory: any, buyer: any,): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/DyeOrderNoFilter?dyeFactory=${dyeFactory}&buyer=${buyer}&`, this.getHeaders())
  }

  DyeStylefilter(dyeFactory: any, buyer: any, order: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/DyeStyleFilter?dyeFactory=${dyeFactory}&buyer=${buyer}&orderNo=${order}&`, this.getHeaders())
  }

  DyeColorfilter(dyeFactory: any, buyer: any, order: any, style: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/DyeColorFilter?dyeFactory=${dyeFactory}&buyer=${buyer}&orderNo=${order}&style=${style}&`, this.getHeaders())
  }

  DyeCodefilter(dyeFactory: any, buyer: any, order: any, style: any, color: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/DyecodeFilter?dyeFactory=${dyeFactory}&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
  }

  DyeFilter(DyeFactory: any, buyer?: any, orderNo?: any, style?: any, color?: any, batchNo?: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/dye-filter?dyeFactory=${DyeFactory}&buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&batchNo=${batchNo}&`, this.getHeaders())
  }
  // <!----------------->






  addUpdateYarn(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/yarnapi/yarn`, data, this.getHeaders())
  }

  addUpdateYarnCheck(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/yarnapi/yarn_lot_check`, data, this.getHeaders())
  }

  addUpdateOrderAllocation(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/yarnapi/yarn_order_allocations`, data, this.getHeaders())
  }

  addUpdateYarnreceipt(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/yarnapi/yarn_receipts_lines`, data, this.getHeaders())
  }

  addUpdateYarnQuality(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/yarnapi/yarn_quality_check`, data, this.getHeaders())
  }

  getAllYarn(): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn`, this.getHeaders())
  }

  yarnSpinner(): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn-spinner`, this.getHeaders())
  }

  yarnLcNo(spinner: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn-lcNo?spinner=${spinner}`, this.getHeaders())
  }

  yarnLcValue(): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn-lcValue`, this.getHeaders())
  }

  yarnStatus(): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn-status`, this.getHeaders())
  }

  yarnSomeStatus(spinner: any, lcNo: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn-some-status?spinner=${spinner}&lcNo=${lcNo}`, this.getHeaders())
  }

  yarnPi(): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn-status`, this.getHeaders())
  }

  yarnType(): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn_type`, this.getHeaders())
  }

  yarnFilter(spinner: any = '', lcNo: any = '', lcValue: any = '', yarnStatus: any = '', pi: any = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn-filter?id=&spinner=${spinner}&lcNo=${lcNo}&lcValue=${lcValue}&yarnStatus=${yarnStatus}&pi=${pi}&`, this.getHeaders())
  }

  receiptDetailsForQc(id: any, receiptId: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarnReceiptForQC?id=${id}&receiptId=${receiptId}`, this.getHeaders())
  }

  lcDetailsForlot(id: any, lineId: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarnlclineForLot?id=${id}&lineId=${lineId}`, this.getHeaders())
  }

  lcDetailsForOrder(id: any, lineId: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarnlclineForOrder?id=${id}&lineId=${lineId}`, this.getHeaders())
  }

  lcDetailsForReceipt(id: any, lineId: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarnlclineForReceipt?id=${id}&lineId=${lineId}`, this.getHeaders())
  }

  getSingleYarnData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn/${id}`, this.getHeaders())
  }
  //-------------------------------------------------------------------

  getSingleLcClosure(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarnreport/${id}`, this.getHeaders())
  }

  //-------------------------------------------------------------------

  gettingYarnType(spinner: any, lcNo: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn-filter?id=&spinner=${spinner}&lcNo=${lcNo}&lcValue=&yarnStatus=&pi=`, this.getHeaders())
  }

  getallSpinfty(): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/spinfty`, this.getHeaders())
  }

  getSpinOrder(spinner: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/spinfty-orders_data?spin=${spinner}`, this.getHeaders())
  }


  yarnTotal(id: any, type: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn_total?id=${id}&yarnType=${type}`, this.getHeaders())
  }

  yarnLineData(id: any, lineId: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn_line_data?id=${id}&lineId=${lineId}`, this.getHeaders())
  }

  deleteYarn(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/yarnapi/yarn/${id}`, this.getHeaders())
  }




  YarnEntryDelete(id: any, lineId: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/yarnapi/yarnEntryDelete?id=${id}&line=${lineId}`, this.getHeaders())
  }

  lotCheckDetailsDelete(id: any, lineId: any, lotCheckid: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/yarnapi/lotCheckDelete?id=${id}&line=${lineId}&lotCheckid=${lotCheckid}`, this.getHeaders())
  }

  OrderAllocationDeleteDetails(id: any, lineId: any, orderid: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/yarnapi/orderDelete?id=${id}&line=${lineId}&orderid=${orderid}`, this.getHeaders())
  }
  ReceiptdetailsDelete(id: any, lineId: any, ReceiptId: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/yarnapi/ReceiptDelete?id=${id}&line=${lineId}&ReceiptId=${ReceiptId}`, this.getHeaders())
  }
  YarnQCDeleteDetails(id: any, lineId: any, ReceipDataId: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/yarnapi/YarnQCDelete?id=${id}&line=${lineId}&YarnQCid=${ReceipDataId}`, this.getHeaders())
  }


  // ============================================= Knit Delivery ===================================================================================


  getKnitDelivery(): Observable<any> {
    return this.http.get(this.getUrl() + `/knittodye/knit-delivery`, this.getHeaders())
  }

  getSingleKnitDel(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/knittodye/knit-delivery/${id}`, this.getHeaders())
  }

  addUpdateKnitDelivery(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/knittodye/knit-delivery`, data, this.getHeaders())
  }

  deleteKnitDelivery(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/knittodye/knit-delivery/${id}`, this.getHeaders())
  }


// =============================================== Knit Machine Allocation =======================================================================

getAllocation(orderNo : string = ''):Observable<any>{
  return this.http.get(this.getUrl() + `/knitapi/machine-allocation-entry?orderNo=${orderNo}&`, this.getHeaders())
}

getSingleAllocation(id:string = '', knitFty:String = '', machineDia:String = ''):Observable<any>{
  return this.http.get(this.getUrl() + `/knitapi/machine-allocation-entry-filter?id=${id}&knitFty=${knitFty}&machineDia=${machineDia}`, this.getHeaders())
}

postAllocation(data:any):Observable<any>{
  return this.http.post(this.getUrl() + `/knitapi/machine-allocation-entry`, data, this.getHeaders())
}

getProductionDays(knitFty:string = '', machineDia : string = ''):Observable<any>{
  return this.http.get(this.getUrl() + `/knitapi/productionDays?knitFty=${knitFty}&machineDia=${machineDia}`, this.getHeaders())
}

getStartDate(knitFty:string = '', machineDia : string = ''):Observable<any>{
  return this.http.get(this.getUrl() + `/knitapi/startDate?knitFty=${knitFty}&machineDia=${machineDia}`, this.getHeaders())
}

  updateAllocation(data:any):Observable<any>{
    return this.http.put(this.getUrl() + `/knitapi/machine-allocation-update`, data,this.getHeaders())
  }

  knitfactoryforentry(machineDia : any):Observable<any>{
    return this.http.get(this.getUrl() + `/knitapi/machineDiatoKnitFactory?machineDia=${machineDia}`,this.getHeaders())
  }
  // ============================================= Dye Delivery ===================================================================================

  addUpdateDyeDelivery(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/dyedeliveryapi/dye-delivery`, data, this.getHeaders())
  }

  getDyeDelivery(): Observable<any> {
    return this.http.get(this.getUrl() + `/dyedeliveryapi/dye-delivery`, this.getHeaders())
  }
  getSingleDyeDel(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyedeliveryapi/dye-delivery/${id}`, this.getHeaders())
  }
  deleteDyeDelivery(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/dyedeliveryapi/dye-delivery/${id}`, this.getHeaders())
  }



  LCOutstandingData(lcno: string = '' , status:string = '' , buyer:string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/LC-Outstanding?lcno=${lcno}&status=${status}&buyer=${buyer}&`, this.getHeaders())
  }
  
  
  LCOutstandingTotalData(lcno: string = '' , status:string = '' , buyer:string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/LCOutstandingTotal?lcno=${lcno}&status=${status}&buyer=${buyer}&`, this.getHeaders())
  }
  
  BuyerListData(): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/Buyer-List`, this.getHeaders())
  }

  lcNoListData(): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/lcNo-List`, this.getHeaders())
  }

  StatusListData(): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/Status-List`, this.getHeaders())
  }

  KFInventoryData(date: any): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/KF-Inventory?date=${date}`, this.getHeaders())
  }

  DFInventoryData(date: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/DF-Inventory?date=${date}`, this.getHeaders())
  }

  YarnReconciliation(date1: any, date2: any): Observable<any> {
    return this.http.get(this.getUrl() + `/yarnapi/yarn_reconciliation?date1=${date1}&date2=${date2}`, this.getHeaders())
  }


  FabricsTransferData(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/fabricrollapi/fabrictransfer`, data, this.getHeaders())
  }

  FabricsTransferAllData(buyer: string = '', order: string = '', fromDate: string = '', toDate: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/fabricrollapi/allFabEntrys?Buyer=${buyer}&Order=${order}&fromDate=${fromDate}&toDate=${toDate}&`, this.getHeaders())
  }


  FabricsTransfersingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/fabricrollapi/singleFabEntrys/${id}`, this.getHeaders())
  }
  deleteFabricsTransfer(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/fabricrollapi/FabEntrysDelete/${id}`, this.getHeaders())
  }


  KnitWorkOrderData(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/knitapi/knitworkorder`, data, this.getHeaders())
  }

  KnitWorkOrderAllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knitworkorder`, this.getHeaders())
  }

  KnitWorkOrderSingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knitworkorder/${id}`, this.getHeaders())
  }

  deleteKnitWorkOrder(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/knitapi/knitworkorder/${id}`, this.getHeaders())
  }

  DyeWorkOrderData(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/dyeapi/dyeworkorder`, data, this.getHeaders())
  }

  DyeWorkOrderAllData(buyer:string='' , order:string=''): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/dyeworkorder?buyer=${buyer}&order=${order}&`, this.getHeaders())
  }
  DyeWorkOrderTotalData(buyer:string='' , order:string=''): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/dyeworkorderTotal?buyer=${buyer}&order=${order}&`, this.getHeaders())
  }

  DyeWorkOrderSingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/dyeworkorder/${id}`, this.getHeaders())
  }
  deleteDyeWorkOrder(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/dyeapi/dyeworkorder/${id}`, this.getHeaders())
  }



  DayKnit(date1:string='' ,date2:string='' , order: string = '' , status: string = '' ): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/Dayknitfilter?date1=${date1}&date2=${date2}&order=${order}&status=${status}&`, this.getHeaders())
  }


  DayDye(date: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/Day-Dye?date=${date}`, this.getHeaders())
  }

  DyeBatch(date1: any, date2: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/DyeBatch?date1=${date1}&date2=${date2}`, this.getHeaders())
  }



  getknitwofty(): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/wofty`, this.getHeaders())
  }


  getknitwobuyers(knitfty: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/wobuyer?knitfty=${knitfty}`, this.getHeaders())
  }


  getknitwoorders(knitfty: any, buyer: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/woorderNo?knitfty=${knitfty}&buyer=${buyer}&`, this.getHeaders())
  }

  getknitwostyle(knitfty: any, buyer: any, order: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/wostyle?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}&`, this.getHeaders())
  }

  getknitwocolor(knitfty: any, buyer: any, order: any, style: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/wocolor?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}&style=${style}&`, this.getHeaders())
  }

  getknitwosize(knitfty: any, buyer: any, order: any, style: any, color: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/wosize?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
  }





  getknit_Ety_wofty(): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/knitentry_wofty`, this.getHeaders())
  }


  getknit_Ety_wobuyers(knitfty: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/knitentry_wobuyer?knitfty=${knitfty}`, this.getHeaders())
  }


  getknit_Ety_woorders(knitfty: any, buyer: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/knitentry_woorderNo?knitfty=${knitfty}&buyer=${buyer}&`, this.getHeaders())
  }

  getknit_Ety_wostyle(knitfty: any, buyer: any, order: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/knitentry_wostyle?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}&`, this.getHeaders())
  }

  getknit_Ety_wocolor(knitfty: any, buyer: any, order: any, style: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/knitentry_wocolor?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}&style=${style}&`, this.getHeaders())
  }

  getknit_Ety_wosize(knitfty: any, buyer: any, order: any, style: any, color: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/knitentry_wosize?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
  }







  getdyewofty(): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/dyewofty`, this.getHeaders())
  }

  getdyewobuyers(dyefty: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/dyewobuyer?dyefty=${dyefty}&`, this.getHeaders())
  }

  getdyewoorders(dyefty: any, buyer: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/dyewoorderNo?dyefty=${dyefty}&buyer=${buyer}&`, this.getHeaders())
  }

  getdyewostyle(dyefty: any, buyer: any, order: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/dyewostyle?dyefty=${dyefty}&buyer=${buyer}&orderNo=${order}&`, this.getHeaders())
  }

  getdyewocolor(dyefty: any, buyer: any, order: any, style: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/dyewocolor?dyefty=${dyefty}&buyer=${buyer}&orderNo=${order}&style=${style}&`, this.getHeaders())
  }

  getdyewosize(dyefty: any, buyer: any, order: any, style: any, color: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/dyewosize?dyefty=${dyefty}&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
  }

  // ========================================================== buyer Master ======================================================

  Drop_Buyer_master(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/drop-buyer-Master`, this.getHeaders())
  }
  BuyerId(buyer: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/drop-buyerId-Master?buyer='${buyer}'`, this.getHeaders())
  }

  Buyer_master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/buyer-master`, data, this.getHeaders())
  }

  Buyer_master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/buyer-master`, this.getHeaders())
  }

  Buyer_master_Fillter_Data(buyer: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/buyer-master-filter?buyer=${buyer}`, this.getHeaders())
  }

  Buyer_master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/buyer-master/${id}`, this.getHeaders())
  }
  delete_Buyer_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/buyer-master/${id}`, this.getHeaders())
  }

  // ================================ product Master (Style) ======================================================================


  Drop_Style_master(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/drop-style-Master`, this.getHeaders())
  }

  StyleId(style: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/drop-styleId-Master?style='${style}'`, this.getHeaders())
  }

  style_master_Fillter_Data(style: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/style-master-filter?style=${style}`, this.getHeaders())
  }

  style_master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/style-master`, data, this.getHeaders())
  }

  style_master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/style-master`, this.getHeaders())
  }

  style_master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/style-master/${id}`, this.getHeaders())
  }
  delete_style_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/style-master/${id}`, this.getHeaders())
  }

  // ========================== Color master =====================================================================================
  Drop_Color_master(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/drop-color-Master`, this.getHeaders())
  }

  ColorId(color: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/drop-colorId-Master?color=${color}&`, this.getHeaders())
  }
  Color_master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/color-master`, data, this.getHeaders())
  }

  Color_master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/color-master`, this.getHeaders())
  }

  Color_master_Fillter_Data(color: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/color-master-filter?color=${color}&`, this.getHeaders())
  }

  Color_master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/color-master/${id}`, this.getHeaders())
  }
  delete_Color_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/color-master/${id}`, this.getHeaders())
  }

  // =========================== Size Master =====================================================================================

  Drop_Size_master(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/drop-size-Master`, this.getHeaders())
  }

  SizeId(size: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/drop-sizeId-Master?size='${size}'`, this.getHeaders())
  }
  size_master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/size-master`, data, this.getHeaders())
  }

  size_master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/size-master`, this.getHeaders())
  }

  size_master_Fillter_Data(size: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/size-master-filter?size=${size}`, this.getHeaders())
  }

  size_master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/size-master/${id}`, this.getHeaders())
  }
  delete_size_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/size-master/${id}`, this.getHeaders())
  }

  // ========================== Yarn Type ========================================================================================
  
  yarnTypeId(yarnType: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/drop-yarnTypeId-Master?yarnType='${yarnType}'`, this.getHeaders())
  }

  yarnType_master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/yarn-type-master`, data, this.getHeaders())
  }

  yarnType_master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/yarn-type-master`, this.getHeaders())
  }

  yarnType_master_Fillter_Data(yarnType: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/yarn-type-master-filter?yarnType=${yarnType}`, this.getHeaders())
  }

  yarnType_master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/yarn-type/${id}`, this.getHeaders())
  }
  delete_yarnType_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/yarn-type-master/${id}`, this.getHeaders())
  }

  // =================================== Fabric Type =============================================================================

  fabrictypeId(FabricType: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/drop-fabricstypeId-Master?fabricType='${FabricType}'`, this.getHeaders())
  }

  fabrictype_master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/fabric-type-master`, data, this.getHeaders())
  }

  fabrictype_master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/fabric-type-master`, this.getHeaders())
  }

  fabrictype_master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/fabric-type/${id}`, this.getHeaders())
  }

  fabrictype_master_Fillter_Data(fabrictype: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/fabric-type-master-filter?fabType=${fabrictype}`, this.getHeaders())
  }

  delete_fabrictype_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/fabric-type-master/${id}`, this.getHeaders())
  }
  // =================================== fsize =============================================================================
  fsize_master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/fsize-master`, data, this.getHeaders())
  }

  fsize_master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/fsize-master`, this.getHeaders())
  }

  fsize_master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/fsize/${id}`, this.getHeaders())
  }
  delete_fsize_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/fsize-master/${id}`, this.getHeaders())
  }

  fsize_master_filter(size:any):Observable<any>{
    return this.http.get(this.getUrl() + `/mastersapi/fsize-master-filter?size=${size}&`, this.getHeaders())
  }
  // =================================== dyetype=============================================================================

  DyeTypeId(dyetype: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/drop-dyetypeId-Master?DyeType='${dyetype}'`, this.getHeaders())
  }


  dyetype_master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/dye-type-master`, data, this.getHeaders())
  }

  dyetype_master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/dye-type-master`, this.getHeaders())
  }

  dyetype_master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/dye-type/${id}`, this.getHeaders())
  }

  dyetype_master_Fillter_Data(dyetype: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/dye-type-master-filter?dyeType=${dyetype}`, this.getHeaders())
  }

  delete_dyetype_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/dye-type-master/${id}`, this.getHeaders())
  }

  // =================================== KnitFty=============================================================================


  KnitFty_Master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/knitFty-master`, data, this.getHeaders())
  }

  KnitFty_Master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/knitFty-master`, this.getHeaders())
  }

  KnitFty_Master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/knitFty-master/${id}`, this.getHeaders())
  }

  KnitFty_master_Fillter_Data(KnitFty: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/knitFty-master-filter?knitFty=${KnitFty}`, this.getHeaders())
  }

  delete_KnitFty_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/knitFty-master/${id}`, this.getHeaders())
  }

  // =================================== dyeFty=============================================================================


  dyeFty_Master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/dyeFty-master`, data, this.getHeaders())
  }

  dyeFty_Master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/dyeFty-master`, this.getHeaders())
  }

  dyeFty_master_Fillter_Data(dyeFty: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/dyeFty-master-filter?dyeFty=${dyeFty}`, this.getHeaders())
  }

  dyeFty_Master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/dyeFty-master/${id}`, this.getHeaders())
  }
  delete_dyeFty_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/dyeFty-master/${id}`, this.getHeaders())
  }

  // =================================== spinerFty=============================================================================
  spinFty_Master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/spinFty-master`, data, this.getHeaders())
  }

  spinFty_Master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/spinFty-master`, this.getHeaders())
  }

  spinFty_Master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/spinFty-master/${id}`, this.getHeaders())
  }

  spinFty_master_Fillter_Data(spinFty: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/spinFty-master-filter?spinFty=${spinFty}`, this.getHeaders())
  }

  delete_spinFty_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/spinFty-master/${id}`, this.getHeaders())
  }

  // =================================== PO Master=============================================================================
  PO_Master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/po-master`, data, this.getHeaders())
  }

  PO_Master_line(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/po-master_line`, data, this.getHeaders())
  }

  PO_Master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/po-master`, this.getHeaders())
  }

  PO_Master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/po-master/${id}`, this.getHeaders())
  }

  get_PO_Master_line(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/po-master-line/${id}`, this.getHeaders())
  }

  delete_PO_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/po-master/${id}`, this.getHeaders())
  }

  delete_line_PO_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/po-master-line/${id}`, this.getHeaders())
  }

  PO_Master_filter(order:any):Observable<any>{
   return this.http.get(this.getUrl() + `/mastersapi/po-master-filter?orderNo=${order}`, this.getHeaders())
  }
  // =================================== Rej Type Master=============================================================================

  rejtype_Master(data: any): Observable<any> {
    return this.http.post(this.getUrl() + `/mastersapi/rejType-master`, data, this.getHeaders())
  }

  rejtype_Master_AllData(): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/rejType-master`, this.getHeaders())
  }

  rejtype_Master_SingleData(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/rejType-master/${id}`, this.getHeaders())
  }

  rejtype_master_Fillter_Data(rejtype: string = ''): Observable<any> {
    return this.http.get(this.getUrl() + `/mastersapi/rejType-master-filter?rejName=${rejtype}`, this.getHeaders())
  }

  delete_rejtype_master(id: any): Observable<any> {
    return this.http.delete(this.getUrl() + `/mastersapi/rejType-master/${id}`, this.getHeaders())
  }




  knitworkorder_fty_Fillter(knitfty:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/knitapi/knitworkorder_Fty_Fillter?knitfty=${knitfty}&`, this.getHeaders())
  }

  knitworkorder_buyer_Fillter(knitfty:string='',buyer:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/knitapi/knitworkorder_buyer_Fillter?knitfty=${knitfty}&buyer=${buyer}&`, this.getHeaders())
  }
  knitworkorder_order_Fillter(knitfty:string='',buyer:string='',order:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/knitapi/knitworkorder_order_Fillter?knitfty=${knitfty}&buyer=${buyer}&order=${order}&`, this.getHeaders())
  }

  knitdelivery_fty_Fillter(buyer:string='',orderNo:string='',color:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/knittodye/knit-delivery_Fillter?buyer=${buyer}&orderNo=${orderNo}&color=${color}&`, this.getHeaders())
  }

  knitdelivery_Total_Fillter(buyer:string='',orderNo:string='',color:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/knittodye/knit-delivery_Total_Fillter?buyer=${buyer}&orderNo=${orderNo}&color=${color}&`, this.getHeaders())
  }

  knitdelivery_buyer_list():Observable<any>{
    return this.http.get(this.getUrl() + `/knittodye/knit-delivery_buyer_list`, this.getHeaders())
  }
  knitdelivery_orderNo_list():Observable<any>{
    return this.http.get(this.getUrl() + `/knittodye/knit-delivery_orderNo_list`, this.getHeaders())
  }

  knitdelivery_color_list():Observable<any>{
    return this.http.get(this.getUrl() + `/knittodye/knit-delivery_color_list`, this.getHeaders())
  }

  




  dyeworkorder_fty_Fillter(buyer:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/dyeapi/dyeworkorder_Fty_Fillter`, this.getHeaders())
  }

  dyeworkorder_buyer_Fillter(Order:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/dyeapi/dyeworkorder_buyer_Fillter`, this.getHeaders())
  }
  dyeworkorder_Order_Fillter(dyefty:string='',buyer:string='',order:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/dyeapi/dyeworkorder_order_Fillter?dyefty=${dyefty}&buyer=${buyer}&order=${order}&`, this.getHeaders())
  }

  dyedelivery_fty_Fillter(knitfty:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/knittodye/knit-delivery_Fillter?knitfty=${knitfty}`, this.getHeaders())
  }



  // <!-----------------------BUYER TO ORDER------------------------------------------------------------------>
  Buyer_to_order(buyer:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/buyer_order_BO?buyer=${buyer}&`, this.getHeaders())
  }

  order_to_style(buyer:string='' , order : string = ''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/order_style_BO?buyer=${buyer}&order=${order}&`, this.getHeaders())
  }

  style_to_color(buyer:string='' , order : string = '' , style:string = ''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/style_Color_BO?buyer=${buyer}&order=${order}&style=${style}&`, this.getHeaders())
  }

  color_to_size(buyer:string='' , order : string = '' , style:string = '',color:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/Color_size_BO?buyer=${buyer}&order=${order}&style=${style}&color=${color}&`, this.getHeaders())
  }

  Fsize_to_Gsize(style:string='' , fsize : string = ''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/Fsize_Gsize_BO?style=${style}&fsize=${fsize}&`, this.getHeaders())
  }

  
  size_to_id(buyer:string='' , order : string = '' , style:string = '',color:string='', size:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/size_id_BO?buyer=${buyer}&order=${order}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
  }

  f_size_BO(style:string = '', size:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/f-size_BO?size=${size}&style=${style}`, this.getHeaders())
  }
  fabric_type_BO():Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/fabric_type_BO`, this.getHeaders())
  }

  dye_Type_BO():Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/dye_Type_BO`, this.getHeaders())
  } 


  Spin_Fty_BO():Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/Spin_Fty_BO`, this.getHeaders())
  }

  Knit_Fty_BO():Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/Knit_Fty_BO`, this.getHeaders())
  }
  Dyein_Fty_BO():Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/Dyein_Fty_BO`, this.getHeaders())
  }

  yarn_type_BO():Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/yarn_type_BO`, this.getHeaders())
  }

  RejTypeLoss_BO(color:string =''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/RejTypeLoss_BO?color=${color}`, this.getHeaders())
  }

  PODetailsLoss_BO(buyer:string='' , order : string = '' , style:string = '',color:string='', size:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/PODetailsLoss_BO?buyer=${buyer}&order=${order}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
  }

  ColorLoss_BO(color:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/ColorLoss_BO?color=${color}`, this.getHeaders())
  }
  
  DyeTypeMaster_BO(StyleId:string='' , dyeTypeId:string='' ):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/DyeTypeMaster_BO?StyleId=${StyleId}&dyeTypeId=${dyeTypeId}`, this.getHeaders())
  }

  fabricType_BO(StyleId:string='' , fabTypeId:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/fabricType_BO?StyleId=${StyleId}&fabTypeId=${fabTypeId}`, this.getHeaders())
  }


  Gsize_BO(style:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/workorderapi/gsize_BO?style=${style}&`, this.getHeaders())
  }


  fabbooking(data:any ): Observable<any> {
    return this.http.post(this.getUrl() + `/workorderapi/fab-booking`, data,this.getHeaders())
  }

  // ================================= Machine Allocation Master =================================================================================================

  getAllocationMaster(machineDia:any):Observable<any>{
    return this.http.get(this.getUrl() + `/mastersapi/machine-list?machineDia=${machineDia}&`, this.getHeaders())
  }

  getSingleAllocationMaster(id:any):Observable<any>{
    return this.http.get(this.getUrl() + `/mastersapi/machine-list/${id}`, this.getHeaders())
  }

  postAllocationMaster(data:any):Observable<any>{
    return this.http.post(this.getUrl() + `/mastersapi/machine-list`, data, this.getHeaders())
  }

  //--------------------------------------------Cutting [Start]------------------------------------------------------
  
  CuttingBuyer(): Observable<any> {
    return this.http.get(this.getUrl() + `/garmentsapi/Cutting-Buyer` ,this.getHeaders())
  }
  
  CuttingOrderNo(): Observable<any> {
    return this.http.get(this.getUrl() + `/garmentsapi/Cutting-OrderNo` ,this.getHeaders())
  }
  
  cuttingPost(data:any ): Observable<any> {
    return this.http.post(this.getUrl() + `/garmentsapi/cutting`, data,this.getHeaders())
  }
 
  cutting(buyer:string='' , orderNo:string='' , fromDate:string='' , toDate:string=''):Observable<any>{
    return this.http.get(this.getUrl() + `/garmentsapi/cutting?buyer=${buyer}&orderNo=${orderNo}&fromDate=${fromDate}&toDate=${toDate}&`, this.getHeaders())
  }

  cuttingId(id:any):Observable<any>{
    return this.http.get(this.getUrl() + `/garmentsapi/cutting/${id}`, this.getHeaders())
  }

  cut_buyers(): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/cut_buyers`, this.getHeaders())
  }

  cut_buyersorders(buyer: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/cut_buyers-orders?buyer=${buyer}&`, this.getHeaders())
  }

  cut_ordersstyles(buyer: any, order: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/cut_orders-styles?buyer=${buyer}&orderNo=${order}&`, this.getHeaders())
  }

  cut_stylescolors(buyer: any, order: any, style: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/cut_styles-colors?buyer=${buyer}&orderNo=${order}&style=${style}&`, this.getHeaders())
  }

  cut_colorssizes(buyer: any, order: any, style: any, color: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/cut_colors-sizes?buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
  }

  getcutdetails(buyer: any, orderNo?: any, style?: any, color?: any, size?: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/cutting-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
  }
  //--------------------------------------------Cutting [End]------------------------------------------------------

    //--------------------------------------------sewinput [Start]------------------------------------------------------
   
    sewingBuyer(): Observable<any> {
      return this.http.get(this.getUrl() + `/garmentsapi/sewinginput-Buyer` ,this.getHeaders())
    }
    
    sewingOrderNo(): Observable<any> {
      return this.http.get(this.getUrl() + `/garmentsapi/sewinginput-OrderNo` ,this.getHeaders())
    }
    
    sewingPost(data:any ): Observable<any> {
      return this.http.post(this.getUrl() + `/garmentsapi/sewing-input`, data,this.getHeaders())
    }
   
    sewing(buyer:string='' , orderNo:string='' , fromDate:string='' , toDate:string=''):Observable<any>{
      return this.http.get(this.getUrl() + `/garmentsapi/sewing-input?buyer=${buyer}&orderNo=${orderNo}&fromDate=${fromDate}&toDate=${toDate}&`, this.getHeaders())
    }
  
    sewingId(id:any):Observable<any>{
      return this.http.get(this.getUrl() + `/garmentsapi/sewing-input/${id}`, this.getHeaders())
    }
   
   
   
   
    sewinput_buyers(): Observable<any> {
      return this.http.get(this.getUrl() + `/filtersapi/sewinput_buyers`, this.getHeaders())
    }
  
    sewinput_buyersorders(buyer: any): Observable<any> {
      return this.http.get(this.getUrl() + `/filtersapi/sewinput_buyers-orders?buyer=${buyer}&`, this.getHeaders())
    }
  
    sewinput_ordersstyles(buyer: any, order: any): Observable<any> {
      return this.http.get(this.getUrl() + `/filtersapi/sewinput_orders-styles?buyer=${buyer}&orderNo=${order}&`, this.getHeaders())
    }
  
    sewinput_stylescolors(buyer: any, order: any, style: any): Observable<any> {
      return this.http.get(this.getUrl() + `/filtersapi/sewinput_styles-colors?buyer=${buyer}&orderNo=${order}&style=${style}&`, this.getHeaders())
    }
  
    sewinput_colorssizes(buyer: any, order: any, style: any, color: any): Observable<any> {
      return this.http.get(this.getUrl() + `/filtersapi/sewinput_colors-sizes?buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
    }
  
    getsewinputfilterdetails(buyer: any, orderNo?: any, style?: any, color?: any, size?: any): Observable<any> {
      return this.http.get(this.getUrl() + `/filtersapi/sewinput-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
    }

        //--------------------------------------------sewinput [End]------------------------------------------------------


        //--------------------------------------------sewoutput [Start]------------------------------------------------------
   
        sewoutputBuyer(): Observable<any> {
          return this.http.get(this.getUrl() + `/garmentsapi/sewingoutput-Buyer` ,this.getHeaders())
        }
        
        sewoutputOrderNo(): Observable<any> {
          return this.http.get(this.getUrl() + `/garmentsapi/sewingoutput-OrderNo` ,this.getHeaders())
        }
        
        sewoutputPost(data:any ): Observable<any> {
          return this.http.post(this.getUrl() + `/garmentsapi/sewing-output`, data,this.getHeaders())
        }
       
        sewoutput(buyer:string='' , orderNo:string='' , fromDate:string='' , toDate:string=''):Observable<any>{
          return this.http.get(this.getUrl() + `/garmentsapi/sewing-output?buyer=${buyer}&orderNo=${orderNo}&fromDate=${fromDate}&toDate=${toDate}&`, this.getHeaders())
        }
      
        sewoutputId(id:any):Observable<any>{
          return this.http.get(this.getUrl() + `/garmentsapi/sewing-output/${id}`, this.getHeaders())
        }
       
       
       
       
        sewoutput_buyers(): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/sewoutput_buyers`, this.getHeaders())
        }
      
        sewoutput_buyersorders(buyer: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/sewoutput_buyers-orders?buyer=${buyer}&`, this.getHeaders())
        }
      
        sewoutput_ordersstyles(buyer: any, order: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/sewoutput_orders-styles?buyer=${buyer}&orderNo=${order}&`, this.getHeaders())
        }
      
        sewoutput_stylescolors(buyer: any, order: any, style: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/sewoutput_styles-colors?buyer=${buyer}&orderNo=${order}&style=${style}&`, this.getHeaders())
        }
      
        sewoutput_colorssizes(buyer: any, order: any, style: any, color: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/sewoutput_colors-sizes?buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
        }
      
        getsewoutputdetails(buyer: any, orderNo?: any, style?: any, color?: any, size?: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/sewoutput-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
        }
    
        //--------------------------------------------sewoutput [End]------------------------------------------------------

        //--------------------------------------------Sewing Packing  [Start]------------------------------------------------------

        sewingpackingBuyer(): Observable<any> {
          return this.http.get(this.getUrl() + `/garmentsapi/sewingpacking-Buyer` ,this.getHeaders())
        }
        
        sewingpackingOrderNo(): Observable<any> {
          return this.http.get(this.getUrl() + `/garmentsapi/sewingpacking-OrderNo` ,this.getHeaders())
        }
        
        sewingpackingPost(data:any ): Observable<any> {
          return this.http.post(this.getUrl() + `/garmentsapi/sewing-packing`, data,this.getHeaders())
        }
       
        sewingpacking(buyer:string='' , orderNo:string='' , fromDate:string='' , toDate:string=''):Observable<any>{
          return this.http.get(this.getUrl() + `/garmentsapi/sewing-packing?buyer=${buyer}&orderNo=${orderNo}&fromDate=${fromDate}&toDate=${toDate}&`, this.getHeaders())
        }
      
        sewingpackingId(id:any):Observable<any>{
          return this.http.get(this.getUrl() + `/garmentsapi/sewing-packing/${id}`, this.getHeaders())
        }





        sewingpacking_buyers(): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/packing_buyers`, this.getHeaders())
        }
      
        sewingpacking_buyersorders(buyer: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/packing_buyers-orders?buyer=${buyer}&`, this.getHeaders())
        }
      
        sewingpacking_ordersstyles(buyer: any, order: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/packing_orders-styles?buyer=${buyer}&orderNo=${order}&`, this.getHeaders())
        }
      
        sewingpacking_stylescolors(buyer: any, order: any, style: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/packing_styles-colors?buyer=${buyer}&orderNo=${order}&style=${style}&`, this.getHeaders())
        }
      
        sewingpacking_colorssizes(buyer: any, order: any, style: any, color: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/packing_colors-sizes?buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
        }
      
        getsewingpackingdetails(buyer: any, orderNo?: any, style?: any, color?: any, size?: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/packing-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
        }

        //--------------------------------------------Sewing Packing  [Ends]------------------------------------------------------


        //--------------------------------------------Shipment  [Start]------------------------------------------------------
         
        shippingBuyer(): Observable<any> {
          return this.http.get(this.getUrl() + `/garmentsapi/shipping-Buyer` ,this.getHeaders())
        }
        
        shippingOrderNo(): Observable<any> {
          return this.http.get(this.getUrl() + `/garmentsapi/shipping-OrderNo` ,this.getHeaders())
        }

        shippingPost(data:any ): Observable<any> {
          return this.http.post(this.getUrl() + `/garmentsapi/sewing-shipping`, data,this.getHeaders())
        }
       
        shipping(buyer:string='' , orderNo:string='' , fromDate:string='' , toDate:string=''):Observable<any>{
          return this.http.get(this.getUrl() + `/garmentsapi/sewing-shipping?buyer=${buyer}&orderNo=${orderNo}&fromDate=${fromDate}&toDate=${toDate}&`, this.getHeaders())
        }
      
        shippingId(id:any):Observable<any>{
          return this.http.get(this.getUrl() + `/garmentsapi/sewing-shipping/${id}`, this.getHeaders())
        }    





        shipping_buyers(): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/shipping_buyers`, this.getHeaders())
        }
      
        shipping_buyersorders(buyer: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/shipping_buyers-orders?buyer=${buyer}&`, this.getHeaders())
        }
      
        shipping_ordersstyles(buyer: any, order: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/shipping_orders-styles?buyer=${buyer}&orderNo=${order}&`, this.getHeaders())
        }
      
        shipping_stylescolors(buyer: any, order: any, style: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/shipping_styles-colors?buyer=${buyer}&orderNo=${order}&style=${style}&`, this.getHeaders())
        }
      
        shipping_colorssizes(buyer: any, order: any, style: any, color: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/shipping_colors-sizes?buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}&`, this.getHeaders())
        }
      
        getshippingdetails(buyer: any, orderNo?: any, style?: any, color?: any, size?: any): Observable<any> {
          return this.http.get(this.getUrl() + `/filtersapi/shipping-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}&`, this.getHeaders())
        }


        //--------------------------------------------Shipment  [Ends]------------------------------------------------------


        //--------------------------------------------Invoice  [Start]------------------------------------------------------
        invoiceBuyer(): Observable<any> {
          return this.http.get(this.getUrl() + `/garmentsapi/Invoice-Buyer` ,this.getHeaders())
        }
        
        invoiceOrderNo(): Observable<any> {
          return this.http.get(this.getUrl() + `/garmentsapi/Invoice-invoiceno` ,this.getHeaders())
        }
        
        invoicePost(data:any ): Observable<any> {
          return this.http.post(this.getUrl() + `/garmentsapi/sewing-invoice`, data,this.getHeaders())
        }
       
        invoice(buyer:string='' , orderNo:string='' , fromDate:string='' , toDate:string=''):Observable<any>{
          return this.http.get(this.getUrl() + `/garmentsapi/sewing-invoice?buyer=${buyer}&orderNo=${orderNo}&fromDate=${fromDate}&toDate=${toDate}&`, this.getHeaders())
        }
      
        invoiceId(id:any):Observable<any>{
          return this.http.get(this.getUrl() + `/garmentsapi/sewing-invoice/${id}`, this.getHeaders())
        }

        //--------------------------------------------Invoice  [Ends]------------------------------------------------------


        //--------------------------------------------Line [Start]------------------------------------------------------
        linePost(data:any ): Observable<any> {
          return this.http.post(this.getUrl() + `/mastersapi/line-list`, data,this.getHeaders())
        }

        line(): Observable<any> {
          return this.http.get(this.getUrl() + `/mastersapi/line-list` ,this.getHeaders())
        }

        lineid(id:any):Observable<any>{
          return this.http.get(this.getUrl() + `/mastersapi/line/${id}`, this.getHeaders())
        }

        //--------------------------------------------Line [End]------------------------------------------------------

        //-------------------------------------------- Line - Machine list Master [Start]------------------------------------------------------

        Machinelist(): Observable<any> {
          return this.http.get(this.getUrl() + `/mastersapi/lineName-list` ,this.getHeaders())
        }

        MachinelistPost(data:any ): Observable<any> {
          return this.http.post(this.getUrl() + `/mastersapi/linemachinelist-master`, data,this.getHeaders())
        }

        Machinelinelist( ): Observable<any> {
          return this.http.get(this.getUrl() + `/mastersapi/linemachinelist-list`,this.getHeaders())
        }

        Machinelistid(id:any):Observable<any>{
          return this.http.get(this.getUrl() + `/mastersapi/linemachinelist/${id}`, this.getHeaders())
        }
        //-------------------------------------------- Line - Machine list Master [End]------------------------------------------------------
        //-------------------------------------------- Working Day Master [Start]------------------------------------------------------

        workingdaylist(): Observable<any> {
          return this.http.get(this.getUrl() + `/mastersapi/workingday_master_list` ,this.getHeaders())
        }

        workingdaylistPost(data:any ): Observable<any> {
          return this.http.post(this.getUrl() + `/mastersapi/workingday_master`, data,this.getHeaders())
        }

        workingdaylistid(id:any):Observable<any>{
          return this.http.get(this.getUrl() + `/mastersapi/workingday_master_id/${id}`, this.getHeaders())
        }

        //-------------------------------------------- Working Day Master [End]------------------------------------------------------

      }

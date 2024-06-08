import { AbstractType, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiUrl = "https://tracker.seppam.com";
  // apiUrl = "http://localhost:2000";

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


Workorderdelect(id:any):Observable<any>{
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
    return this.http.get(this.getUrl() + `/filtersapi/buyers-orders?buyer=${buyer}`, this.getHeaders())
  }

  getstyle(buyer: any, order: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/orders-styles?buyer=${buyer}&orderNo=${order}`, this.getHeaders())
  }

  getcolor(buyer: any, order: any, style: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/styles-colors?buyer=${buyer}&orderNo=${order}&style=${style}`, this.getHeaders())
  }

  getsize(buyer: any, order: any, style: any, color: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/colors-sizes?buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}`, this.getHeaders())
  }

  getwodetails(buyer: any, orderNo?: any, style?: any, color?: any, size?:any): Observable<any> {
    return this.http.get(this.getUrl() + `/workorderapi/workorders-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}`, this.getHeaders())
  }
  getknitwodetails(buyer: any, orderNo?: any, style?: any, color?: any, size?:any): Observable<any> {
    return this.http.get(this.getUrl() + `/workorderapi/workorders-filter?buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}`, this.getHeaders())
  }


  getbuyersData(): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/buyers_data`, this.getHeaders())
  }

  getordersData(buyer: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/buyers-orders_data?buyer=${buyer}`, this.getHeaders())
  }

  getstyleData(buyer: any, order: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/orders-styles_data?buyer=${buyer}&orderNo=${order}`, this.getHeaders())
  }

  getcolorData(buyer: any, order: any, style: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/styles-colors_data?buyer=${buyer}&orderNo=${order}&style=${style}`, this.getHeaders())
  }

  getsizeData(buyer: any, order: any, style: any, color: any): Observable<any> {
    return this.http.get(this.getUrl() + `/filtersapi/colors-sizes_data?buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}`, this.getHeaders())
  }

  getcodeData(factory:any , buyer: any, order: any, style: any, color: any): Observable<any> {
    return this.http.get(this.getUrl() + `/dyeapi/DyecodeFilter?dyeFactory=${factory}&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}`, this.getHeaders())
  }

  postsinglewodetails(data: any, id: any): Observable<any> {
    return this.http.put(this.getUrl() + `/workorderapi/workorder/${id}`, data, this.getHeaders())
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

  entry1Delete(id:any, lineId:any):Observable<any>{
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry1?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry2Delete(id:any, lineId:any):Observable<any>{
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry2?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry3Delete(id:any, lineId:any):Observable<any>{
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry3?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry4Delete(id:any, lineId:any):Observable<any>{
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry4?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry5Delete(id:any, lineId:any):Observable<any>{
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry5?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry6Delete(id:any, lineId:any):Observable<any>{
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry6?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }

  entry7Delete(id:any, lineId:any):Observable<any>{
    return this.http.delete(this.getUrl() + `/fabricrollapi/entry7?id=${id}&line_Id=${lineId}`, this.getHeaders())
  }


// ============================================== knit  ====================================================================================================

  knitDate():Observable<any>{
    return this.http.get(this.getUrl() + `/knitapi/knit-date`, this.getHeaders())
  }

  knit_entry(data:any):Observable<any>{
    return this.http.post(this.getUrl()+`/knitapi/knit` , data , this.getHeaders())
  }
  knitfty_name():Observable<any>{
    return this.http.get(this.getUrl()+`/knitapi/knit-factory`, this.getHeaders())
  }
  woknitfty_name():Observable<any>{
    return this.http.get(this.getUrl()+`/knitapi/Woknit-factory`, this.getHeaders())
  }


  ftydetailsFilter(factory : any , date : any): Observable<any> {
    return this.http.get(this.getUrl() + `/knitapi/knit-filter?id=&factory=${factory}&date=${date}&buyer=&orderNo=&style=&color=&size=`, this.getHeaders())
  }

  knitDetailsFilter(buyer:any , orderNo:any, style:any, color:any, size:any):Observable<any>{
    return this.http.get(this.getUrl() + `/knitapi/knit-filter?id=&factory=&date=&buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}`, this.getHeaders())
  }
  getallfty_details():Observable<any>{
    return this.http.get(this.getUrl()+`/knitapi/knit`, this.getHeaders())
  }
  getsingleknit_details(id:any):Observable<any>{
    return this.http.get(this.getUrl()+`/knitapi/knit/${id}`, this.getHeaders())
  }
  
  deleteKnitDetails(id:any):Observable<any>{
    return this.http.delete(this.getUrl()+`/knitapi/knit/${id}`, this.getHeaders())
  }
  updateKnitEntry(data:any):Observable<any>{
    return this.http.post(this.getUrl()+`/knitapi/knit` , data , this.getHeaders())
  }

  knitauth(factory:any , buyer:any, orderNo:any, style:any, color:any, size:any):Observable<any>{
    return this.http.get(this.getUrl() + `/knitapi/knitauth?factory=${factory}&buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&size=${size}`, this.getHeaders())
  }


// =========================================== dye ==========================================================================================================
  post_dyereport_entry(data:any):Observable<any>{
    return this.http.post(this.getUrl()+`/dyeapi/dye` , data , this.getHeaders())
  }
  
  dye_factory_name():Observable<any>{
    return this.http.get(this.getUrl()+`/dyeapi/dye-factory` , this.getHeaders())
  }

  dye_fabrictype_dropdown():Observable<any>{
    return this.http.get(this.getUrl()+`/dyeapi/dye-fabrictype` , this.getHeaders())
  }

  dyeBatchAllData():Observable<any>{
    return this.http.get(this.getUrl() + `/dyeapi/dye` , this.getHeaders())
  }

  dye_batch_single_data(id:any):Observable<any>{
    return this.http.get(this.getUrl()+`/dyeapi/dye/${id}` , this.getHeaders())
  }

  DyeBatchDelect(id:any):Observable<any>{
    return this.http.delete(this.getUrl()+`/dyeapi/dye/${id}` , this.getHeaders())
  }

// <!---------------------------------------->
DyeFactoryfilter():Observable<any>{
  return this.http.get(this.getUrl() + `/dyeapi/DyeFactoryFilter` , this.getHeaders())
}


DyeBuyerfilter(dyeFactory:any):Observable<any>{
  return this.http.get(this.getUrl() + `/dyeapi/DyeBuyerFilter?dyeFactory=${dyeFactory}` , this.getHeaders())
}


DyeOrderNofilter(dyeFactory:any , buyer:any , ):Observable<any>{
  return this.http.get(this.getUrl() + `/dyeapi/DyeOrderNoFilter?dyeFactory=${dyeFactory}&buyer=${buyer}` , this.getHeaders())
}

DyeStylefilter(dyeFactory:any , buyer:any , order:any ):Observable<any>{
  return this.http.get(this.getUrl() + `/dyeapi/DyeStyleFilter?dyeFactory=${dyeFactory}&buyer=${buyer}&orderNo=${order}` , this.getHeaders())
}

DyeColorfilter(dyeFactory:any , buyer:any , order:any , style:any ):Observable<any>{
  return this.http.get(this.getUrl() + `/dyeapi/DyeColorFilter?dyeFactory=${dyeFactory}&buyer=${buyer}&orderNo=${order}&style=${style}` , this.getHeaders())
}

DyeCodefilter(dyeFactory:any , buyer:any , order:any , style:any , color:any):Observable<any>{
  return this.http.get(this.getUrl() + `/dyeapi/DyecodeFilter?dyeFactory=${dyeFactory}&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}` , this.getHeaders())
}

DyeFilter(DyeFactory: any , buyer?:any , orderNo?:any, style?:any , color?:any , batchNo?:any ) : Observable<any>{
  return this.http.get(this.getUrl()+`/dyeapi/dye-filter?dyeFactory=${DyeFactory}&buyer=${buyer}&orderNo=${orderNo}&style=${style}&color=${color}&batchNo=${batchNo}` , this.getHeaders())
}
// <!----------------->






  addUpdateYarn(data:any):Observable<any>{
    return this.http.post(this.getUrl() + `/yarnapi/yarn`, data, this.getHeaders())
  }

  addUpdateYarnCheck(data:any):Observable<any>{
    return this.http.post(this.getUrl() + `/yarnapi/yarn_lot_check`, data, this.getHeaders())
  }

  addUpdateOrderAllocation(data:any):Observable<any>{
    return this.http.post(this.getUrl() + `/yarnapi/yarn_order_allocations`, data, this.getHeaders())
  }

  addUpdateYarnreceipt(data:any):Observable<any>{
    return this.http.post(this.getUrl() + `/yarnapi/yarn_receipts_lines`, data, this.getHeaders())
  }

  addUpdateYarnQuality(data:any):Observable<any>{
    return this.http.post(this.getUrl() + `/yarnapi/yarn_quality_check`, data, this.getHeaders())
  }

  getAllYarn():Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn`, this.getHeaders())
  }

  yarnSpinner():Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn-spinner` , this.getHeaders())
  }

  yarnLcNo(spinner:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn-lcNo?spinner=${spinner}`, this.getHeaders())
  }

  yarnLcValue():Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn-lcValue`, this.getHeaders())
  }

  yarnStatus():Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn-status`, this.getHeaders())
  }

  yarnSomeStatus(spinner:any, lcNo:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn-some-status?spinner=${spinner}&lcNo=${lcNo}`, this.getHeaders())
  }

  yarnPi():Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn-status`, this.getHeaders())
  }

  yarnType():Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn_type`, this.getHeaders())
  }

  yarnFilter(spinner:any , lcNo:any = '', lcValue:any = '', yarnStatus:any = '', pi:any = ''):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn-filter?id=&spinner=${spinner}&lcNo=${lcNo}&lcValue=${lcValue}&yarnStatus=${yarnStatus}&pi=${pi}`, this.getHeaders())
  }
  
  receiptDetailsForQc(id:any, receiptId:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarnReceiptForQC?id=${id}&receiptId=${receiptId}`, this.getHeaders())
  }

  lcDetailsForlot(id:any, lineId:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarnlclineForLot?id=${id}&lineId=${lineId}`, this.getHeaders())
  }

  lcDetailsForOrder(id:any, lineId:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarnlclineForOrder?id=${id}&lineId=${lineId}`, this.getHeaders())
  }

  lcDetailsForReceipt(id:any, lineId:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarnlclineForReceipt?id=${id}&lineId=${lineId}`, this.getHeaders())
  }

  getSingleYarnData(id:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn/${id}`, this.getHeaders())
  }
  //-------------------------------------------------------------------

  getSingleLcClosure(id:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarnreport/${id}`, this.getHeaders())
  }

  //-------------------------------------------------------------------

  gettingYarnType(spinner:any, lcNo:string = ''):Observable<any>{
    return this.http.get(this.getUrl()+`/yarnapi/yarn-filter?id=&spinner=${spinner}&lcNo=${lcNo}&lcValue=&yarnStatus=&pi=`, this.getHeaders())
  }

  getallSpinfty():Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/spinfty`, this.getHeaders())
  }

  getSpinOrder(spinner:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/spinfty-orders_data?spin=${spinner}`, this.getHeaders())
  }


  yarnTotal(id:any, type:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn_total?id=${id}&yarnType=${type}`, this.getHeaders())
  }

  yarnLineData(id:any, lineId:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn_line_data?id=${id}&lineId=${lineId}`, this.getHeaders())
  }

  deleteYarn(id:any):Observable<any>{
    return this.http.delete(this.getUrl() + `/yarnapi/yarn/${id}`, this.getHeaders())
  }




  YarnEntryDelete(id:any , lineId:any ):Observable<any>{
    return this.http.delete(this.getUrl() + `/yarnapi/yarnEntryDelete?id=${id}&line=${lineId}` , this.getHeaders())
  }

  lotCheckDetailsDelete(id:any , lineId:any , lotCheckid:any ):Observable<any>{
    return this.http.delete(this.getUrl()+ `/yarnapi/lotCheckDelete?id=${id}&line=${lineId}&lotCheckid=${lotCheckid}` ,this.getHeaders())
  }

  OrderAllocationDeleteDetails( id:any , lineId:any , orderid:any ):Observable<any>{
    return this.http.delete(this.getUrl()+ `/yarnapi/orderDelete?id=${id}&line=${lineId}&orderid=${orderid}` ,this.getHeaders())
  }
  ReceiptdetailsDelete(id:any,lineId:any,ReceiptId:any):Observable<any>{
    return this.http.delete(this.getUrl()+ `/yarnapi/ReceiptDelete?id=${id}&line=${lineId}&ReceiptId=${ReceiptId}`,this.getHeaders())
  }
  YarnQCDeleteDetails(id:any , lineId:any , ReceipDataId :any):Observable<any>{
    return this.http.delete(this.getUrl()+`/yarnapi/YarnQCDelete?id=${id}&line=${lineId}&YarnQCid=${ReceipDataId}` , this.getHeaders())
  }
  

// ============================================= Knit Delivery ===================================================================================


getKnitDelivery():Observable<any>{
  return this.http.get(this.getUrl() + `/knittodye/knit-delivery`, this.getHeaders())
}

getSingleKnitDel(id:any):Observable<any>{
  return this.http.get(this.getUrl() + `/knittodye/knit-delivery/${id}`, this.getHeaders())
}

addUpdateKnitDelivery(data:any):Observable<any>{
  return this.http.post(this.getUrl() + `/knittodye/knit-delivery`,data, this.getHeaders())
}

deleteKnitDelivery(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/knittodye/knit-delivery/${id}`, this.getHeaders())
}
// ============================================= Dye Delivery ===================================================================================

addUpdateDyeDelivery(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/dyedeliveryapi/dye-delivery` ,data , this.getHeaders())
}

getDyeDelivery():Observable<any>{
  return this.http.get(this.getUrl() + `/dyedeliveryapi/dye-delivery`, this.getHeaders())
}
getSingleDyeDel(id:any):Observable<any>{
  return this.http.get(this.getUrl() + `/dyedeliveryapi/dye-delivery/${id}`, this.getHeaders())
}
deleteDyeDelivery(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/dyedeliveryapi/dye-delivery/${id}`, this.getHeaders())
}



LCOutstandingData(date:any):Observable<any>{
  return this.http.get(this.getUrl() + `/yarnapi/LC-Outstanding?date=${date}`, this.getHeaders())
}

KFInventoryData(date:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/knitapi/KF-Inventory?date=${date}`, this.getHeaders())
}

DFInventoryData(date:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/dyeapi/DF-Inventory?date=${date}`, this.getHeaders())
}

YarnReconciliation(date1:any,date2:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/yarnapi/yarn_reconciliation?date1=${date1}&date2=${date2}`, this.getHeaders())
}


FabricsTransferData(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/fabricrollapi/fabrictransfer` ,data , this.getHeaders())
}

FabricsTransferAllData(buyer:string='', order:string = '' , fromDate : string = '' , toDate : string = ''):Observable<any>{
  return this.http.get(this.getUrl()+ `/fabricrollapi/allFabEntrys?Buyer=${buyer}&Order=${order}&fromDate=${fromDate}&toDate=${toDate}`, this.getHeaders())
}


FabricsTransfersingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl() + `/fabricrollapi/singleFabEntrys/${id}` , this.getHeaders())
}
deleteFabricsTransfer(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/fabricrollapi/FabEntrysDelete/${id}`, this.getHeaders())
}


KnitWorkOrderData(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/knitapi/knitworkorder` ,data , this.getHeaders())
}

KnitWorkOrderAllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/knitapi/knitworkorder` ,this.getHeaders())
}

KnitWorkOrderSingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/knitapi/knitworkorder/${id}` ,this.getHeaders())
}

deleteKnitWorkOrder(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/knitapi/knitworkorder/${id}`, this.getHeaders())
}

DyeWorkOrderData(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/dyeapi/dyeworkorder` ,data , this.getHeaders())
}

DyeWorkOrderAllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/dyeapi/dyeworkorder` ,this.getHeaders())
}

DyeWorkOrderSingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/dyeapi/dyeworkorder/${id}` ,this.getHeaders())
}
deleteDyeWorkOrder(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/dyeapi/dyeworkorder/${id}`, this.getHeaders())
}



DayKnit(date:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/knitapi/Day-Knit?date=${date}` ,this.getHeaders())
}


DayDye(date:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/dyeapi/Day-Dye?date=${date}` ,this.getHeaders())
}

DyeBatch(date1:any,date2:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/dyeapi/DyeBatch?date1=${date1}&date2=${date2}`, this.getHeaders())
}



getknitwofty(): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/wofty`, this.getHeaders())
}


getknitwobuyers(knitfty:any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/wobuyer?knitfty=${knitfty}`, this.getHeaders())
}


getknitwoorders(knitfty:any, buyer: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/woorderNo?knitfty=${knitfty}&buyer=${buyer}`, this.getHeaders())
}

getknitwostyle(knitfty:any, buyer: any, order: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/wostyle?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}`, this.getHeaders())
}

getknitwocolor(knitfty:any, buyer: any, order: any, style: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/wocolor?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}&style=${style}`, this.getHeaders())
}

getknitwosize(knitfty:any, buyer: any, order: any, style: any, color: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/wosize?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}`, this.getHeaders())
}




getknit_Ety_wofty(): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/knitentry_wofty`, this.getHeaders())
}


getknit_Ety_wobuyers(knitfty:any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/knitentry_wobuyer?knitfty=${knitfty}`, this.getHeaders())
}


getknit_Ety_woorders(knitfty:any, buyer: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/knitentry_woorderNo?knitfty=${knitfty}&buyer=${buyer}`, this.getHeaders())
}

getknit_Ety_wostyle(knitfty:any, buyer: any, order: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/knitentry_wostyle?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}`, this.getHeaders())
}

getknit_Ety_wocolor(knitfty:any, buyer: any, order: any, style: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/knitentry_wocolor?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}&style=${style}`, this.getHeaders())
}

getknit_Ety_wosize(knitfty:any, buyer: any, order: any, style: any, color: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/knitentry_wosize?knitfty=${knitfty}&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}`, this.getHeaders())
}







getdyewofty(): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/dyewofty`, this.getHeaders())
}

getdyewobuyers(dyefty:any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/dyewobuyer?dyefty=${dyefty}`, this.getHeaders())
}

getdyewoorders(dyefty:any, buyer: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/dyewoorderNo?dyefty=${dyefty}&buyer=${buyer}`, this.getHeaders())
}

getdyewostyle(dyefty:any, buyer: any, order: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/dyewostyle?dyefty=${dyefty}&buyer=${buyer}&orderNo=${order}`, this.getHeaders())
}

getdyewocolor(dyefty:any, buyer: any, order: any, style: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/dyewocolor?dyefty=${dyefty}&buyer=${buyer}&orderNo=${order}&style=${style}`, this.getHeaders())
}

getdyewosize(dyefty:any, buyer: any, order: any, style: any, color: any): Observable<any> {
  return this.http.get(this.getUrl() + `/filtersapi/dyewosize?dyefty=${dyefty}&buyer=${buyer}&orderNo=${order}&style=${style}&color=${color}`, this.getHeaders())
}

// ========================================================== buyer Master ======================================================

Drop_Buyer_master():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/drop-buyer-Master` ,this.getHeaders())
}
BuyerId(buyer:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/drop-buyerId-Master?buyer=${buyer}` ,this.getHeaders())
}

Buyer_master(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/mastersapi/buyer-master` ,data , this.getHeaders())
}

Buyer_master_AllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/buyer-master` ,this.getHeaders())
}

Buyer_master_SingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/buyer-master/${id}` ,this.getHeaders())
}
delete_Buyer_master(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/mastersapi/buyer-master/${id}`, this.getHeaders())
}

// ================================ product Master (Style) ======================================================================


Drop_Style_master():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/drop-style-Master` ,this.getHeaders())
}

StyleId(style:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/drop-styleId-Master?style=${style}` ,this.getHeaders())
}

style_master(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/mastersapi/style-master` ,data , this.getHeaders())
}

style_master_AllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/style-master` ,this.getHeaders())
}

style_master_SingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/style-master/${id}` ,this.getHeaders())
}
delete_style_master(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/mastersapi/style-master/${id}`, this.getHeaders())
}

// ========================== Color master =====================================================================================

Color_master(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/mastersapi/color-master` ,data , this.getHeaders())
}

Color_master_AllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/color-master` ,this.getHeaders())
}

Color_master_SingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/color-master/${id}` ,this.getHeaders())
}
delete_Color_master(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/mastersapi/color-master/${id}`, this.getHeaders())
}

// =========================== Size Master =====================================================================================

Drop_Size_master():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/drop-size-Master` ,this.getHeaders())
}

SizeId(size:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/drop-sizeId-Master?size=${size}` ,this.getHeaders())
}
size_master(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/mastersapi/size-master` ,data , this.getHeaders())
}

size_master_AllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/size-master` ,this.getHeaders())
}

size_master_SingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/size-master/${id}` ,this.getHeaders())
}
delete_size_master(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/mastersapi/size-master/${id}`, this.getHeaders())
}

// ========================== Yarn Type ========================================================================================

yarnType_master(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/mastersapi/yarn-type-master` ,data , this.getHeaders())
}

yarnType_master_AllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/yarn-type-master` ,this.getHeaders())
}

yarnType_master_SingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/yarn-type/${id}` ,this.getHeaders())
}
delete_yarnType_master(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/mastersapi/yarn-type-master/${id}`, this.getHeaders())
}

// =================================== Fabric Type =============================================================================

fabrictype_master(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/mastersapi/fabric-type-master` ,data , this.getHeaders())
}

fabrictype_master_AllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/fabric-type-master` ,this.getHeaders())
}

fabrictype_master_SingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/fabric-type/${id}` ,this.getHeaders())
}
delete_fabrictype_master(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/mastersapi/fabric-type-master/${id}`, this.getHeaders())
}
// =================================== dye Type =============================================================================
fsize_master(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/mastersapi/fsize-master` ,data , this.getHeaders())
}

fsize_master_AllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/fsize-master` ,this.getHeaders())
}

fsize_master_SingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/fsize/${id}` ,this.getHeaders())
}
delete_fsize_master(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/mastersapi/fsize-master/${id}`, this.getHeaders())
}

// =================================== dyetype=============================================================================

dyetype_master(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/mastersapi/dye-type-master` ,data , this.getHeaders())
}

dyetype_master_AllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/dye-type-master` ,this.getHeaders())
}

dyetype_master_SingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/dye-type/${id}` ,this.getHeaders())
}
delete_dyetype_master(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/mastersapi/dye-type-master/${id}`, this.getHeaders())
}

// =================================== KnitFty=============================================================================


KnitFty_Master(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/mastersapi/knitFty-master` ,data , this.getHeaders())
}

KnitFty_Master_AllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/knitFty-master` ,this.getHeaders())
}

KnitFty_Master_SingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/knitFty-master/${id}` ,this.getHeaders())
}
delete_KnitFty_master(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/mastersapi/knitFty-master/${id}`, this.getHeaders())
}

// =================================== dyeFty=============================================================================


dyeFty_Master(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/mastersapi/dyeFty-master` ,data , this.getHeaders())
}

dyeFty_Master_AllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/dyeFty-master` ,this.getHeaders())
}

dyeFty_Master_SingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/dyeFty-master/${id}` ,this.getHeaders())
}
delete_dyeFty_master(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/mastersapi/dyeFty-master/${id}`, this.getHeaders())
}

// =================================== spinerFty=============================================================================
spinFty_Master(data:any):Observable<any>{
  return this.http.post(this.getUrl()+ `/mastersapi/spinFty-master` ,data , this.getHeaders())
}

spinFty_Master_AllData():Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/spinFty-master` ,this.getHeaders())
}

spinFty_Master_SingleData(id:any):Observable<any>{
  return this.http.get(this.getUrl()+ `/mastersapi/spinFty-master/${id}` ,this.getHeaders())
}
delete_spinFty_master(id:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/mastersapi/spinFty-master/${id}`, this.getHeaders())
}


}

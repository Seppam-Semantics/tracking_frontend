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


  postsinglewodetails(data: any, id: any): Observable<any> {
    return this.http.put(this.getUrl() + `/workorderapi/workorder/${id}`, data, this.getHeaders())
  }
  getsinglewodetails(id: any): Observable<any> {
    return this.http.get(this.getUrl() + `/fabricrollapi/fabric-entrys?id=${id}`, this.getHeaders())
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

  knit_entry(data:any):Observable<any>{
    return this.http.post(this.getUrl()+`/knitapi/knit` , data , this.getHeaders())
  }
  knitfty_name():Observable<any>{
    return this.http.get(this.getUrl()+`/knitapi/knit-factory`, this.getHeaders())
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

  yarnSpinnerDropdown():Observable<any>{
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

  yarnPi():Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn-status`, this.getHeaders())
  }

  yarnFilter(spinner:any , lcNo:any, lcValue:any, yarnStatus:any, pi:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn-filter?id=&spinner=${spinner}&lcNo=${lcNo}&lcValue=${lcValue}&yarnStatus=${yarnStatus}&pi=${pi}`, this.getHeaders())
  }
  
  getSingleYarnData(id:any):Observable<any>{
    return this.http.get(this.getUrl() + `/yarnapi/yarn/${id}`, this.getHeaders())
  }

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
}

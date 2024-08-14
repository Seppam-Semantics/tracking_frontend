import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsapiService {

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


  // ========================= Event Master ================================================================


  eventmaster(eventData:string = ''):Observable<any>{
    return this.http.get(this.getUrl() + `/eventsapi/eventmaster?eventData=${eventData}&`, this.getHeaders())
  }

  posteventmaster(data:any):Observable<any>{
    return this.http.post(this.getUrl() + `/eventsapi/eventmaster`, data, this.getHeaders())
  }

  singleEvent(id:any):Observable<any>{
    return this.http.get(this.getUrl() + `/eventsapi/eventmaster/${id}`, this.getHeaders())
  }
  
// ==============================Style Event Master =========================================================

style_event_master(style : string = ''):Observable<any>{
  return this.http.get(this.getUrl() + `/eventsapi/style-event-master?style=${style}`, this.getHeaders());
}

single_style_event_master(id:any):Observable<any>{
  return this.http.get(this.getUrl() + `/eventsapi/style-event-master/${id}`, this.getHeaders());
}

postStyleEventMaster(data:any):Observable<any>{
  return this.http.post(this.getUrl() + `/eventsapi/style-event-master`, data, this.getHeaders())
}

// ==========================================================================================================

// ========================== Budget Days ===================================================================

stylesforbudget():Observable<any>{
  return this.http.get(this.getUrl() + `/eventsapi/styles_events`, this.getHeaders())
}

eventsbystyle(style:any):Observable<any>{
  return this.http.get(this.getUrl() + `/eventsapi/styles_from_to_events?style=${style}`, this.getHeaders())
}

getAllStyleBudgetDays(style:string = ''):Observable<any>{
  return this.http.get(this.getUrl() + `/eventsapi/budget-days-master?style=${style}`, this.getHeaders())
}

postbudgetDays(data:any):Observable<any>{
  return this.http.post(this.getUrl() + `/eventsapi/budgetDaysmaster`, data,this.getHeaders())
}

singleStyleBudgetDays(id:any):Observable<any>{
  return this.http.get(this.getUrl() + `/eventsapi/budget-days-master/${id}`, this.getHeaders())
}

// ====================================================================================================================
// ================= TNA Events ======================================================================================

getAllTNA():Observable<any>{
  return this.http.get(this.getUrl() + `/eventsapi/tna-listing`, this.getHeaders())
}


}

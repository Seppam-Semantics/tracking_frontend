import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  profilename:any;

  constructor(private http:HttpClient) { }

  // apiUrl = "https://tracker.seppam.com";
  // apiUrl = "http://localhost:2000";
  apiUrl= "http://20.244.3.174:3000";


  update:boolean = false;


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



profile(profiletoken:any):Observable<any>{
  return this.http.get(this.getUrl() + `/profileapi/profile`,  this.getHeaders())
}

profileid(id:any, profiletoken:any):Observable<any>{
  return this.http.get(this.getUrl() + `/profileapi/profile/${id}`,  this.getHeaders())
}

profileadd(data:any, profiletoken:any):Observable<any>{
  return this.http.post(this.getUrl() + `/profileapi/profile`, data,  this.getHeaders())
}

rolesadd(data:any, profiletoken:any):Observable<any>{
  return this.http.post(this.getUrl() + `/roleapi/roles`,data, this.getHeaders());
}
deleterole(id:any, profiletoken:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/roleapi/roles/${id}`, this.getHeaders())
}

getemployee(profiletoken:any):Observable<any>{
  return this.http.get(this.getUrl() + `/employeeapi/employee`, this.getHeaders())
}

addemployee(data:any, profiletoken:any):Observable<any>{
  return this.http.post(this.getUrl() + `/employeeapi/employee`, data, this.getHeaders())
}

getsingleemployee(id:any, profiletoken:any):Observable<any>{
return this.http.get(this.getUrl() + `/employeeapi/employee/${id}`, this.getHeaders())
}

deleteemp(id:any, profiletoken:any):Observable<any>{
  return this.http.delete(this.getUrl() + `/employeeapi/employee/${id}`,this.getHeaders())
}
}

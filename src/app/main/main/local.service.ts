import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';

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

profile(profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
  return this.http.get(`${this.apiUrl}/profileapi/profile`,  { headers })
}

profileid(id:any, profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
  return this.http.get(`${this.apiUrl}/profileapi/profile/${id}`,  { headers })
}

profileadd(data:any, profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
  return this.http.post(`${this.apiUrl}/profileapi/profile`, data,  { headers })
}

rolesadd(data:any, profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
  return this.http.post(`${this.apiUrl}/roleapi/roles`,data, { headers });
}
deleterole(id:any, profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
  return this.http.delete(`${this.apiUrl}/roleapi/roles/${id}`, {headers})
}

getemployee(profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
  return this.http.get(`${this.apiUrl}/employeeapi/employee`, { headers })
}

addemployee(data:any, profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
  return this.http.post(`${this.apiUrl}/employeeapi/employee`, data, {headers})
}

getsingleemployee(id:any, profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
return this.http.get(`${this.apiUrl}/employeeapi/employee/${id}`, {headers})
}

deleteemp(id:any, profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
  return this.http.delete(`${this.apiUrl}/employeeapi/employee/${id}`,{headers})
}
}

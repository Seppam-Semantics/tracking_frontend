import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http: HttpClient) { }

apiUrl = "http://localhost:2000";

token:any;
profilenames:any;
rolenames:any;

login(data:any):Observable<any>{
return this.http.post(`${this.apiUrl}/auth/authentication`,data)
}

delete(id:any, profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
  return this.http.delete(`${this.apiUrl}/profileapi/profile/${id}`,  { headers })
}

getroles(profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
  return this.http.get(`${this.apiUrl}/roleapi/roles`, { headers } )
}

getSingleRoles(id:any, profiletoken:any):Observable<any>{
  const headers = new HttpHeaders().set('x-access-token', profiletoken);
  return this.http.get(`${this.apiUrl}/roleapi/roles/${id}`,  { headers })
}



}
 
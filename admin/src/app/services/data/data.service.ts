import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// TODO: Make a call to 'http://localhost:8000/api/login_check' to first get the JWT...
const DATA_URL = 'http://localhost:8000/api/admin/aggregate'
const JWT = localStorage.getItem('JWT')

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  get_data():Observable<any> {
    console.log(JWT);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JWT}`,
      'Content-Type': 'application/json'
    })
    return this.http.get(DATA_URL, { headers: headers })
  }
}

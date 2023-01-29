import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const DATA_URL = 'http://localhost:8000/api/admin/aggregate'
const JWT = localStorage.getItem('JWT')

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  get_data(): Observable<any> {
    console.log(JWT);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JWT}`,
      'Content-Type': 'application/json'
    })
    return this.http.get(DATA_URL, { headers: headers })
  }

  public static isNullOrWhitespace(input: string | null | undefined): boolean {
    return !input || !input.trim()
  }

}

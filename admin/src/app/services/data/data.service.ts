import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

const DATA_URL = 'http://localhost:8000/api/admin/aggregate'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const JWT = LoginService.getJWTData()?.auth
    if (DataService.isNullOrWhitespace(JWT)) {
      return EMPTY
    }

    const headers = new HttpHeaders({
      'Authorization': JWT,
      'Content-Type': 'application/json'
    })
    return this.http.get(DATA_URL, { headers: headers })
  }

  public static isNullOrWhitespace(input: string | null | undefined): boolean {
    return !input || !input.trim()
  }

}

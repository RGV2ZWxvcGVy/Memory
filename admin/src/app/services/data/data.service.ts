import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getData(dataUrl:string): Observable<any> {
    const JWT = LoginService.getJWTData()?.auth
    if (DataService.isNullOrWhitespace(JWT)) {
      return EMPTY
    }

    const headers = new HttpHeaders({
      'Authorization': JWT,
      'Content-Type': 'application/json'
    })

    return this.http.get(dataUrl, { headers: headers })
  }

  public static isNullOrWhitespace(input: string | null | undefined): boolean {
    return !input || !input.trim()
  }

}

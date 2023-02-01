import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';

const DATA_URL = 'http://localhost:8000/api/login_check'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    let body = `{"username":"${username}","password":"${password}"}`
    const headers = { 'Content-Type': 'application/json' }

    return this.http.post(DATA_URL, body, { headers })
  }

  public static urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/-/g, '/')

    switch (output.length % 4) {
      case 0:
        break
      case 2:
        output += '=='
        break
      case 3:
        output += '='
        break
      default:
        throw 'Illigal base64url string!'
    }

    return decodeURIComponent((<any>window).escape(window.atob(output)))
  }

  public static isLoggedIn(): boolean {
    return !LoginService.isTokenExpired()
  }

  public static isLoginExpired(): boolean {
    return LoginService.isTokenExpired() && !DataService.isNullOrWhitespace(localStorage.getItem('JWT'))
  }

  public static isTokenExpired(): boolean {
    const token = this.getJWTData()?.auth.split(' ')[1]
    if (token) {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp
      const now = (Math.floor((new Date).getTime() / 1000))

      return expiry - now <= 0
    }

    return true
  }

  public static getJWTData(): any {
    const token = localStorage.getItem('JWT')
    if (token?.length) {
      const auth = `Bearer ${token}`
      const chunks = token.split('.')
      const header = atob(chunks[0])
      const id = parseInt(header.split(',')[2].split(':')[1])

      return JSON.parse(`{"id":"${id}","auth":"${auth}"}`)
    }

    return token
  }

}

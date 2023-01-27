import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const DATA_URL = 'http://localhost:8000/api/login_check'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(username:string, password:string):Observable<any> {
    let body = `{"username":"${username}","password":"${password}"}`
    const headers = { 'Content-Type': 'application/json' }

    return this.http.post(DATA_URL, body, { headers })
  }

  public static urlBase64Decode(str:string):string {
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

}

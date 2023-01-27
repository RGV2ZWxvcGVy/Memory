import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router:Router, private loginService:LoginService) {}

  login(username:string, password:string):void {
    console.log(username)
    console.log(password)

    this.loginService.login(username, password).subscribe(data => {
      let token = data['token']
      const parts = token.split('.')
      const decoded = LoginService.urlBase64Decode(parts[1])
      let json = JSON.parse(decoded)
      console.log(json['roles'])

      localStorage.setItem('token', token)
      this.router.navigate([''])
    })
  }

}

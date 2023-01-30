import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public errorMsg: string = ""

  constructor(private router: Router, private loginService: LoginService) { }

  login(username: string, password: string): void {
    if (DataService.isNullOrWhitespace(username) ||
      DataService.isNullOrWhitespace(password)) {
      this.errorMsg = "Username or password cannot be blank."
      return
    }

    this.loginService.login(username, password).subscribe({
      next: (data) => {
        let token = data['token']
        const parts = token.split('.')
        const decoded = LoginService.urlBase64Decode(parts[1])
        let json = JSON.parse(decoded)

        let roles = json['roles']
        if (roles.includes('ROLE_ADMIN')) {
          localStorage.setItem('JWT', token)
        }
        else {
          this.errorMsg = "Only admin accounts are allowed to log in."
        }
      },
      error: () => this.errorMsg = "Wrong credentials, try again.",
      complete: () => {
        if (!LoginService.isTokenExpired()) {
          this.router.navigate([''])
        }
      }
    })
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  private data: any

  constructor(private router: Router, private dataService: DataService) {
    if (LoginService.isTokenExpired()) {
      this.router.navigate(['login'])
    }
  }

  get_data(): any {
    return this.data
  }

  load_data(): void {
    this.dataService.get_data().subscribe((data: any) => {
      this.data = data
      console.log(data)
    })
  }

}

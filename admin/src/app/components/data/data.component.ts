import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements AfterViewInit {

  private data: Observable<any>

  constructor(private router: Router, private dataService: DataService) {
    if (LoginService.isTokenExpired()) {
      this.router.navigate(['login'])
    }

    this.loadData()
    this.data = this.getData()
  }

  ngAfterViewInit(): void {
    // this.loadData()
  }

  getData(): Observable<any> {
    return this.data
  }

  loadData(): void {
    this.dataService.getData().subscribe((data: any) => {
      this.data = data
      console.log(this.data)
    })
  }

}

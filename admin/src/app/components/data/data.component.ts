import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  private data:any

  constructor(private dataService:DataService) {}

  get_data():any {
    return this.data
  }

  load_data():void {
    this.dataService.get_data().subscribe((data:any) => {
      this.data = data
      console.log(data)
    })
  }
}

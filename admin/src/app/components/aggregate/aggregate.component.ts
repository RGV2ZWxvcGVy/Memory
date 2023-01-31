import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.css']
})
export class AggregateComponent {

  private data: any

  constructor(private dataService: DataService) {
    this.loadData()
  }

  getData(): any {
    return this.data
  }

  loadData(): void {
    this.dataService.getData().subscribe((data: any) => {
      this.data = data
    })
  }

}

import { Component } from '@angular/core';
import { AggregateService } from 'src/app/services/aggregate/aggregate.service';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.css']
})
export class AggregateComponent {

  private data: any

  constructor(private aggregateService: AggregateService) {
    this.loadData()
  }

  getData(): any {
    return this.data
  }

  loadData(): void {
    this.aggregateService.getAggregateData().subscribe((data: any) => {
      this.data = data
    })
  }

}

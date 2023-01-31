import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';

const DATA_URL = 'http://localhost:8000/api/admin/aggregate'

@Injectable({
  providedIn: 'root'
})
export class AggregateService {

  constructor(private dataService: DataService) { }

  getAggregateData(): Observable<any> {
    return this.dataService.getData(DATA_URL)
  }

}

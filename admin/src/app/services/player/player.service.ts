import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';

const DATA_URL = 'http://localhost:8000/api/player'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private dataService: DataService) { }

  getPlayerData(id: number): Observable<any> {
    return this.dataService.getData(`${DATA_URL}/${id}`)
  }

}

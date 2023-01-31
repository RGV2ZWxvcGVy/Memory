import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';

const DATA_URL = 'http://localhost:8000/api/admin/players'

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private dataService: DataService) { }

  getPlayers(): Observable<any> {
    return this.dataService.getData(DATA_URL)
  }

}

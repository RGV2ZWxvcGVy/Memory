import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players/players.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {

  private data: any

  constructor(private router: Router, private playersService: PlayersService) {
    this.loadData()
  }

  getData(): any {
    return this.data
  }

  loadData(): void {
    this.playersService.getPlayers().subscribe((data: any) => {
      this.data = data
    })
  }

  showPlayer(id: string): void {
    const playerId = parseInt(id)
    if (typeof playerId === 'number' && !Number.isNaN(playerId)) {
      this.router.navigate(['player'], { queryParams: { id: playerId } })
    }
  }

}

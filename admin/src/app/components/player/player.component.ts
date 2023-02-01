import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  private playerId: number
  private playerData: any

  playerName: string = ''
  playerGameCount: number = 0

  constructor(private route: ActivatedRoute, private playerService: PlayerService) {
    const id = this.route.snapshot.queryParamMap.get('id') || ''
    this.playerId = parseInt(id)

    if (typeof this.playerId === 'number' && !Number.isNaN(this.playerId)) {
      this.loadPlayerData()
    }
  }

  getPlayerData(): any {
    return this.playerData
  }

  loadPlayerData(): void {
    this.playerService.getPlayerData(this.playerId).subscribe((data: any) => {
      this.playerName = data.name
      this.playerData = data.games
      this.playerGameCount = data.games.length
    })
  }

  formatDate(date: string): string {
    return `${new Date(date).toLocaleDateString('nl', { year: 'numeric', month: '2-digit', day: '2-digit' })} | ${new Date(date).toLocaleTimeString('nl', { hour: '2-digit', minute: '2-digit' })}`
  }

}

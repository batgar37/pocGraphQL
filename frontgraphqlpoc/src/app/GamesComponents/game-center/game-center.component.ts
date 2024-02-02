import { Component } from '@angular/core';
import { GamesListComponent } from '../games-list/games-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-center',
  standalone: true,
  imports: [GamesListComponent, RouterLink],
  templateUrl: './game-center.component.html',
  styleUrl: './game-center.component.css',
})
export class GameCenterComponent {}

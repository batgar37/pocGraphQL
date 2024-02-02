import { Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { GamesListComponent } from './GamesComponents/games-list/games-list.component';
import { AddGameComponent } from './GamesComponents/add-game/add-game.component';
import { GameCenterComponent } from './GamesComponents/game-center/game-center.component';

export const routes: Routes = [
  {
    path: 'reviews',
    component: ReviewComponent,
  },
  { path: 'games', component: GameCenterComponent },
  { path: 'add-game', component: AddGameComponent },
];

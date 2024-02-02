import { Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import {AuthorComponent} from "./author/author.component";
import { GamesListComponent } from './GamesComponents/games-list/games-list.component';
import { AddGameComponent } from './GamesComponents/add-game/add-game.component';
import { GameCenterComponent } from './GamesComponents/game-center/game-center.component';

export const routes: Routes = [
  {
    path: 'reviews',
    component: ReviewComponent,
  },
  {
    path: 'authors',
    component: AuthorComponent,
  },
  { path: 'games', component: GameCenterComponent },
  { path: 'add-game', component: AddGameComponent },
];

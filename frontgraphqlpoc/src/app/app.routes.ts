import { Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { GamesListComponent } from './GamesComponents/games-list/games-list.component';
import { AddGameComponent } from './GamesComponents/add-game/add-game.component';

export const routes: Routes = [
  {
    path: 'reviews',
    component: ReviewComponent,
  },
  { path: 'games', component: GamesListComponent },
  { path: 'add-game', component: AddGameComponent },
];

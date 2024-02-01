import { Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { GamesListComponent } from './GamesComponents/games-list/games-list.component';

export const routes: Routes = [
  {
    path: 'reviews',
    component: ReviewComponent,
  },
  { path: 'games', component: GamesListComponent },
];

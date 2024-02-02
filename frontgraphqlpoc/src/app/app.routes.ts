import { Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import {AuthorComponent} from "./author/author.component";

export const routes: Routes = [
  {
    path: 'reviews',
    component: ReviewComponent,
  },
  {
    path: 'authors',
    component: AuthorComponent,
  },
];

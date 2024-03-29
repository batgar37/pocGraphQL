import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { NgIf, NgFor } from '@angular/common';
import { Game } from '../game';
import { GraphGamesComponent } from '../graph-games/graph-games.component';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [NgFor, NgIf, GraphGamesComponent],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css',
})
export class GamesListComponent implements OnInit {
  loading = true;
  games!: Game[];
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            games {
              id
              title
              platform
              reviews {
                rating
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.games = result.data?.games;
        this.loading = result.loading;
      });
  }

  CalcAverage(game: Game) {
    let average = 0;
    let reviewNB = 0;
    game.reviews.forEach((element) => {
      reviewNB += 1;
      average += element.rating;
    });
    if (reviewNB !== 0) {
      return Math.floor(average / reviewNB);
    } else {
      return 'No reviews for the moment';
    }
  }
}

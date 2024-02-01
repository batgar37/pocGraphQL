import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { NgIf, NgFor } from '@angular/common';
import { Game } from '../game';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css',
})
export class GamesListComponent implements OnInit {
  loading = true;
  Games!: Game[];
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            games {
              id
              title
              reviews {
                rating
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.Games = result.data?.Games;
        this.loading = result.loading;
      });
    console.log('loaded');
    console.log(this.Games);
  }

  CalcAverage(game: Game) {
    let average = 0;
    let reviewNB = 0;
    game.reviews.forEach((element) => {
      reviewNB += 1;
      average += element.rating;
    });
  }
}

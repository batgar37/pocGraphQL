import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { NgIf, NgFor } from '@angular/common';
import { Review } from '../review';

@Component({
  selector: 'app-table-review',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './table-review.component.html',
  styleUrl: './table-review.component.css',
})
export class TableReviewComponent implements OnInit {
  reviews!: Review[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            reviews {
              id
              rating
              content
              author {
                name
              }
              game {
                title
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.reviews = result.data?.reviews;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}

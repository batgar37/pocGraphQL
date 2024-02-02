import { Component } from '@angular/core';
import { TableReviewComponent } from './table-review/table-review.component';
import { ChartReviewComponent } from './chart-review/chart-review.component';
import { Apollo, gql } from 'apollo-angular';
import { Review } from './review';
import { count } from 'rxjs';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [TableReviewComponent, ChartReviewComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  loading = true;
  error: any;

  reviews!: Review[];
  counter!: Record<string, number>;

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
        this.counter = this.countReviewByAuthor(result.data?.reviews);
        this.loading = result.loading;
        this.error = result.error;
      });
  }

  countReviewByAuthor = (reviews: Review[]) => {
    let count: Record<string, number> = {};
    reviews.forEach((review: Review) => {
      if (count[review.author.name]) {
        count[review.author.name] += 1;
      } else {
        count[review.author.name] = 1;
      }
    });
    return count;
  };
}

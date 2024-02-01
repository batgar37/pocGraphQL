import { Component } from '@angular/core';
import { TableReviewComponent } from './table-review/table-review.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [TableReviewComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {}

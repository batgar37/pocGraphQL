import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Review } from '../review';

@Component({
  selector: 'app-table-review',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table-review.component.html',
  styleUrl: './table-review.component.css',
})
export class TableReviewComponent {
  @Input()
  reviews: Review[] = [];
}

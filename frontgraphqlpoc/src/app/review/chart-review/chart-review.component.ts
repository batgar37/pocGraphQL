import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-chart-review',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './chart-review.component.html',
  styleUrl: './chart-review.component.css',
})
export class ChartReviewComponent implements OnChanges {
  @Input()
  counter!: Record<string, number>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['counter']?.currentValue) {
      // Assign data to the label and datasets data
      this.data.labels = Object.keys(changes['counter'].currentValue!);
      this.data.datasets[0].data = Object.values(
        changes['counter'].currentValue
      );

      // Generate color
      let backgroundColor = [];
      let borderColor = [];
      for (
        let index = 0;
        index < Object.keys(changes['counter'].currentValue).length;
        index++
      ) {
        const color = this.generateRandomColor();
        backgroundColor.push(`rgba(${color}, 0.2)`);
        borderColor.push(`rgb(${color})`);
      }
      this.data.datasets[0].backgroundColor = backgroundColor;
      this.data.datasets[0].borderColor = borderColor;

      // Force angular to detect changes
      this.data = {
        ...this.data,
      };
    }
  }

  generateRandomColor = () => {
    return `${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}`;
  };

  data = {
    labels: [''],
    datasets: [
      {
        label: 'Number of reviews by author who has written review',
        data: [],
        backgroundColor: [''],
        borderColor: [''],
        borderWidth: 1,
      },
    ],
  };
}

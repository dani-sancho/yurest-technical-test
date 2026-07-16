import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton.component.html',
})
export class SkeletonComponent {
  type = input<'table' | 'card'>('table');
  rows = input<number>(10);
  columns = input<number>(3);

  readonly placeholders = computed(() => {
    if (this.type() === 'table') {
      return Array.from({ length: this.rows() });
    }

    return Array.from({ length: this.columns() });
  });
}
